import React, { useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
// import codebeautty from './codebeautify.json'
import styleBase from '../Base/Base.module.scss';
import Base from '../Base/Base'
import _ from 'lodash';
import Dice from './dice';
import BodyQuestion from '../Question/BodyQuestion';
import {useNavigate} from 'react-router-dom'
import { useGlobalState } from 'state-pool';
function MapComponent(props) {
    const imageE = useRef();
    const canvasRef = useRef();
    const [codebeautty, setCodebeauty] = useState({});
    const [listPicture, setListPicture] = useState([]);
    const [map, setMap] = useState([]);
    const [onDice, setOnDice] = useState(false);
    const charactor = useRef();
    const currentPoint = useRef(0);
    const randomDice = useRef();
    const [isDice, setIsDice] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigate();
    const listQuestion = useRef([]);
    const previousStep = useRef();
    const [countWrong, setCountWrong] = useState([1,2,3]);
    const itemRoad = useRef([]);
    const eventOfRoad = useRef([]);
    const allowToDice = useRef(true);
    const filterEventOfRoad = useRef({});
    const beforeTypeEvent = useRef();
    const [currentMap, setCurrentMap] = useState({});
    const handleValidateMove = (time, dice) => {
        if(validateStep(map[currentPoint.current]) !== false) {
            currentPoint.current = currentPoint.current+validateStep(map[currentPoint.current]);
            const pictureCha = Object.values(charactor.current);
            const a = map[currentPoint.current];
            const newCha = {
                [`${a.split('-')[0]}-${a.split('-')[1]-1}`]: pictureCha[0],  
                [a]: pictureCha[1],
    
            }
            
            const timeOut = setTimeout(() => {
                const pewpew = [...listPicture];
                allowToDice.current = true;
                setListPicture([...pewpew, newCha]);
                if(beforeTypeEvent.current == 'forward') handleValidateMove(1000, false);
                clearTimeout(timeOut);
            }, time);
        } else {
            if(dice) {
                const timeShowQues = setTimeout(() => {
                    setShowQuestion(true);
                    clearTimeout(timeShowQues);
                }, 2400)
            }
            
        }
    }
    const handleMove = () => {
        try {
            allowToDice.current = false;
            const dice =  Math.floor(Math.random() * 6) + 1;
            // Math.floor(Math.random() * 6) + 1;
            randomDice.current = dice;
            if(currentPoint.current+dice < (_.size(map)-1)) {
                previousStep.current = currentPoint.current;
                const a = map[(currentPoint.current+dice) > (_.size(map)-1) ? (_.size(map)-1) : currentPoint.current+dice];
                setOnDice(!onDice);
                setIsDice(true);
                currentPoint.current = currentPoint.current+dice
                const pictureCha = Object.values(charactor.current);
                const newCha = {
                    [`${a.split('-')[0]}-${a.split('-')[1]-1}`]: pictureCha[0],  
                    [a]: pictureCha[1],
        
                }
                listPicture.splice(listPicture.length - 1)
                const pewpew = [...listPicture];
                const timeOut = setTimeout(() => {
                    setListPicture([...pewpew, newCha]);
                    
                    setIsDice(false);
                    clearTimeout(timeOut);
                }, 2000);
                
                handleValidateMove(3000, true);
               
            } else {
                const a = map[(_.size(map)-1)];
                const pictureCha = Object.values(charactor.current);
                setOnDice(!onDice);
                setIsDice(true);
                const newCha = {
                    [`${a.split('-')[0]}-${a.split('-')[1]-1}`]: pictureCha[0],  
                    [a]: pictureCha[1],
        
                }
                listPicture.splice(listPicture.length - 1)
                    const pewpew = [...listPicture];
                 
                    const timeOut = setTimeout(() => {
                        setListPicture([...pewpew, newCha]);
                        setIsDice(false);
                        clearTimeout(timeOut);
                    }, 1500)
                    const timeOut2 = setTimeout(() => {
                        navigation('/complete')
                        clearTimeout(timeOut2);
                    }, 3500)
                
            }
        } catch(err) {
            console.log(err);
        }
       
       
    }
    //quay lai o cu
    const backToPreviousStep = () => {
        if(countWrong == 1) {
            navigation('/lose')
        } else {
            const a = map[(previousStep.current) > (_.size(map)-1) ? (_.size(map)-1) : previousStep.current];
            currentPoint.current = previousStep.current
            const pictureCha = Object.values(charactor.current);
            const newCha = {
                [`${a.split('-')[0]}-${a.split('-')[1]-1}`]: pictureCha[0],  
                [a]: pictureCha[1],
    
            }
            listPicture.splice(listPicture.length - 1)
            const pewpew = [...listPicture];
            setCountWrong(countWrong.filter(item => item != countWrong[_.size(countWrong) -1]))
            const timeOut = setTimeout(() => {
                setListPicture([...pewpew, newCha]);
                clearTimeout(timeOut);
            }, 2000)
        }
        
    }
    const findFirtPoint = (arr) => {
        const arrPoint = arr.filter(item => item.split('-')[1] == (currentMap?.mapHeight-1));
        if(arr.includes((arrPoint[0].split('-')[0] + '-' + (arrPoint[0].split('-')[1]-1)))) return arrPoint[_.size(arrPoint)-1];
        else return arrPoint[0];
    }
    const caculatorDistance = (x,y,x1,y1) => {
        return (Math.pow((x-x1), 2) + Math.pow((y-y1), 2)) == 1 ? true : false;
    }
    const sort = (arr) => {
        if(!_.isEmpty(arr) && !_.isEmpty(currentMap)) {
            const firstPoint = findFirtPoint(arr);
            let newArr = [firstPoint];
            _.remove(arr, function(item) {
                return item == newArr[0] ;
            })
            while(_.size(arr) != 0){
                for(let i=0; i < _.size(arr); ++i) {
                    if(newArr[_.size(newArr)-1] != arr[i]) {
                        if(caculatorDistance(newArr[_.size(newArr)-1].split('-')[0], newArr[_.size(newArr)-1].split('-')[1], arr[i].split('-')[0],arr[i].split('-')[1])) {
                            newArr = [...newArr, arr[i]];
                            _.remove(arr, function(item) {
                                return item == arr[i] ;
                            })
                        }
                    } 
                }
            }
            return newArr;
        } else return [];
       
    }
    //lay thong tin cua ban do
    useEffect(() => {
        setIsLoading(true);
        fetch('https://api.npoint.io/6a4c897196b39197353e')
        .then(jsonData => jsonData.json())
        .then(data => {
            setCodebeauty(data);
            const keyMap = Object.keys(data?.maps);
            const randomMap = data?.maps[keyMap[Math.floor(Math.random() * (_.size(keyMap)))]];
            setCurrentMap(randomMap);
            setListPicture(randomMap?.layers.map(item => {
                return item?.tiles
            }))
            
            itemRoad.current =  randomMap?.layers.reduce((arr,item) => {
                if(item?.name == 'item-road') return arr = item?.tiles;
                else return arr;
            },[]);
            eventOfRoad.current = data?.define_item_map;
            listQuestion.current = data?.questions;

            var arrIndexQuestion = [];
            for (const key in listQuestion.current) {
                arrIndexQuestion.push(key);
            }

            sessionStorage.setItem('arrIndexQuestion', `[${arrIndexQuestion.toString()}]`);
            


            charactor.current = randomMap?.layers.reduce((arr,item) => {
                if(item?.name == "charater") return  item?.tiles;
                else return arr;
            }, {});
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
        }) 
    },[])
    //filer envent road

    useEffect(() => {
        if(!_.isEmpty(map) && !_.isEmpty(itemRoad.current)) {
            filterEventOfRoad.current = map.reduce((object,item) => {
                if(itemRoad.current[item]) {
                    const key = itemRoad.current[item]?.x + '-'+itemRoad.current[item]?.y;
                    object[key] = [...object[key] || [], item];
                    return object;
                } else return object;
                
            }, {})
        }
    }, [map, itemRoad.current])
    //kiem tra xem co boom
    const validateStep = (toado) => {
        if(_.isEmpty(itemRoad.current[toado])) return false;
        else {
            const typeEvent = eventOfRoad.current.reduce((object, item) => {
                if(item?.tileSymbol == itemRoad.current[toado]?.tileSymbol) return item;
                else return object;
            }, {})
            if(typeEvent?.effect.split(' ')[0] == 'back_forward') {
                beforeTypeEvent.current = 'forward';
                return -Number(typeEvent?.effect.split(' ')[1]);
            }
            else if(typeEvent?.effect.split(' ')[0] == 'forward') {
                beforeTypeEvent.current = 'forward';
                return Number(typeEvent?.effect.split(' ')[1]);
            }
            else if(typeEvent?.effect.split(' ')[0] == 'tele') {
                beforeTypeEvent.current = 'tele';
                const numberTele =  Number(typeEvent?.effect.split(' ')[1]);
                const typeFilterEvent = itemRoad.current[toado]?.x + '-' + itemRoad.current[toado]?.y;
                const currentTele = filterEventOfRoad.current[typeFilterEvent].indexOf(toado);
                if(currentTele + numberTele > (_.size(filterEventOfRoad.current[typeFilterEvent])-1)) {
                    const valueTeleToJump = map.indexOf((filterEventOfRoad.current[typeFilterEvent])[_.size(filterEventOfRoad.current[typeFilterEvent])-1]);
                    return valueTeleToJump - currentPoint.current;
                } else if(currentTele + numberTele < 0) {
                    const valueTeleToJump = map.indexOf((filterEventOfRoad.current[typeFilterEvent])[0]);
                    return valueTeleToJump - currentPoint.current;
                } else {
                    const valueTeleToJump = map.indexOf((filterEventOfRoad.current[typeFilterEvent])[currentTele + numberTele]);
                    return valueTeleToJump - currentPoint.current;
                }
            } else return false
        }
    }
    useEffect(() => {
        
       
        if(!_.isEmpty(codebeautty)) {   
          
            imageE.current.src='https://i.ibb.co/KzSwmBv/ztwPZOI.png?fbclid=IwAR0gBT_O7lVJ1gHYpvl7fnVG3S5Jyjdpt89lXby4L4CPi08Tqx1eV0SlUMc'
          
            imageE.current.onload = function() {
               draw(listPicture)
            }
        }
       
    }, [codebeautty,listPicture]);
    useEffect(() => {
        if(!_.isEmpty(currentMap)) {   
        setMap(sort([...Object.keys(currentMap?.layers[2].tiles)])); 
        }   
    }, [currentMap]);
    //filter event road
    useEffect(() => {
        if(!_.isEmpty(map)) {
            
        }
    },[map, itemRoad.current])
    const draw = (layers) => {
        let ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        const size_of_crop = 32;
        layers.forEach((layer) => {
            Object.keys(layer).forEach((key) => {
               //Determine x/y position of this placement from key ("3-4" -> x=3, y=4)
               const positionX = Number(key.split("-")[0]);
               const positionY = Number(key.split("-")[1]);
               const tilesheetX = layer[key]?.x;
                const tilesheetY = layer[key]?.y;
               ctx.drawImage(
                  imageE.current,
                  tilesheetX * 32,
                  tilesheetY * 32,
                  size_of_crop,
                  size_of_crop,
                  positionX * 32,
                  positionY * 32,
                  size_of_crop,
                  size_of_crop
               );
            });
         });
    }
    const handleCloseModal = () => {
        allowToDice.current = true;
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
       return countWrong.map(item => {
            return (
                <img src="https://img.icons8.com/stickers/20/000000/like.png"/>
                ) 
        })
        
    }
    //excuter event road
    const excuterEventRoad = () => {

    }
    return (
        <Base body={
            <>
            {isDice &&  <Dice status={onDice} randomAngle={randomDice.current} isDice={isDice}/>}
            {!_.isEmpty(map) &&
            <>
                {/* <button onClick={handleMove}> */}
                    <img src='https://play-lh.googleusercontent.com/0sj3K5n2ztdSK2Pnl795XFBcthqGhMJX1BCCciwZivfGJthuT1j_dJ33KrkIo1iCd9U'
                        style={{ backgroundImage: 'tra', height: '20px', width: '20px', position: 'fixed', zIndex: 2000 }}
                        onClick={handleMove}
                        hidden={!allowToDice.current}
                    />
                {/* </button> */}
                <div style={{position: 'absolute', right: '20px'}}>{showCountWrong()}</div>
                <canvas style={{width: '100%', height: '100%'}} ref={canvasRef} width={currentMap?.width*currentMap?.mapWidth/10} height={currentMap?.height*currentMap?.mapHeight/10}></canvas>
            </>
            }
            
            <img ref={imageE} hidden/>
            {showQuestion && PopupQuestion()}
            </>
            
        } isLoading={isLoading} text={"Đang tải bản đồ"}/>
            
        
    );
}

export default MapComponent;