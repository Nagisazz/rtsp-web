var express = require("express");
var expressWebSocket = require("express-ws");
var ffmpeg = require("fluent-ffmpeg");
// ffmpeg 路径
ffmpeg.setFfmpegPath("/usr/local/bin/ffmpeg");
var webSocketStream = require("websocket-stream/stream");

function localServer() {
    let app = express();
    app.use(express.static(__dirname));
    expressWebSocket(app, null, {
        perMessageDeflate: true
    });
    app.ws("/rtsp/:id/", rtspRequestHandle)
    // 监听端口
    app.listen(8000);
    console.log("rtsp h264流转换服务启动成功")
}

function rtspRequestHandle(ws, req) {
    console.log("rtsp request handle");
    const stream = webSocketStream(ws, {
        binary: true,
        browserBufferTimeout: 1000000
    }, {
        browserBufferTimeout: 1000000
    });
    let url = req.query.url;
    console.log("rtsp url:", url);
    console.log("rtsp params:", req.params);
    try {
        ffmpeg(url)
            .inputOptions([
                '-rtsp_transport tcp',
                '-use_wallclock_as_timestamps 1',
                '-fflags +genpts',
                '-max_delay 5000000'
            ])
            .outputOptions([
                '-c:v copy',            // copy源
                '-bufsize 2000k',       // 设置视频缓冲区大小为 2000 kbps
                '-an',                  // 不包含音频流
                '-f flv'                // 输出格式为 FLV
            ])
            .on("start", function () {
                console.log(url, "stream started.");
            })
            .on("codecData", function () {
                console.log(url, "stream codecData.")
                // rtsp在线
            })
            .on("error", function (err, stdout, stderr) {
                console.log(url, "stream error: ", err.message, stdout, stderr);
            })
            .on("end", function () {
                console.log(url, "Strream end!");
                // rtsp断线
            })
            .pipe(stream);

    } catch (error) {
        console.log(error);
    }
}

localServer();