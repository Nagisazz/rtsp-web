# rtsp-web
rtsp在线播放，包含h265和h264两种方案

## 如何选择
源视频流如果确定没有h265编码，则推荐使用h264，无法确定，则使用h265方案

### h264
包含server服务端推流转换服务，及web端播放服务，服务端采用ffmpeg进行转码推流，前端采用flv.js实现

### h265
包含server服务端推流转换服务，及web端播放服务，服务端采用ffmpeg进行转码推流，前端采用开源项目[h265web.js](https://github.com/numberwolf/h265web.js)

## 启动方式
### 服务端
服务端代码只有index.js，docker构建在Dockerfile中，可以自行打包部署
### web端
1. npm i
2. npm run dev