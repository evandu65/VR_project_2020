AFRAME.registerComponent('hover', {
    schema: {
      color: {
        type: 'color',
        default: 'black'
      }
    },
    init: function init() {
      var _this = this;
  
      this.el.addEventListener('mouseenter', function (evt) {
        return _this.onEnter(evt);
      });
      this.el.addEventListener('mouseleave', function (evt) {
        return _this.onLeave(evt);
      });
      this.savedAttr = null;
    },
    onEnter: function onEnter(evt) {
      var cursor = evt.detail.cursorEl;
  
      if (cursor.components['simple-color']) {
        this.savedAttr = _objectSpread({}, cursor.getAttribute('simple-color'));
        cursor.setAttribute('simple-color', 'color', this.data.color);
      }
  
      if (cursor.components['line']) {
        this.savedAttr = _objectSpread({}, cursor.getAttribute('line'));
        cursor.setAttribute('line', 'color', this.data.color);
      }
    },
    onLeave: function onLeave(evt) {
      var cursor = evt.detail.cursorEl;
  
      if (cursor.components['simple-color']) {
        cursor.setAttribute('simple-color', 'color', this.savedAttr.color);
      }
  
      if (cursor.components['line']) {
        cursor.setAttribute('line', 'color', this.savedAttr.color);
      }
    },
    remove: function remove() {
    }
  });