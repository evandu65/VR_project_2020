AFRAME.registerComponent('mytest', {
    schema: {
      speed: {type: 'vec3', default: '0 0 0'},    
    },

    init: function () {
      // setTimeout(() => $(this.el).attr("position", "0 -1 0"), 3000);
      this.position = $(this.el).attr("position");
      console.log(this.position);  
    },
    
    tick: function (elapsedTime, dt) {
      this.position.x += this.data.speed.x * (dt/1000);
      this.position.y += this.data.speed.y * (dt/1000);
      this.position.z += this.data.speed.z * (dt/1000);
      $(this.el).attr("position", `${this.position.x} ${this.position.y} ${this.position.z}`);
      
    }
   
  });