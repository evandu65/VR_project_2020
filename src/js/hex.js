AFRAME.registerPrimitive('a-hex', {
  defaultComponents: {
    'hex': {}
  },
  mappings: {
    size: 'hex.size',
    color: 'hex.color',
    cellsize: 'hex.cellsize',
    height: 'hex.height'
  }
});

AFRAME.registerComponent('hex', {
  schema: {
    size: { type: 'number', default: 4 },
    color: { type: 'color', default: 'gold' },
    cellsize: { type: 'number', default: 0.5 },
    height: { type: 'number', default: 0.5 }
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
    this.genTilemap();
    this.mergeGeometry();
  },
  genVertex: function () {
    this.w = this.data.cellsize * 2;
    this.h = Math.sqrt(3) * this.data.cellsize;
    this.vertices = [];
    this.vertices.push(new THREE.Vector2(-0.5 * this.w, 0));
    this.vertices.push(new THREE.Vector2(-0.25 * this.w, -0.5 * this.h));
    this.vertices.push(new THREE.Vector2(0.25 * this.w, -0.5 * this.h));
    this.vertices.push(new THREE.Vector2(0.5 * this.w, 0));
    this.vertices.push(new THREE.Vector2(0.25 * this.w, 0.5 * this.h));
    this.vertices.push(new THREE.Vector2(-0.25 * this.w, 0.5 * this.h));
  },
  genShape: function () {
    this.shape = new THREE.Shape();
    this.shape.moveTo(this.vertices[0].x, this.vertices[0].y);
    this.shape.lineTo(this.vertices[1].x, this.vertices[1].y);
    this.shape.lineTo(this.vertices[2].x, this.vertices[2].y);
    this.shape.lineTo(this.vertices[3].x, this.vertices[3].y);
    this.shape.lineTo(this.vertices[4].x, this.vertices[4].y);
    this.shape.lineTo(this.vertices[5].x, this.vertices[5].y);
    this.shape.lineTo(this.vertices[0].x, this.vertices[0].y);
  },
  genGeometry: function () {
    this.geometrySettings = {
      depth: this.data.height,
      bevelEnabled: false
    };
    this.geometry = new THREE.ExtrudeGeometry(this.shape, this.geometrySettings);
  },
  genMaterial: function () {
    this.material = new THREE.MeshLambertMaterial({ color: new THREE.Color(this.data.color) });
  },
  genMesh: function genMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
    this.mesh.scale.set(0.98, 0.98, 1);
  },
  genTilemap: function () {
    this.tilemap = [];
    var size = this.data.size - 1;

    for (var q = -size; q <= size; q++) {
      for (var r = Math.max(-size, -q - size); r <= Math.min(size, -q + size); r++) {
        var s = -q - r;
        var x = this.data.cellsize * (1.5 * q);
        var z = this.data.cellsize * (Math.sqrt(3) / 2 * q + Math.sqrt(3) * r);
        var mesh = this.mesh.clone();
        mesh.userData.coordinates = {q,r,s};
        mesh.position.set(x, 0, z);
        this.tilemap.push(mesh);
      }
    }
  },  
  mergeGeometry: function mergeGeometry() {
    var mergedGeo = new THREE.Geometry();
    this.tilemap.forEach(function (node) {
      node.updateMatrix();
      mergedGeo.merge(node.geometry, node.matrix);
    });
    this.el.setObject3D('mesh', new THREE.Mesh(mergedGeo, this.material));
  },
  update: function (oldData) {
    this.genAll();
  },
  remove: function () {

  },
  tick: function (elapsedTime, dt) {

  }

});