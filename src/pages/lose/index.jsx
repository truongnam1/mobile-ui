import React, { useEffect, useState } from 'react';
import { Base } from '../Base';
import {useNavigate} from 'react-router-dom'
import './lose.css'
function Lose(props) {
    const navigate = useNavigate();
    const caculatorTime = (time) => {
        const second = time % 60 >=10 ?  time % 60 : `0${ time % 60}`;
        const minute = Math.floor(time / 60)  >=10 ?  Math.floor(time / 60) : `0${ Math.floor(time / 60)}`;
        return `${minute} phút ${second} giây`;
    }
    const [totalTime, setTotalTime] = useState(0);
    useEffect(() => {
        setTotalTime(JSON.parse(sessionStorage.getItem('totalTime')));
    }, [sessionStorage.getItem('totalTime')])
    return (
        <div>
            <img 
            style={{width: '100%', height: '745px',}}
            src='https://previews.123rf.com/images/lilu330/lilu3301612/lilu330161200073/68821802-beautiful-mountain-meadow-landscape-vector-cartoon-outdoor-illustration-sunny-day-background-for-gam.jpg'/>
            <span className='game_over'>GAME OVER</span>
            <span className='total_time_play_lose'>Tổng thời gian chơi: {caculatorTime(totalTime)}</span>
            <button className='play_again' onClick={() => {
                 navigate('/map');
                 sessionStorage.removeItem('totalTime')
            }}>Chơi lại</button>
            <button className='exit_game' onClick={() => {
                navigate('/start')
                sessionStorage.removeItem('totalTime')
            }}>Thoát</button>
        </div>
    );
}


function MainLose () {
    return (
        <Base body={<Lose/>}/>
    )
}
export default MainLose;