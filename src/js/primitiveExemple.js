AFRAME.registerPrimitive('a-cube', {
    defaultComponents: {
      'cube': {}    
    },
    mappings: {
      size: 'cube.size',
      color: 'cube.color'    
    }
  });
  
  AFRAME.registerComponent('cube', {
    schema: {
      size: {type: 'number', default: 1.0},    
      color: {type: 'color', default: 'blue'},
    },
    init: function () {
      this.genAll();
    },
    genAll: function () {
      this.genVertex();
      this.genShape();
      this.genGeometry();
      this.genMaterial();
      this.genMesh();
    },
    genVertex: function () {
      this.vertices = [];
      this.vertices.push(new THREE.Vector2(0, 0));
      this.vertices.push(new THREE.Vector2(this.data.size, 0));
      this.vertices.push(new THREE.Vector2(this.data.size, this.data.size));
      this.vertices.push(new THREE.Vector2(0, this.data.size));    
    },
    genShape: function () {
      this.shape = new THREE.Shape();
      this.shape.moveTo(this.vertices[0].x, this.vertices[0].y);
      this.shape.lineTo(this.vertices[1].x, this.vertices[1].y);
      this.shape.lineTo(this.vertices[2].x, this.vertices[2].y);
      this.shape.lineTo(this.vertices[3].x, this.vertices[3].y);
      this.shape.lineTo(this.vertices[0].x, this.vertices[0].y);
    },
    genGeometry: function () {      
      this.geometrySettings = {
        depth: this.data.size,
        bevelEnabled: false      
      };
      this.geometry = new THREE.ExtrudeGeometry(this.shape, this.geometrySettings);
    },
    genMaterial: function () {
      this.material = new THREE.MeshLambertMaterial({color: new THREE.Color(this.data.color)});
    },
    genMesh: function () {
      this.mesh = new THREE.Mesh(this.geometry, this.material);    
      this.el.setObject3D('mesh', this.mesh);
    },
    update: function (oldData) {      
      this.genAll();    
    },
    remove: function (){
      
    },
    tick: function (elapsedTime, dt) {
      
    }
   
  });