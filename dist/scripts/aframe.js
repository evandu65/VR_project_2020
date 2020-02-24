
let material = new  THREE.MeshLambertMaterial({color:  new  THREE.Color(this.data.color)});
this.el.setObject3D('mesh', mesh);
mesh.rotateOnAxis(new THREE.Vector3(-1, 0, 0), Math.PI / 2);
clone.position.set(x, 0, z);
if (this.data.bevel) {
    mesh.scale.set(0.95, 0.95, 1);
  } else {
    mesh.scale.set(0.98, 0.98, 1);
  }
  let s = -q - r;
clone.userData.coordinates = {q, r, s};
let group = new THREE.Object3D(); 
group.add(...this.tilemap);
this.el.setObject3D('mesh', group);
let material = new THREE.MeshLambertMaterial({color: new THREE.Color(this.data.color)});
let mergedGeo = new THREE.Geometry();
this.tilemap.forEach(node  => {
  node.updateMatrix();
  mergedGeo.merge(node.geometry, node.matrix);
});
this.el.setObject3D('mesh', new THREE.Mesh(mergedGeo, material));