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
    const [isLoading, setIsLoading] = useState(false);
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
    const cacheImageXepHinh = useRef();
    const itemModal = useRef([]);
    const filterEventOfRoad = useMemo(() => {
        if (!_.isEmpty(map) && !_.isEmpty(dataMap)) {
            const result =  map.reduce((object, item) => {
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
                const newItem = {...item, td: (temp[0])[0]};
                itemModal.current = [...itemModal.current || [], newItem ];
            //    console.log("temp", (temp[0])[0]);    
            }
            console.log(" itemModal.current",  itemModal.current);
            return result;

        }
    }, [map, dataMap]);

    console.log(filterEventOfRoad);
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
                const pictureCha = Object.values(dataMap.layers.charater);

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
                setShowText("Trừ 1 mạng")
                const timeOut1 = setTimeout(() => {
                    actionDataMap({
                        type: "UPDATE_LAYER_CHARACTER",
                        newLayerCharacter: newCha
                    });
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
        fetch('https://api.npoint.io/6a4c897196b39197353e')
            .then(jsonData => jsonData.json())
            .then(data => {
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

    }, [dataMap])

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
 



    const ModalIntroductionMap = () => {
        
        return (
            <div className='modal_map_intro container-sm border Base_main__3GwWY'>  
                    <div className="row">
                   
                        <div className="col-sm-12">
                            <i className="far fa-times-circle" style={{float: 'right'}} onClick={() => {
                                 setTypeModal(false);
                            }}></i>
                        </div>
                        <div className="col-sm-12">
                            <div className="row">
                                <div className="col-sm-3" style={{margin: 'auto', fontSize: '18px !important', color: 'orangered'}}>
                                    <span className='text_modal_map'>
                                        Mô tả
                                    </span>
                                </div>

                                <div className="col-sm-11" style={{margin: 'auto'}}>
                                    <span className='text_modal_map'>
                                        Đây là bản đồ dẫn tới kho báu Rồng. Có rất nhiều chướng ngại vật, thử thách khó khăn trên đường đi tìm kho báu. Một số chướng ngại vật có thể cản trở bạn hoặc có thể giúp bạn đến kho báu nhanh hơn. Dưới đây là một vài chú thích:
                                    </span>
                                </div>

                            </div>
                        </div>
                        
                        <div className="col-sm-12 border_map_modal animate__zoomInDown animate__animated">
                            <div className="row" style={{alignItems: 'center'}}>
                                <div className="col-sm-1">
                                    <img 
                                    src={process.env.PUBLIC_URL + '/assets/images/khobau.png'}
                                    style={{width: '32px', height: '32px'}}
                                    />
                                </div>
                                <div className="col-sm-11">
                                    <span className='text_modal_map'>Đây chính là kho báu Rồng. Nếu lấy được nó bạn sẽ được ban thưởng một phần thưởng</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 border_map_modal animate__zoomInDown animate__animated">
                            <div className="row" style={{alignItems: 'center'}}>
                                <div className="col-sm-1">
                                    <img 
                                    src={process.env.PUBLIC_URL + '/assets/images/dice.png'}
                                    style={{width: '32px', height: '32px'}}
                                    />
                                </div>
                                <div className="col-sm-11">
                                    <span className='text_modal_map'>Ấn vào đây để có thể di chuyển </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 border_map_modal animate__zoomInDown animate__animated">
                            <div className="row" style={{alignItems: 'center'}}>
                                <div className="col-sm-1">
                                    <img 
                                    src={process.env.PUBLIC_URL + '/assets/images/heart.png'}
                                    style={{width: '32px', height: '32px'}}
                                    />
                                </div>
                                <div className="col-sm-11">
                                    <span className='text_modal_map'>Số lượt chơi của bạn là giới hạn nên hãy thận trọng với những câu hỏi. Nó sẽ được hiển thị tại góc trên cùng bên phải của màn hình</span>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 border_map_modal animate__zoomInDown animate__animated">
                            <div className="row" style={{alignItems: 'center'}}>
                                <div className="col-sm-1">
                                    <img 
                                    src={process.env.PUBLIC_URL + '/assets/images/time.png'}
                                    style={{width: '32px', height: '32px'}}
                                    />
                                </div>
                                <div className="col-sm-11">
                                    <span className='text_modal_map'>Tại góc trên cùng bên trái màn hình. Đây là nơi hiển thị tổng thời gian từ ban đầu cho tới khi bạn tìm được kho báu.</span>
                                </div>
                            </div>
                        </div>

                        {itemModal.current.map(item => {
                            if(item?.effect.includes("back_forward")) {
                                item.des = "Đây là .....Khi bước vào đây bạn sẽ được tiến thêm một số ô nhất định"
                            } else if(item?.effect.includes("forward")) {
                                item.des = "Khi bước vào đây bạn sẽ phải lùi về sau"
                            } else if(item?.effect.includes("tele")) {
                                item.des = "Cổng không gian, bạn sẽ bị dịch chuyển tới một nơi bất kì nào đó trong bản đồ khi bước vào nó."
                            }

                            return (
                                <div className="col-sm-12 border_map_modal animate__zoomInDown animate__animated">
                                    <div className="row" style={{alignItems: 'center'}}>
                                        <div className="col-sm-1">
                                            <Canvas keys={item?.td} img={srcImage[item?.tilesetIdx || 0]}/>
                                        </div>
                                        <div className="col-sm-11">
                                            <span className='text_modal_map'>{item?.des}</span>
                                        </div>
                                    </div>
                                    
                                </div>
                            )
                        })}
                        
                    </div>
            </div>
  
        )
    }


    return (
        <Base body={
            <>
                {isDice && <Dice status={onDice} randomAngle={randomDice.current} isDice={isDice} />}
                {showText && handleShowText(showText)}
                {!_.isEmpty(map) &&
                    <>
                        <TotalTime />
                        <button
                        type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="left" title="Tung xúc sắc"
                        style={{ background: 'transparent', position: 'fixed', zIndex: 2000, bottom: '20%', right: '31%', opacity: 0.8, border: 'none', outline: 'none    ' }}
                        hidden={!allowToDice.current}
                        >
                            <img src='https://i.ibb.co/m4pX7dW/unnamed.png'
                                style={{ height: '25px', width: '25px'}}
                                onClick={handleMove}
                                
                            />
                        </button>
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
                                {/* <RobotModel canvasRef={canvasRef} currentPoint={currentPoint.current} map={map}

                                    width={widthCanvas}
                                    height={heightCanvas}
                                /> */}
                        </div>



                    </>
                }

                {/* <img ref={imageE} hidden/> */}

                {showQuestion && PopupQuestion()}
                {typeModal && ModalIntroductionMap()}
            </>

        } isLoading={isLoading} text={"Đang tải bản đồ"} onSetTypeModal={handleShowModalIntroduction}/>


    );
}

export default MapComponent;