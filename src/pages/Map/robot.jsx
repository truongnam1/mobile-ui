import { countBy } from 'lodash';
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import './robot.css'


export const RobotModel = ({canvasRef, currentPoint, map}) => {
    console.log(`currentPoint robot`, currentPoint);
    const [posArr, setPosArr] = useState([...map[currentPoint].split('-')])
    const [oldPoint, setOldPoint] = useState(currentPoint);

    
    const [dir, setDir] = useState(0);
    const [_robot, setRobot] = useState(null);
    const [actionControl, setActionControl] = useState(null);
    
    const checkDirection = (oldPos, newPos) => {
        if (oldPos[0] == newPos[0]) {
            if (oldPos[1] > newPos[1]) return UP;
            else return DOWN
        } 
        if (oldPos[0] > newPos[0]) return LEFT;
        return RIGHT;
    }

    useEffect(() => {
        const promise = new Promise(resolve => {
            resolve();
        });
        promise
            .then(() => {

                const directionArr = [];
                // get direction
                if (oldPoint < currentPoint) {
                    for (let i = oldPoint; i < currentPoint; i++) {
                        const currentStep = [...map[i].split('-')]
                        const nextStep = [...map[i + 1].split('-')]
                        console.log(currentStep, nextStep);
                        directionArr.push(checkDirection(currentStep, nextStep));
                    }
                    return [...directionArr];
                } else {
                    for (let i = oldPoint; i > currentPoint; i--) {
                        const currentStep = [...map[i].split('-')]
                        const nextStep = [...map[i - 1].split('-')]
                        directionArr.push(checkDirection(currentStep, nextStep));
                    }
                    return [...directionArr];
                }
            })
            .then(directionArr => {
                console.log(directionArr);
                const timePerStep = TIME_PER_MOVEMENT / directionArr.length;
                const robotRec = document.getElementById('myCanvas');
                console.log(actionControl);
                if(actionControl) actionControl.timeScale = directionArr.length;
                const moveLoop = async () => {
                    for (let i = 0; i < directionArr.length; i++){
                        moveDirection(directionArr[i], _robot);
                        let frame = timePerStep / CELL_SIZE;
                        console.log("frame: ", frame);
                        const doIt = async () => {
                            let count = 0;
                            while(count < timePerStep) {
                                await delay(frame);
                                move(directionArr[i], robotRec);
                                count+=frame;
                            }
                        }
                        await doIt(); 
                    }
                }
                moveLoop();
            })


        setOldPoint(currentPoint);
    },[currentPoint])

    function decreasePixel(pixel) {
        let num = pixel.split('px')[0];
        num--;
        return `${num}px`;
    }
    function increasePixel(pixel) {
        let num = pixel.split('px')[0];
        num++;
        return `${num}px`;
    }

    const move = (dir, rec) => {
        // console.log("dir: ", dir);
        console.log("rec pos: ", rec.style.left, rec.style.top);
        switch(dir) {
            case RIGHT:
                rec.style.left = increasePixel(rec.style.left);
                break;
            case DOWN:
                rec.style.top = increasePixel(rec.style.top);
                break;
            case LEFT:
                rec.style.left = decreasePixel(rec.style.left);
                break;
            default:
                rec.style.top = decreasePixel(rec.style.top);

        }
    }

    function delay(delayInms) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(2);
          }, delayInms);
        });
      }

    const moveDirection = (dir, robot) => {
        console.log(robot);
        switch(dir) {
            case RIGHT:
                robot.position.y = -1
                robot.rotation.x = (Math.PI/2)
                robot.rotation.y = (Math.PI/2)
                return;
            case LEFT:
                robot.position.y=(-1);
                robot.rotation.x=(Math.PI/2)
                robot.rotation.y=(-Math.PI/2)
                return;
            case DOWN:
                robot.rotation.x=(2*Math.PI/3)
                robot.rotation.y=0
                robot.position.y=(-1);
                return;
            default:
                robot.position.y=(-1);
                robot.rotation.y=(Math.PI);
                robot.rotation.x=(Math.PI/3);
        }
    }

    useEffect(()=>{
        const myCanvas = document.getElementById('myCanvas');
        myCanvas.style.left = `${posArr[0] * CELL_SIZE}px`;
        myCanvas.style.top = `${posArr[1] * CELL_SIZE - CELL_SIZE}px`;
        console.log(myCanvas.style.left);

        let scene = new THREE.Scene();
    
        let renderer = new THREE.WebGL1Renderer({canvas: myCanvas, alpha: true });
        renderer.setSize(32, 64);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0xffffff, 0);

        let light = new THREE.AmbientLight();
        scene.add(light);
    
        let camera = new THREE.PerspectiveCamera(8, 1, 0.1, 1000);
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
                setRobot({...robot});
                console.log(dir);
                moveDirection(dir, robot);
                robot.scale.x =  5;
                robot.scale.y =  5;
                robot.scale.z =  5;
                glb.scene.children[0].material.metalness = 0;
                const robotHead = glb.scene.children[1].children;
                for (let i in robotHead) {
                    robotHead[i].material.metalness = 0;
                }
                mixer = new THREE.AnimationMixer(glb.scene)
                action = mixer.clipAction(glb.animations[0])
                setActionControl({...action})
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

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;
const TIME_PER_MOVEMENT = 2000;
const CELL_SIZE = 32;