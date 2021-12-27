import React, { useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import clsx from 'clsx';
// import codebeautty from './codebeautify.json'
import styleBase from '../Base/Base.module.scss';
import './Map.scss'
import Base from '../Base/Base'
import _, { forIn, isEmpty } from 'lodash';
import Dice from './dice';
import BodyQuestion from '../Question/BodyQuestion';
import { useNavigate } from 'react-router-dom'
import { useGlobalState } from 'state-pool';
import findRoad from './findRoad';
function MapComponent(props) {
    const imageE = useRef();
    const canvasRef = useRef();
    const [codebeautty, setCodebeauty] = useState({});
    // const [listPicture, setListPicture] = useState([]);
    const [map, setMap] = useState([]);
    const [onDice, setOnDice] = useState(false);
    // const charactor = useRef();
    // const [charactor, setCharactor] = useState({});

    const currentPoint = useRef(0);
    const randomDice = useRef();
    const [isDice, setIsDice] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();
    const listQuestion = useRef([]);
    const previousStep = useRef();
    // const [countWrong, setCountWrong] = useState([1, 2, 3]);
    const [wrong, setWrong] = useState({})

    const itemRoad = useRef([]);

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

    const filterEventOfRoad = useMemo(() => {
        if (!_.isEmpty(map) && !_.isEmpty(dataMap)) {
            return map.reduce((object, item) => {
                if (dataMap.layers['item-road'][item]) {
                    const key = dataMap.layers['item-road'][item]?.x + '-' + dataMap.layers['item-road'][item]?.y;
                    object[key] = [...object[key] || [], item];
                    return object;
                } else return object;

            }, {})

        }
    }, [map, dataMap])

    function controlDataMap(oldState, action) {
        switch (action.type) {
            case 'INIT_MAP':
                let layersMap = {};
                let { layers, ...infoMap } = action.currentMap;

                for (const layer of layers) {
                    layersMap[layer.name] = layer.tiles;
                }
                console.log('Layers', layers);
                if (!isEmpty(layersMap)) {
                    setToaDo(layersMap);
                }
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
            currentPoint.current = currentPoint.current + validateStep(map[currentPoint.current]);

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
                actionDataMap({
                    type: "UPDATE_LAYER_CHARACTER",
                    newLayerCharacter: newCha
                })

                if (beforeTypeEvent.current == 'forward') handleValidateMove(1000, false);
                clearTimeout(timeOut);
            }, time);
        } else {
            if (dice) {
                const timeShowQues = setTimeout(() => {
                    console.log('show questionnnnnnnnnnnnn');
                    setShowQuestion(true);
                    clearTimeout(timeShowQues);
                }, 2400)
            }

        }
    }
    const handleMove = () => {
        try {
            allowToDice.current = false;
            const dice = Math.floor(Math.random() * 6) + 1;
            // Math.floor(Math.random() * 6) + 1;

            randomDice.current = dice;
            if (currentPoint.current + dice < (_.size(map) - 1)) {
                previousStep.current = currentPoint.current;
                const a = map[(currentPoint.current + dice) > (_.size(map) - 1) ? (_.size(map) - 1) : currentPoint.current + dice];
                setOnDice(!onDice);
                setIsDice(true);
                currentPoint.current = currentPoint.current + dice;
                // console.log(`charactor.current`, charactor);
                // const pictureCha = Object.values(charactor);
                const pictureCha = Object.values(dataMap.layers.charater);

                const newCha = {
                    [`${a.split('-')[0]}-${a.split('-')[1] - 1}`]: pictureCha[0],
                    [a]: pictureCha[1],

                }
                // listPicture.splice(listPicture.length - 1)
                // const pewpew = [...listPicture];

                const timeOut = setTimeout(() => {
                    // setListPicture(newArr);
                    actionDataMap({
                        type: "UPDATE_LAYER_CHARACTER",
                        newLayerCharacter: newCha
                    });

                    setIsDice(false);
                    clearTimeout(timeOut);
                }, 2000);

                handleValidateMove(3000, true);

            } else {
                const a = map[(_.size(map) - 1)];
                // const pictureCha = Object.values(charactor);
                const pictureCha = Object.values(dataMap.layers.charater);

                setOnDice(!onDice);
                setIsDice(true);
                const newCha = {
                    [`${a.split('-')[0]}-${a.split('-')[1] - 1}`]: pictureCha[0],
                    [a]: pictureCha[1],

                }
                const timeOut = setTimeout(() => {
                    actionDataMap({
                        type: "UPDATE_LAYER_CHARACTER",
                        newLayerCharacter: newCha
                    })
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


    }
    //quay lai o cu
    const backToPreviousStep = () => {

        if (wrong.quantityWrongCur + 1 >= wrong.maxWrong) {
            navigation('/lose')
        }
        else {
            setWrong((oldWrong) => ({ ...oldWrong, quantityWrongCur: oldWrong.quantityWrongCur + 1 }))

            const a = map[(previousStep.current) > (_.size(map) - 1) ? (_.size(map) - 1) : previousStep.current];
            currentPoint.current = previousStep.current
            // const pictureCha = Object.values(charactor);
            const pictureCha = Object.values(dataMap.layers.charater);

            const newCha = {
                [`${a.split('-')[0]}-${a.split('-')[1] - 1}`]: pictureCha[0],
                [a]: pictureCha[1],

            }

            const timeOut = setTimeout(() => {
                actionDataMap({
                    type: "UPDATE_LAYER_CHARACTER",
                    newLayerCharacter: newCha
                })
                allowToDice.current = true;
                // setListPicture(newArr);
                clearTimeout(timeOut);
            }, 2000)

        }

    }
    //lay thong tin cua ban do
    useEffect(() => {
        setIsLoading(true);
        fetch('https://api.npoint.io/6a4c897196b39197353e')
            .then(jsonData => jsonData.json())
            .then(data => {
                setCodebeauty(data);
                setArrImage(Object.values(data?.tileSets).map(item => {
                    return item?.src;
                }))

                setCurMap(data?.maps)
                eventOfRoad.current = data?.define_item_map;
                listQuestion.current = data?.questions;

                var arrIndexQuestion = [];
                for (const key in listQuestion.current) {
                    arrIndexQuestion.push(key);
                }
                sessionStorage.setItem('arrIndexQuestion', `[${arrIndexQuestion.toString()}]`);

                setWrong(() => {
                    return {
                        'maxWrong': data.max_wrong >= 1 ? data.max_wrong : 2,
                        'quantityWrongCur': 0
                    }
                })

                setIsLoading(false);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    function setToaDo(data) {
        // setCharactor(data['charater'])
        // itemRoad.current = data['road'];
    }
    function setCurMap(maps) {
        const keyMap = Object.keys(maps);
        const randomMap = maps[keyMap[Math.floor(Math.random() * (_.size(keyMap)))]];
        setCurrentMap(randomMap);
        // setListPicture(randomMap?.layers);

        actionDataMap({
            type: "INIT_MAP",
            currentMap: randomMap
        });
    }
    //Load anh map
    const loadImage = async () => {
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
            return await Promise.all(arr);
        }

        return  waitLoad();
    }
    const loadImageMemo = useMemo(loadImage, [arrImage]);

    useEffect(() => {
        const test = async () => {
            loadImageMemo.then(arr => {
                setSrcImage(arr);
                draw2(arr);
                // draw(listPicture, arr);
            })

        }

        if (!isEmpty(dataMap)) {
            test();
        }
        
    }, [dataMap])

    //Tim chinh xacs map
    useEffect(() => {
        if (!isEmpty(dataMap)) {
            // var dataRoad = findRoad([...Object.keys(arrLayer['road'])], dataMap.mapHeight);
            var dataRoad = findRoad(Object.keys(dataMap.layers['road']), dataMap.mapHeight);

            // console.log(dataRoad);
            setMap(dataRoad);

        }
    }, [dataMap]);

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

            <BodyQuestion
                questions={listQuestion.current}
                onCloseModal={handleCloseModal}
                onBackToPrev={backToPreviousStep}
                randomAngle={randomDice.current}
            />

        )
    }
    const showCountWrong = () => {

        if (!isEmpty(wrong)) {
            let wrongConLai = wrong.maxWrong - wrong.quantityWrongCur;
            return Array.from(new Array(wrongConLai), () => {
                return <img src="https://img.icons8.com/stickers/20/000000/like.png" />
            });
        }

    }
    const widthCanvas = dataMap?.width * dataMap?.mapWidth / 10;
    const heightCanvas = dataMap?.height * dataMap?.mapHeight / 10;
    return (
        <Base body={
            <>
                {isDice && <Dice status={onDice} randomAngle={randomDice.current} isDice={isDice} />}
                {!_.isEmpty(map) &&
                    <>
                        {/* <button onClick={handleMove}> */}
                        <img src='https://i.ibb.co/m4pX7dW/unnamed.png'
                            style={{ backgroundImage: 'tra', height: '20px', width: '20px', position: 'fixed', zIndex: 2000 }}
                            onClick={handleMove}
                            hidden={!allowToDice.current}
                        />
                        {/* </button> */}
                        <div style={{ position: 'absolute', right: '20px', zIndex: 1 }} hidden={showQuestion}>{showCountWrong()}</div>

                        {/* <canvas id='canvas1' style={{ width: '100%' , height: '100%', position: "absolute" }} width={currentMap?.width * currentMap?.mapWidth / 10} height={currentMap?.height * currentMap?.mapHeight / 10}></canvas> */}
                        <div id="canvasesdiv" style={{
                            width: '100%', minHeight: '100%',
                            position: "relative"

                        }}>
                            {/* <canvas
                                // style={{
                                //     width: '100%', minHeight: '100%',
                                //     position :"absolute"
                                // }}
                                className='layer-map'
                                ref={canvasRef} width={currentMap?.width * currentMap?.mapWidth / 10}
                                height={currentMap?.height * currentMap?.mapHeight / 10}
                            >
                            </canvas> */}


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
                        </div>



                    </>
                }

                {/* <img ref={imageE} hidden/> */}

                {showQuestion && PopupQuestion()}
            </>

        } isLoading={isLoading} text={"Đang tải bản đồ"} />


    );
}

export default MapComponent;