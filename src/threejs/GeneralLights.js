import * as THREE from 'three'

export default scene => {    

    const lightIn = new THREE.PointLight("#ffe7a0", 10);
    const lightOut = new THREE.PointLight("#696969", 10);

    scene.add(lightIn);
    scene.add(lightOut);

    const rad = 80;

    const update = (time) => {
        const x = rad * Math.sin(time*0.2)
        lightOut.position.x = x;
    }

    return {
        update
    }
}