import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
// import codebeautty from './codebeautify.json'
import styleBase from '../Base/Base.module.scss';
import Base from '../Base/Base'
import _ from 'lodash';
import Dice from './dice';
import BodyQuestion from '../Question/BodyQuestion';
import {useNavigate} from 'react-router-dom'
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
    const getCoords = (e) => {
        
    }
    const handleMove = () => {
        const dice = Math.floor(Math.random() * 6) + 1;
        randomDice.current = dice;
        if(currentPoint.current+dice < (_.size(map)-1)) {
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
            }, 2000)
            const timeShowQues = setTimeout(() => {
                setShowQuestion(true);
                clearTimeout(timeShowQues);
            }, 2400)
           
        } else {
            navigation('/complete')
        }
       
    }
    const findFirtPoint = (arr) => {
        const arrPoint = arr.filter(item => item.split('-')[1] == (codebeautty?.maps?.nam_ngang.mapHeight-1));
        if(arr.includes((arrPoint[0].split('-')[0] + '-' + (arrPoint[0].split('-')[1]-1)))) return arrPoint[_.size(arrPoint)-1];
        else return arrPoint[0];
    }
    const caculatorDistance = (x,y,x1,y1) => {
        return (Math.pow((x-x1), 2) + Math.pow((y-y1), 2)) == 1 ? true : false;
    }
    const sort = (arr) => {
        if(!_.isEmpty(arr) && !_.isEmpty(codebeautty)) {
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
    useEffect(() => {
        setIsLoading(true);
        fetch('https://api.npoint.io/6a4c897196b39197353e?fbclid=IwAR0eWYwumHoPbOdQn1lYAoEakvdPhud6htJYU-J-g7FmvMiMdoudcxAP-d4')
        .then(jsonData => jsonData.json())
        .then(data => {
            setCodebeauty(data);
            setListPicture(data?.maps?.nam_ngang?.layers.map(item => {
                return item?.tiles
            }))
            charactor.current = data?.maps?.nam_ngang?.layers[4].tiles;
            setIsLoading(false);
        })
    },[])
    useEffect(() => {
        
       
        if(!_.isEmpty(codebeautty)) {   
           
            imageE.current.src='https://i.ibb.co/KzSwmBv/ztwPZOI.png?fbclid=IwAR0gBT_O7lVJ1gHYpvl7fnVG3S5Jyjdpt89lXby4L4CPi08Tqx1eV0SlUMc'
            imageE.current.onload = function() {
               draw(listPicture)
            }
        }
       
    }, [codebeautty,listPicture]);
    useEffect(() => {
        if(!_.isEmpty(codebeautty)) {   
        setMap(sort([...Object.keys(codebeautty?.maps?.nam_ngang?.layers[2].tiles)])); 
        }   
    }, [codebeautty])
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
    const PopupQuestion = () => {
        const turnOffModal = setTimeout(() => {
            setShowQuestion(false);
            clearTimeout(turnOffModal);
        }, 5000)
        return (
            <div style={{position: 'fixed', right: 0,left: 0, top: 0, width: '100%', height: '100%', background: 'white'}} className='container-sm Base_main__3GwWY'>
                <BodyQuestion/>
            </div>
            
        )
    }
    return (
        <Base body={
            <>
            {isDice &&  <Dice status={onDice} randomAngle={randomDice.current} isDice={isDice}/>}
           
            <button onClick={handleMove}>DICE</button>
            <canvas style={{width: '100%', height: '100%'}} ref={canvasRef} width={codebeautty?.maps?.nam_ngang?.width*codebeautty?.maps?.nam_ngang?.mapWidth/10} height={codebeautty?.maps?.nam_ngang?.height*codebeautty?.maps?.nam_ngang?.mapHeight/10}></canvas>
            <img ref={imageE} hidden/>
            {showQuestion && PopupQuestion()}
            </>
            
        } isLoading={isLoading}/>
            
        
    );
}

export default MapComponent;