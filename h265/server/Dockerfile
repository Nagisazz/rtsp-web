FROM zhoukunpeng505/ffmpeg-4_2_3-h265-flv-ubuntu2204:latest
WORKDIR /home/
COPY index.js /home/
RUN echo '/usr/local/ffmpeg-4_2_3-H265-FLV/lib/' >> /etc/ld.so.conf && ldconfig && curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash - && apt-get install -y nodejs
RUN npm config set registry https://registry.npmmirror.com && npm install express express-ws fluent-ffmpeg websocket-stream && npm install -g pm2
ENTRYPOINT ["pm2", "start", "/home/index.js", "--name", "ffmpeg", "--log", "/home/log/output.log", "--no-daemon"]