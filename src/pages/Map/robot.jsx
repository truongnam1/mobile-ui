import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import './robot.css'

export const RobotModel = ({canvasRef, currentPoint}) => {
    
    const [posArr, setPosArr] = useState([...currentPoint.pos.split('-')])
    var xPos = posArr[0];
    var yPos = posArr[1];

    const [unitSize, setUnitSize] = useState(window.innerWidth / 10);
    

    useEffect(() => {
        setPosArr([...currentPoint.pos.split('-')]);
        const myCanvas = document.getElementById('myCanvas');
        myCanvas.style.left = `${posArr[0] * unitSize}px`;
        myCanvas.style.top = `${posArr[1] * unitSize - unitSize}px`;
    },[currentPoint, unitSize])

    const handleWindowResize = () => {
        console.log("height:", window.innerWidth);
        setUnitSize(window.innerWidth / 10);
        console.log(unitSize);
    }

    window.addEventListener('resize', handleWindowResize)

    useEffect(()=>{
        const myCanvas = document.getElementById('myCanvas');
        myCanvas.style.left = `${posArr[0] * unitSize}px`;
        myCanvas.style.top = `${posArr[1] * unitSize}px`;
        const mapCanvas = document.getElementById('map-canvas');
        const canvasRect = mapCanvas.getBoundingClientRect()

        let scene = new THREE.Scene();
    
        let renderer = new THREE.WebGL1Renderer({canvas: myCanvas, alpha: true });
        renderer.setSize(32, 64);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0xffffff, 0);

        let light = new THREE.AmbientLight();
        scene.add(light);
    
        let camera = new THREE.PerspectiveCamera(7, 1, 0.1, 1000);
        camera.position.z = 60;
    
        let loader = new GLTFLoader();
        let clock = new THREE.Clock();
    
        let mixer;
        let action;


    
        loader.load(
            `${process.env.PUBLIC_URL}/assets/models/Robot.glb`,
            (glb) => {
                const robot = glb.scene;
                console.log(robot);
                robot.rotateY(Math.PI)
                robot.rotateX(-Math.PI / 6)
                robot.scale.x =  5;
                robot.scale.y =  5;
                robot.scale.z =  5;
                glb.scene.children[2].material.metalness = 0;
                const robotHead = glb.scene.children[3].children;
                for (let i in robotHead) {
                    robotHead[i].material.metalness = 0;
                }
                mixer = new THREE.AnimationMixer(glb.scene)
                action = mixer.clipAction(glb.animations[0])
                action.play();
                scene.add(glb.scene);
                animate();
            }
        )
    
        let animate = function() {
            requestAnimationFrame(animate);
            if (camera) {
                mixer.update(clock.getDelta())
                renderer.render(scene,camera);
            }
        }
    },[])

    return(
        <canvas id='myCanvas'></canvas>
    )
}