AFRAME.registerComponent('clickable', {
    schema: { 
    },
    init: function () {
        $(this.el).on('click', evt => {
            this.el.components; 
            console.log(this.el.components)
        })
    },

});