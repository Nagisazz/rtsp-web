<template>
  <div>
      <video class="demo-video" ref="player" muted autoplay></video>
  </div>
</template>
<script>
import flvjs from "flv.js";
export default {
  data () {
      return {
        id: "1",
        rtsp: "rtsp://admin:123456@192.168.1.100:554/Streaming/Channels/101",
          player: null
      }
  },
  mounted () {
      if (flvjs.isSupported()) {
          let video = this.$refs.player;
          if (video) {
              this.player = flvjs.createPlayer({
                  type: "flv",
                  isLive: true,
                  url: `ws://192.168.1.200:8000/rtsp/${this.id}/?url=${this.rtsp}`
              });
              this.player.attachMediaElement(video);
              try {
                  this.player.load();
                  this.player.play();
              } catch (error) {
                  console.log(error);
              };
          }
      }
  },
  beforeDestroy () {
      this.player.destory();
  }
}
</script>
<style>
  .demo-video {
      max-width: 880px; 
      max-height: 660px;
  }
</style>