import {UICorePlugin, Styler, Events, $} from 'clappr'
import captureIcon from './icons/capture.svg'

export default class CapturePlugin extends UICorePlugin {
  get name() { return 'capture-plugin' }
  get tagName() { return 'button' }
  
  get attributes() {
    return {
      'class': this.name
    }
  }

  constructor(core) {
    super(core)

    this.$el.addClass("media-control-button media-control-icon").css({
      float: "right",
      height: "100%"
    }).append(captureIcon)
    
    this.$el.click(() => {
      var video = this.core.mediaControl.container.playback.el;
      var canvas = document.createElement('canvas');
      canvas.width  = video.videoWidth;
      canvas.height = video.videoHeight;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0);
      var base64 = canvas.toDataURL('image/jpeg');

      this.core.mediaControl.trigger('capture:base64', base64);
    })
  }

  bindEvents() {
    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_RENDERED, this.render);
  }

  unBindEvents() {
    this.stopListening(this.core.mediaControl, Events.MEDIACONTROL_RENDERED);
  }

  render(){
    this.core.mediaControl.$('.media-control-right-panel').append(this.el);

    return this
  }
}
