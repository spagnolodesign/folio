import * as THREE from 'three';
import SceneSubject from '@/threejs/SceneSubject.js';
import GeneralLights from '@/threejs/GeneralLights.js';

export default canvas => {
    
  
    const clock = new THREE.Clock();
    const origin = new THREE.Vector3(0,0,0);

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const mousePosition = {
        x: 0,
        y: 0
    }

    const buildScene = () => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#1f1f1f");

        return scene;
    }

    const buildRender = ({ width, height }) => {
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true }); 
        const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true; 

        return renderer;
    }

    const buildCamera = ({ width, height }) => {
        const aspectRatio = width / height;
        const fieldOfView = 75;
        const nearPlane = 0.1;
        const farPlane = 100; 
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        camera.position.z = 50;

        return camera;
    }

    const createSceneSubjects = (scene) => {
        const sceneSubjects = [
            new GeneralLights(scene),
            new SceneSubject(scene)
        ];

        return sceneSubjects;
    }

    const update = () => {
        const elapsedTime = clock.getElapsedTime();

        for(let i=0; i<sceneSubjects.length; i++)
            sceneSubjects[i].update(elapsedTime);

        updateCameraPositionRelativeToMouse();

        renderer.render(scene, camera);
    }

    const updateCameraPositionRelativeToMouse = () => {
        camera.position.x += (  (mousePosition.x * 0.03) - camera.position.x ) * 0.03;
        camera.position.y += ( -(mousePosition.y * 0.03) - camera.position.y ) * 0.03;
        camera.lookAt(origin);
    }

    const onWindowResize = () => {
        const { width, height } = canvas;
        
        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    }

    const onMouseMove = (x, y) => {
        mousePosition.x = x;
        mousePosition.y = y;
    }

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const sceneSubjects = createSceneSubjects(scene);

    return {
        update,
        onWindowResize,
        onMouseMove
    }
}