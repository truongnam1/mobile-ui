import React, { useEffect, useRef, useState } from 'react';

function TotalTime({onSetSesTotal}) {
    const [count, setCount] = useState(0);
    const mainTime = useRef();
    const caculatorTime = (time) => {
        const second = time % 60 >=10 ?  time % 60 : `0${ time % 60}`;
        const minute = Math.floor(time / 60)  >=10 ?  Math.floor(time / 60) : `0${ Math.floor(time / 60)}`;
        return `${minute}:${second}`;
    }
    useEffect(() => {
        mainTime.current = setInterval(() => {
            setCount(prev => prev+1);
        }, 1000);
       
    }, []);
    useEffect(() => {
        return () => {
            sessionStorage.setItem("totalTime", JSON.stringify(count));
            clearInterval(mainTime.current);    
        }
    },[])
    return (
        <div style={{position: 'fixed', zIndex: 2000}}>
             {caculatorTime(count)}
        </div>
    );
}

export default TotalTime;