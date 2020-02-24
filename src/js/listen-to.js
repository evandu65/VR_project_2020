AFRAME.registerComponent('listen-to', {
    multiple: true,
    schema: {
      target: {
        type: 'selector'
      },
      event: {
        type: 'string',
        default: 'click'
      },
      emit: {
        type: 'string',
        default: 'click'
      },
      once: {
        type: 'boolean',
        default: false
      }
    },
    init: function init() {
      var _this = this;
  
      this.data.target;
  
      this.handler = function (evt) {
        return _this.onEvent(evt);
      };
  
      this.data.target.addEventListener(this.data.event, this.handler); //todo: update target, emit, and event
    },
    onEvent: function onEvent(evt) {
      this.el.emit(this.data.emit);
      if (!this.data.once) return;
      this.remove();
    },
    remove: function remove() {
      this.data.target.removeEventListener(this.data.event, this.handler);
    }
  });
  