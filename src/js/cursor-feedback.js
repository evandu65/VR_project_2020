AFRAME.registerComponent('cursor-feedback', {
    schema: { 
    },
    init: function () {
        this.el.addEventListener('mouseenter', evt => {
            this.el.setAttribute('material', 'color', 'white');
        });
        this.el.addEventListener('mouseleave', evt => {
            this.el.setAttribute('material', 'color', 'black');
        })
    },

});