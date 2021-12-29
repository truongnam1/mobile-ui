import React, { useEffect, useRef, useState } from 'react';
import AnimationText from '../Text';
import './counttime.scss'
function CountTime({firstValue, onClearTime, onBackToPrev, onChangeStatusTime}) {
    const [count, setCount] = useState(firstValue);
    const time = useRef();
    const [currentTime, setCurrentTime] = useState();
    const stopTime = () => {
        clearInterval(time.current);
    }
    const startTime = () => {
        time.current = setInterval(() => {
            setCount(prev => prev-1);
        }, 1000)
    }
    useEffect(() => {
        time.current = setInterval(() => {
            setCount(prev => prev-1);
        }, 1000)
        
       return () => clearInterval(time.current)
    },[])
    useEffect(() => {
        
        if(count == 0) {
            clearInterval(time.current);
           const timeOut = setTimeout(() => {
            onBackToPrev && onBackToPrev();
            onClearTime && onClearTime('timeover');
            clearTimeout(timeOut)
           }, 1500)
        }
    }, [count]);
    //dung thoi gian
    useEffect(() => {
        if(onChangeStatusTime) {
            stopTime();
        }
    },[onChangeStatusTime]);

    const caculatorTime = (time) => {
        const second = time % 60 >=10 ?  time % 60 : `0${ time % 60}`;
        const minute = Math.floor(time / 60)  >=10 ?  Math.floor(time / 60) : `0${ Math.floor(time / 60)}`;
        return `${minute}:${second}`;
    }
    return (
        <div className={`time_count ${Math.floor(count / 60) == 0 && count % 60 <= 5 ? "blink-text-count-time": ""}`} >
            {caculatorTime(count)}
            {count == 0 &&  <AnimationText text={"Hết giờ"} top={'30%'} left={'38%'} size={'100px'}/>}
        </div>   
    );
}

export default CountTime;