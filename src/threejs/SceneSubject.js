import * as THREE from 'three'
import alphaTexture from '@/static/stripes_gradient.jpg';
import anime from 'animejs';

export default scene => {    
    const group = new THREE.Group();

    const speed = 0.02;
    const textureOffsetSpeed = .1;
    
    const deformGeometry = (geometry, time) => {
        if (geometry.vertices != undefined){
        for (let i=0; i<geometry.vertices.length; i+=2) {
            const scalar = ( Math.random()*time);
            geometry.vertices[i].multiplyScalar(scalar)
        }
        }

      return geometry;
    }

    const update = (time) => {
        const angle = time*speed;

        group.rotation.y = angle;

        subjectMaterial.alphaMap.offset.y =  time * textureOffsetSpeed;
        subjectWireframe.material.color = new THREE.Color("#000");
        // const scale = (Math.sin(angle*8)+6.4)/6;
        // subjectWireframe.scale.set(scale, scale, scale)
       
    }

    const subjectGeometry = deformGeometry(new THREE.IcosahedronGeometry(14, 2), .2);
    
    const subjectMaterial = new THREE.MeshStandardMaterial({ color: "#000", transparent: true, alphaTest: 0.5 });
    subjectMaterial.alphaMap = new THREE.TextureLoader().load(alphaTexture);
    subjectMaterial.alphaMap.magFilter = THREE.NearestFilter;
    subjectMaterial.alphaMap.wrapT = THREE.RepeatWrapping;
    subjectMaterial.alphaMap.repeat.y = 3;

    const subjectMesh = new THREE.Mesh(subjectGeometry, subjectMaterial);
        
    const subjectWireframe = new THREE.LineSegments(
        new THREE.EdgesGeometry(subjectGeometry),
        new THREE.LineBasicMaterial()
    );

    group.add(subjectMesh);
    group.add(subjectWireframe);
    scene.add(group);   

    group.rotation.z = Math.PI/4;
    // group.scale.set(0.2,0.2,0.2)
    console.log(group)
    anime({
        targets: [group.scale, group.rotation],
        x: 1.02,
        y: 1.02,
        z: 1.02,
        loop:true,
        direction: 'alternate',
        easing: 'easeInOutQuad',
        duration:4000
    });

    anime({
        targets: group.scale,
        x: 1.1,
        y: 1.1,
        z: 1.1,
        loop:true,
        direction: 'alternate',
        easing: 'easeInCubic',
        duration:300,
        delay: 1000
    });

    // anime({
    //     targets: group.position,
    //     x: 0,
    //     y: 10,
    //     z: 0,
    //     loop:false,
    //     easing: 'easeInOutQuad',
    //     duration:300,
    //     delay: 1000
    // });
    

    return {
        update
    }
}
