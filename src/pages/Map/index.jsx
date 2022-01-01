import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import './Map.scss'
import Base from '../Base/Base'
import _, { forIn, isEmpty } from 'lodash';
import Dice from './dice';
import BodyQuestion from '../Question/BodyQuestion';
import { RobotModel } from './robot';

import { useNavigate } from 'react-router-dom'
import findRoad from './findRoad';
import AnimationText from '../../components/Text';
import PreloadImage from './PreloadImage';
import 'animate.css';
import { CacheImageProvider } from '../../Provider/CacheImageContext';
import TotalTime from '../../components/CountTime/totalTime';
import Canvas from '../../components/Canvas';
import GuideMap from './GuideMap';
import { Loading } from '../../components/Loading';
import clsx from 'clsx';
function MapComponent(props) {
    const imageE = useRef();
    const canvasRef = useRef();
    const [codebeautty, setCodebeauty] = useState({});
    const [map, setMap] = useState([]);
    const [onDice, setOnDice] = useState(false);
    const currentPoint = useRef(0);
    const randomDice = useRef();
    const [isDice, setIsDice] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigate();
    const listQuestion = useRef([]);
    const previousStep = useRef();
    const [wrong, setWrong] = useState({})
    const [showText, setShowText] = useState(false);
    const itemRoad = useRef([]);
    const [typeModal, setTypeModal] = useState(false);
    const eventOfRoad = useRef([]);
    const allowToDice = useRef(true);
    // const filterEventOfRoad = useRef({});
    const beforeTypeEvent = useRef();

    const [currentMap, setCurrentMap] = useState({});
    const [arrImage, setArrImage] = useState([]);

    // se dung
    const [srcImage, setSrcImage] = useState([])

    const refLayers = useRef({});
    const [bufferLayers, setBufferLayers] = useState({});

    const [dataMap, actionDataMap] = useReducer(controlDataMap, {})
    const [dataCrtMove, actionDataCrtMove] = useReducer(controlDataCtrMove, {});
    const cacheImageXepHinh = useRef();
    const itemModal = useRef([]);

    const [isCrtMoving, setIsCrtMoving] = useState(false);
    const arrStepPoint = useRef([]);

    const filterEventOfRoad = useMemo(() => {
        if (!_.isEmpty(map) && !_.isEmpty(dataMap)) {
            const result = map.reduce((object, item) => {
                if (dataMap.layers['item-road'][item]) {
                    const key = dataMap.layers['item-road'][item]?.x + '-' + dataMap.layers['item-road'][item]?.y;
                    object[key] = [...object[key] || [], item];
                    return object;
                } else return object;

            }, {})



            for (const item of codebeautty.define_item_map) {

                const temp = Object.entries(codebeautty.tileSets[item.tilesetIdx].tileData).filter((tile) => {
                    // console.log(tile[1].tileSymbol, tile[1].tileSymbol);
                    return item.tileSymbol == tile[1].tileSymbol;
                })
                const newItem = { ...item, td: (temp[0])[0] };
                itemModal.current = [...itemModal.current || [], newItem];
            }

            console.log(" itemModal.current", itemModal.current);
            return result;

        }
    }, [map]);

    function controlDataCtrMove(oldState, action) {
        // console.log(`action`, action);
        // console.log(`oldState`, oldState);
        switch (action.type) {
            case 'INIT_DATA_CRT':

                return { ...oldState, status: 'INIT_DATA_CRT', arrStep: [], nextPoint: 0, prePoint: 0 }
            case 'ADD_STEP_MOVE':
                return { ...oldState, status: 'ADD_STEP_MOVE', arrStep: [...oldState.arrStep, action.point] }
            case 'FINISH_ADD_STEP':
                return { ...oldState, status: action.type }

            case 'NEXT_STEP':
            case 'CRT_MOVING':
                // console.group([action.type]);

                // console.log(`dataStep`, oldState.arrStep);

                const tempPrePoint = oldState.nextPoint !== null ? oldState.prePoint : oldState.nextPoint;

                var nextPoint;
                if (!_.isEmpty(oldState.arrStep)) {
                    nextPoint = oldState.arrStep.shift();
                }
                else {
                    console.log('mang rong');
                    nextPoint = null;
                }
                // console.log(`nextPoint`, nextPoint);
                // console.groupEnd();
                return { ...oldState, nextPoint, prePoint: tempPrePoint, status: action.type }

            case 'CRT_STOP_MOVING':
                console.warn('crt stop');
                return { ...oldState, status: action.type }

            default:
                throw new Error();

        }
    }

    // console.log(filterEventOfRoad);
    function controlDataMap(oldState, action) {
        switch (action.type) {
            case 'INIT_MAP':
                let layersMap = {};
                let { layers, ...infoMap } = action.currentMap;

                for (const layer of layers) {
                    layersMap[layer.name] = layer.tiles;
                }
                console.log('Layers', layers);
                loadImage();
                console.log('khoi tao map');



                return { ...oldState, layers: layersMap, ...infoMap, status: action.type };

            case 'UPDATE_LAYER_CHARACTER':
                let newLayers =
                {
                    ...oldState.layers,
                    'charater': action.newLayerCharacter
                }

                return { ...oldState, layers: newLayers, status: action.type }
            default:
                throw new Error();
                break;
        }
    }




    //kiem tra xem co boom
    const validateStep = (toado) => {
        if (_.isEmpty(dataMap.layers['item-road'][toado])) return false;
        else {
            const typeEvent = eventOfRoad.current.reduce((object, item) => {
                if (item?.tileSymbol == dataMap.layers['item-road'][toado]?.tileSymbol) return item;
                else return object;
            }, {})
            if (typeEvent?.effect.split(' ')[0] == 'back_forward') {
                beforeTypeEvent.current = 'forward';
                return -Number(typeEvent?.effect.split(' ')[1]);
            }
            else if (typeEvent?.effect.split(' ')[0] == 'forward') {
                beforeTypeEvent.current = 'forward';
                return Number(typeEvent?.effect.split(' ')[1]);
            }
            else if (typeEvent?.effect.split(' ')[0] == 'tele') {
                beforeTypeEvent.current = 'tele';
                const numberTele = Number(typeEvent?.effect.split(' ')[1]);
                const typeFilterEvent = dataMap.layers['item-road'][toado]?.x + '-' + dataMap.layers['item-road'][toado]?.y;
                const currentTele = filterEventOfRoad[typeFilterEvent].indexOf(toado);
                if (currentTele + numberTele > (_.size(filterEventOfRoad[typeFilterEvent]) - 1)) {
                    const valueTeleToJump = map.indexOf((filterEventOfRoad[typeFilterEvent])[_.size(filterEventOfRoad[typeFilterEvent]) - 1]);
                    return valueTeleToJump - currentPoint.current;
                } else if (currentTele + numberTele < 0) {
                    const valueTeleToJump = map.indexOf((filterEventOfRoad[typeFilterEvent])[0]);
                    return valueTeleToJump - currentPoint.current;
                } else {
                    const valueTeleToJump = map.indexOf((filterEventOfRoad[typeFilterEvent])[currentTele + numberTele]);
                    return valueTeleToJump - currentPoint.current;
                }
            } else return false
        }
    }

    const handleValidateMove = (time, dice) => {
        if (validateStep(map[currentPoint.current]) !== false) {
            const step = validateStep(map[currentPoint.current]);

            arrStepPoint.current = [...arrStepPoint.current, currentPoint.current + step];

            actionDataCrtMove({
                type: 'ADD_STEP_MOVE',
                point: currentPoint.current + step,
                hi: 'handleValidateMove'
            });
            currentPoint.current = currentPoint.current + step;


            // const pictureCha = Object.values(charactor);
            const pictureCha = Object.values(dataMap.layers.charater);


            const a = map[currentPoint.current];
            const newCha = {
                [`${a.split('-')[0]}-${a.split('-')[1] - 1}`]: pictureCha[0],
                [a]: pictureCha[1],

            }

            const timeOut = setTimeout(() => {
                // const pewpew = [...listPicture];
                allowToDice.current = true;
                if (beforeTypeEvent.current == 'forward') {
                    console.log("ao that day", step);
                    if (step < 0) setShowText("Lùi");
                    else setShowText("Tiến");
                } else if (beforeTypeEvent.current == 'tele') {
                    setShowText("Dịch chuyển");
                }
                const timeOut1 = setTimeout(() => {

                    actionDataMap({
                        type: "UPDATE_LAYER_CHARACTER",
                        newLayerCharacter: newCha
                    });
                    setShowText(false);

                    if (beforeTypeEvent.current == 'forward') handleValidateMove(1000, false);
                    clearTimeout(timeOut1);
                    clearTimeout(timeOut);
                }, 1000)




            }, time);
        } else {
            if (dice) {
                const timeShowQues = setTimeout(() => {

                    setShowQuestion(true);
                    clearTimeout(timeShowQues);
                }, 400)
            }
            actionDataCrtMove({ type: 'CRT_MOVING' });

        }
    }

    const handleMove = () => {
        console.warn('begin handleMove');
        try {
            allowToDice.current = false;
            const dice = Math.floor(Math.random() * 6) + 1;
            // Math.floor(Math.random() * 6) + 1;
            // const dice = 2;
            randomDice.current = dice;
            const pictureCha = Object.values(dataMap.layers.charater);
            console.warn('dice', dice);
            const newPoint = currentPoint.current + dice;

            if (newPoint < (_.size(map) - 1)) {
                previousStep.current = currentPoint.current;
                arrStepPoint.current = [...arrStepPoint.current, newPoint];
                actionDataCrtMove({
                    type: 'ADD_STEP_MOVE',
                    point: newPoint,
                    hi: 'handleMove'
                });

                // const a = map[(currentPoint.current + dice) > (_.size(map) - 1) ? (_.size(map) - 1) : currentPoint.current + dice + 16];
                const a = map[newPoint];

                setOnDice(!onDice);
                setIsDice(true);
                currentPoint.current = newPoint;
                // console.log(`charactor.current`, charactor);
                // const pictureCha = Object.values(charactor);
                // const pictureCha = Object.values(dataMap.layers.charater);

                const newCha = {
                    [`${a.split('-')[0]}-${a.split('-')[1] - 1}`]: pictureCha[0],
                    [a]: pictureCha[1],

                }
                // listPicture.splice(listPicture.length - 1)
                // const pewpew = [...listPicture];

                const timeOut = setTimeout(() => {
                    setShowText("Tiến")
                    const timeOut1 = setTimeout(() => {

                        actionDataMap({
                            type: "UPDATE_LAYER_CHARACTER",
                            newLayerCharacter: newCha
                        });
                        setShowText(false);
                        handleValidateMove(1000, true);

                        clearTimeout(timeOut1);
                    }, 1000)


                    setIsDice(false);

                    clearTimeout(timeOut);
                }, 2000);



            } else {
                const a = map[(_.size(map) - 1)];
                // const pictureCha = Object.values(charactor);
                // const pictureCha = Object.values(dataMap.layers.charater);

                setOnDice(!onDice);
                setIsDice(true);
                const newCha = {
                    [`${a.split('-')[0]}-${a.split('-')[1] - 1}`]: pictureCha[0],
                    [a]: pictureCha[1],

                }
                const timeOut = setTimeout(() => {
                    setShowText("Tiến")
                    const timeOut1 = setTimeout(() => {
                        actionDataMap({
                            type: "UPDATE_LAYER_CHARACTER",
                            newLayerCharacter: newCha
                        });
                        setShowText(false);
                        clearTimeout(timeOut1);
                    }, 1000)
                    // setListPicture(newArr);
                    setIsDice(false);
                    clearTimeout(timeOut);
                }, 1500)
                const timeOut2 = setTimeout(() => {
                    navigation('/complete')
                    clearTimeout(timeOut2);
                }, 3500)

            }
        } catch (err) {
            console.log(err);
        }
        console.log(`arrStepPoint`, arrStepPoint);
        console.warn('end handleMove');



    }
    //quay lai o cu
    const backToPreviousStep = () => {

        if (wrong.quantityWrongCur + 1 >= wrong.maxWrong) {
            navigation('/lose')
        }
        else {
            setWrong((oldWrong) => ({ ...oldWrong, quantityWrongCur: oldWrong.quantityWrongCur + 1 }))

            const a = map[(previousStep.current) > (_.size(map) - 1) ? (_.size(map) - 1) : previousStep.current];
            console.log('previousStep.current', previousStep.current);
            actionDataCrtMove({
                type: 'ADD_STEP_MOVE',
                point: previousStep.current,
                hi: 'backToPreviousStep'
            });
            currentPoint.current = previousStep.current
            // const pictureCha = Object.values(charactor);
            const pictureCha = Object.values(dataMap.layers.charater);

            const newCha = {
                [`${a.split('-')[0]}-${a.split('-')[1] - 1}`]: pictureCha[0],
                [a]: pictureCha[1],

            }


            const timeOut = setTimeout(() => {
                setShowText("Trừ 1 mạng")
                const timeOut1 = setTimeout(() => {
                    actionDataMap({
                        type: "UPDATE_LAYER_CHARACTER",
                        newLayerCharacter: newCha
                    });
                    actionDataCrtMove({ type: 'CRT_MOVING' });
                    setShowText(false);
                    clearTimeout(timeOut1);
                }, 1000)
                allowToDice.current = true;
                // setListPicture(newArr);
                clearTimeout(timeOut);
            }, 1000)

        }

    }
    //lay thong tin cua ban do
    useEffect(() => {
        setIsLoading(true);

        // fetch('https://api.npoint.io/6a4c897196b39197353e')
        //     .then(jsonData => jsonData.json())
        //     .then(data => {

        //         actionDataCrtMove({ type: 'INIT_DATA_CRT' });
        //         setCodebeauty(data);
        //         setArrImage(Object.values(data?.tileSets).map(item => {
        //             return item?.src;
        //         }))

        //         PreloadImage({ questions: data.questions }, (images) => {
        //             console.log(images);
        //             cacheImageXepHinh.current = images;
        //         })
        //         setCurMap(data?.maps)
        //         eventOfRoad.current = data?.define_item_map;
        //         listQuestion.current = data?.questions;

        //         sessionStorage.setItem('arrIndexQuestion', `[${Object.keys(listQuestion.current).toString()}]`);

        //         setWrong(() => {
        //             return {
        //                 'maxWrong': data.max_wrong >= 1 ? data.max_wrong : 2,
        //                 'quantityWrongCur': 0
        //             }
        //         })
        //         setTimeout(() => {


        //             setIsLoading(false);
        //         }, 3000);
        //     }).catch(err => {
        //         console.log(err);
        //     })



        new Promise(resolve => {
            resolve();
        }).then(() => {
            const dataMap = sessionStorage.getItem('dataMap');
            console.log('lay data map', dataMap);

            return JSON.parse(dataMap);
        }).then((data) => {
            actionDataCrtMove({ type: 'INIT_DATA_CRT' });
            setCodebeauty(data);
            setArrImage(Object.values(data?.tileSets).map(item => {
                return item?.src;
            }))

            PreloadImage({ questions: data.questions }, (images) => {
                console.log(images);
                cacheImageXepHinh.current = images;
            })
            setCurMap(data?.maps)
            eventOfRoad.current = data?.define_item_map;
            listQuestion.current = data?.questions;

            sessionStorage.setItem('arrIndexQuestion', `[${Object.keys(listQuestion.current).toString()}]`);

            setWrong(() => {
                return {
                    'maxWrong': data.max_wrong >= 1 ? data.max_wrong : 2,
                    'quantityWrongCur': 0
                }
            })
            setIsLoading(false);

        })

    }, [])

    function setCurMap(maps) {
        const keyMap = Object.keys(maps);
        const randomMap = maps[keyMap[Math.floor(Math.random() * (_.size(keyMap)))]];
        // const randomMap = maps[keyMap[1]];
        setCurrentMap(randomMap);
        // setListPicture(randomMap?.layers);

        actionDataMap({
            type: "INIT_MAP",
            currentMap: randomMap
        });
    }
    //Load anh map
    function loadImage() {
        const loadImage = url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = () => reject(new Error(`load ${url} fail`));
                img.src = url;
            });

        };
        const waitLoad = async () => {
            const arr = arrImage.map(item => {
                return loadImage(item);
            })

            Promise.all(arr).then((imgs) => {
                setSrcImage(imgs);
            })
            // return await Promise.all(arr);
        }

        waitLoad();
    }
    // const loadImageMemo = useMemo(loadImage, [arrImage]);

    useEffect(() => {
        if (!isEmpty(srcImage) && !isEmpty(dataMap)) {
            draw2(srcImage);
        }

    }, [dataMap, srcImage])

    //sau khi ảnh src load xong
    useEffect(() => {
        if (!isEmpty(srcImage)) {

            draw2(srcImage);
        }
    }, [srcImage])



    //Tim chinh xacs map
    useEffect(() => {
        if (!isEmpty(dataMap)) {
            // var dataRoad = findRoad([...Object.keys(arrLayer['road'])], dataMap.mapHeight);
            var dataRoad = findRoad(Object.keys(dataMap.layers['road']), dataMap.mapHeight);

            console.log('dataRoad', dataRoad);
            setMap(dataRoad);

        }
    }, [isEmpty(dataMap)]);

    function drawLayer2(layerCanvas, nameLayer, img) {
        console.log('ve ' + nameLayer);
        let ctx = layerCanvas.getContext("2d");
        ctx.clearRect(0, 0, layerCanvas.width, layerCanvas.height);
        const size_of_crop = 32;
        // const layerCur = arrLayer[nameLayer];
        const layerCur = dataMap.layers[nameLayer];

        // console.log(`srcImage`, srcImage);
        if (false) {
            console.log('dung buffer ' + nameLayer);
            ctx.drawImage(bufferLayers[nameLayer], 0, 0);
        }
        else {
            for (const key in layerCur) {
                const positionX = Number(key.split("-")[0]);
                const positionY = Number(key.split("-")[1]);
                const tilesheetX = layerCur[key]?.x;
                const tilesheetY = layerCur[key]?.y;
                ctx.drawImage(
                    img[layerCur[key].tilesetIdx],
                    tilesheetX * 32,
                    tilesheetY * 32,
                    size_of_crop,
                    size_of_crop,
                    positionX * 32,
                    positionY * 32,
                    size_of_crop,
                    size_of_crop
                );
            }




        }
        // setBufferLayers((oldbuffer) => {
        //     console.log('ve lai ' + nameLayer);
        //     return { ...oldbuffer, [nameLayer]: ctx }
        // })
    }


    const draw2 = (img) => {
        console.log(`status map`, dataMap.status);
        for (const key in dataMap.layers) {
            drawLayer2(refLayers.current[key], key, img);
        }


        // console.log('ve xong');
        // var crt = refLayers.current['charater'];
        // var road = refLayers.current['road'];
        // crt.getContext('2d').fillRect(0,0,10,10);
        // crt.getContext('2d').drawImage(road, 17 * 32, 17 * 32, 100, 100);



    }



    const handleCloseModal = (type) => {
        if (!type) {
            allowToDice.current = true;
        }
        console.log('so mang con lai', wrong);

        setShowQuestion(false);
    }
    const PopupQuestion = () => {
        return (
            <CacheImageProvider
                imagesCache={cacheImageXepHinh.current}
            >
                <BodyQuestion
                    questions={listQuestion.current}
                    onCloseModal={handleCloseModal}
                    onBackToPrev={backToPreviousStep}
                />
            </CacheImageProvider>

        )
    }
    const showCountWrong = () => {

        if (!isEmpty(wrong)) {
            let wrongConLai = wrong.maxWrong - wrong.quantityWrongCur;
            return Array.from(new Array(wrongConLai), () => {
                return <img className='animate__animated animate__bounce' src="https://img.icons8.com/stickers/20/000000/like.png" />
            });
        }

    }
    const widthCanvas = dataMap?.width * dataMap?.mapWidth / 10;
    const heightCanvas = dataMap?.height * dataMap?.mapHeight / 10;

    const handleShowText = (text) => {
        return (
            <AnimationText text={text} top={'10%'} left={'32%'} size={'50px'} />
        )
    }

    //show modal huong dan
    const handleShowModalIntroduction = (type) => {
        console.log("type", type);
        setTypeModal(type);
    }

    return (
        <Base
            headerBody={isLoading && <Loading></Loading>}
            body={
                <>
                    {isDice && <Dice status={onDice} randomAngle={randomDice.current} isDice={isDice} />}
                    {showText && handleShowText(showText)}
                    { !_.isEmpty(map) &&
                        <>
                            <div className={clsx({ 'text-black': showQuestion }, { 'text-blue': !showQuestion })}>
                                <TotalTime />

                            </div>
                            <div id='roll' className='roll-button' hidden={!allowToDice.current} onClick={handleMove}><button className='button_dice'>Xúc xắc</button></div>
                            <div className='tim'
                                // style={{ position: 'fixed', right: '32%', zIndex: 1 }} 
                                hidden={showQuestion}>
                                {showCountWrong()}
                            </div>
                            <div id="canvasesdiv" style={{
                                width: '100%', minHeight: '100%',
                                position: "relative"

                            }}>
                                <canvas
                                    ref={(ref) => {

                                        refLayers.current['base'] = ref;
                                    }}
                                    className='layer-map layer-base'


                                    width={widthCanvas}
                                    height={heightCanvas}
                                >
                                </canvas>
                                <canvas
                                    ref={(ref) => {

                                        refLayers.current['item-base'] = ref;
                                    }}
                                    className='layer-map layer--item-base'
                                    width={widthCanvas}
                                    height={heightCanvas}
                                >
                                </canvas>
                                <canvas
                                    ref={(ref) => {

                                        refLayers.current['road'] = ref;
                                    }}
                                    className='layer-map layer--road'
                                    width={widthCanvas}
                                    height={heightCanvas}
                                >
                                </canvas>
                                <canvas
                                    ref={(ref) => {

                                        refLayers.current['item-road'] = ref;
                                    }}
                                    className='layer-map layer--item-road'
                                    width={widthCanvas}
                                    height={heightCanvas}
                                >
                                </canvas>
                                <canvas
                                    ref={(ref) => {

                                        refLayers.current['charater'] = ref;
                                    }}
                                    className='layer-map layer--item-charater'
                                    width={widthCanvas}
                                    height={heightCanvas}
                                >
                                </canvas>
                                <RobotModel canvasRef={canvasRef} currentPoint={currentPoint.current} map={map}
                                    setIsCrtMoving={setIsCrtMoving}
                                    width={widthCanvas}
                                    height={heightCanvas}
                                    {...{ dataCrtMove, actionDataCrtMove }}
                                />
                            </div>



                        </>
                    }

                    {/* <img ref={imageE} hidden/> */}

                    {dataCrtMove.status === 'CRT_STOP_MOVING' && !isCrtMoving && showQuestion && PopupQuestion()}
                    {/* {typeModal && ModalIntroductionMap()} */}
                    {typeModal && <GuideMap {...{ itemModal: itemModal.current, srcImage, setTypeModal }} />}

                </>

            }
            // isLoading={isLoading} 
            text={"Đang tải bản đồ"} onSetTypeModal={handleShowModalIntroduction} />


    );
}

export default MapComponent;