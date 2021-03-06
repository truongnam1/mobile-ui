import clsx from 'clsx';
import { countBy, isEmpty } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import './robot.css'


export const RobotModel = ({ canvasRef, currentPoint, map, setIsCrtMoving, dataCrtMove, actionDataCrtMove, onShowText }) => {
    const [posArr, setPosArr] = useState([...map[currentPoint].split('-')])
    const [oldPoint, setOldPoint] = useState(currentPoint);
    const [currentPoint1, setCurrentPoint1] = useState(currentPoint);

    const [CELL_SIZE, setCellSize] = useState(() => {
        const height = window.innerWidth <= 576 ? window.innerWidth : 576;
        return height / 10;
    });

    const character = useRef();
    const [animationCrt, setAnimationCrt] = useState(false);


    const [dir, setDir] = useState('face-up');
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


    const handleMoveCrt = (currentPoint1, text) => {
       
        const promise = new Promise(resolve => {
            resolve();
        });
        promise
            .then(() => {
               
                setAnimationCrt(true);
                setIsCrtMoving(true);
                
                console.log(`currentPoint1 robot`, currentPoint1);

                console.warn('animation crt start');

                const directionArr = [];
                // get direction
                console.log(`point`, { oldPoint, currentPoint1 });
                if (oldPoint < currentPoint1) {
                    for (let i = oldPoint; i < currentPoint1; i++) {
                        const currentStep = [...map[i].split('-')]
                        const nextStep = [...map[i + 1].split('-')]
                        console.log(currentStep, nextStep);
                        directionArr.push(checkDirection(currentStep, nextStep));
                    }
                    return [...directionArr];
                } else {
                    for (let i = oldPoint; i > currentPoint1; i--) {
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
                const robotRec = document.getElementById('character-container');
                console.log(actionControl);
                if (actionControl) actionControl.timeScale = directionArr.length;
                const moveLoop = async () => {

                    for (let i = 0; i < directionArr.length; i++) {
                        moveDirection(directionArr[i]);
                        let frame = timePerStep / CELL_SIZE;
                        console.log("frame: ", frame);
                        const doIt = async () => {
                            let count = 0;
                            while (count < timePerStep) {
                                await delay(frame);
                                move(directionArr[i], robotRec);
                                count += frame;
                            }
                        }
                        await doIt();
                    }
                    onShowText(false);
                    setTimeout(() => {
                        setOldPoint(currentPoint1);
                        setIsCrtMoving(false);
                        
                        actionDataCrtMove({ type: 'NEXT_STEP' })
                        setAnimationCrt(false);

                    }, 1000)
                    console.warn('animation crt end');
                }
                moveLoop();

            });

    }


    // useEffect(() => {
    //     const promise = new Promise(resolve => {
    //         resolve();
    //     });
    //     promise
    //         .then(() => {
    //             setAnimationCrt(true);
    //             setIsCrtMoving(true);
    //             console.log(`currentPoint robot`, currentPoint);

    //             console.warn('animation crt start');

    //             const directionArr = [];
    //             // get direction
    //             if (oldPoint < currentPoint) {
    //                 for (let i = oldPoint; i < currentPoint; i++) {
    //                     const currentStep = [...map[i].split('-')]
    //                     const nextStep = [...map[i + 1].split('-')]
    //                     console.log(currentStep, nextStep);
    //                     directionArr.push(checkDirection(currentStep, nextStep));
    //                 }
    //                 return [...directionArr];
    //             } else {
    //                 for (let i = oldPoint; i > currentPoint; i--) {
    //                     const currentStep = [...map[i].split('-')]
    //                     const nextStep = [...map[i - 1].split('-')]
    //                     directionArr.push(checkDirection(currentStep, nextStep));
    //                 }
    //                 return [...directionArr];
    //             }
    //         })
    //         .then(directionArr => {
    //             console.log(directionArr);
    //             const timePerStep = TIME_PER_MOVEMENT / directionArr.length;
    //             const robotRec = document.getElementById('character-container');
    //             console.log(actionControl);
    //             if (actionControl) actionControl.timeScale = directionArr.length;
    //             const moveLoop = async () => {

    //                 for (let i = 0; i < directionArr.length; i++) {
    //                     moveDirection(directionArr[i]);
    //                     let frame = timePerStep / CELL_SIZE;
    //                     console.log("frame: ", frame);
    //                     const doIt = async () => {
    //                         let count = 0;
    //                         while (count < timePerStep) {
    //                             await delay(frame);
    //                             move(directionArr[i], robotRec);
    //                             count += frame;
    //                         }
    //                     }
    //                     await doIt();
    //                 }
    //                 setAnimationCrt(false);
    //                 setIsCrtMoving(false);
    //                 console.warn('animation crt end');
    //             }
    //             moveLoop();

    //         });


    //     setOldPoint(currentPoint);

    // }, [currentPoint]);

    useEffect(() => {
        // console.log(`dataCrtMove`, dataCrtMove);
        if (dataCrtMove.status === 'CRT_MOVING' && dataCrtMove.nextPoint != null) {
            console.log(`nextPoint`, dataCrtMove.nextPoint);
            onShowText(dataCrtMove?.nextTypeStep);
            setTimeout(() => {
                handleMoveCrt(dataCrtMove.nextPoint, dataCrtMove?.nextTypeStep);
            }, 800)
          
        }
    }, [dataCrtMove && dataCrtMove.status === 'CRT_MOVING'])

    useEffect(() => {
        // console.log(`dataCrtMove2`, dataCrtMove);

        if (animationCrt === false && dataCrtMove.nextPoint != null && dataCrtMove.status === 'NEXT_STEP') {
            console.log('chay 2 lan');
            onShowText(dataCrtMove?.nextTypeStep);
            setTimeout(() => {
                handleMoveCrt(dataCrtMove.nextPoint, dataCrtMove?.nextTypeStep);
            }, 800)
            // actionDataCrtMove({ type: 'NEXT_STEP' })
        } else if (animationCrt === false && dataCrtMove.nextPoint === null && dataCrtMove.status === 'NEXT_STEP') {
            actionDataCrtMove({ type: 'CRT_STOP_MOVING' })
            
        }
    }, [animationCrt, dataCrtMove])






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
        // console.log("rec pos: ", rec.style.left, rec.style.top);
        switch (dir) {
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

    const moveDirection = (dir) => {
        switch (dir) {
            case RIGHT:
                setDir('face-right')
                return;
            case LEFT:
                setDir('face-left')
                return;
            case DOWN:
                setDir('face-down')
                return;
            default:
                setDir('face-up')
        }
    }

    useEffect(() => {
        window.addEventListener('resize', () => { if (window.innerWidth <= 576) setCellSize(window.innerWidth / 10) });

        return () => { window.removeEventListener('resize', () => { if (window.innerWidth <= 576) setCellSize(window.innerWidth / 10) }) }
    }, [])

    useEffect(() => {
        const character = document.getElementById('character-container');

        console.log(CELL_SIZE);
        const ratioPixel = CELL_SIZE / 32;
        document.documentElement.style.setProperty('--pixel-size', `${ratioPixel}`);
        character.style.top = `${CELL_SIZE * posArr[1] - CELL_SIZE}px`;
        character.style.left = `${CELL_SIZE * posArr[0] - CELL_SIZE / 2}px`;
    }, [CELL_SIZE])
    return (
        // <canvas id='myCanvas'></canvas>

        <div id='character-container'>
            <div className="Character" >

                <img className="Character_shadow pixelart" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacterShadow.png" alt="Shadow" />

                <img
                    // className={`Character_spritesheet pixelart ${dir}`}
                    className={clsx('Character_spritesheet', dir, { 'animation_crt': animationCrt })}
                    ref={character}
                    src={`${process.env.PUBLIC_URL}/assets/images/sprite-sheet.png`} alt="Character"
                />

            </div>
        </div>
    )
}

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;
const TIME_PER_MOVEMENT = 2000;
