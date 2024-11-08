FROM angelalign/node-ffmpeg:latest
WORKDIR /home/
COPY index.js /home/
RUN npm config set registry https://registry.npmmirror.com && npm install express express-ws fluent-ffmpeg websocket-stream && npm install -g pm2
ENTRYPOINT ["pm2", "start", "/home/index.js", "--name", "ffmpeg", "--log", "/home/log/output.log", "--no-daemon"]