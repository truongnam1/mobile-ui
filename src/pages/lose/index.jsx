import React from 'react';
import { Base } from '../Base';
import {useNavigate} from 'react-router-dom'
import './lose.css'
function Lose(props) {
    const navigate = useNavigate();
    return (
        <div>
            <img 
            style={{width: '100%', height: '745px',}}
            src='https://previews.123rf.com/images/lilu330/lilu3301612/lilu330161200073/68821802-beautiful-mountain-meadow-landscape-vector-cartoon-outdoor-illustration-sunny-day-background-for-gam.jpg'/>
            <span className='game_over'>GAME OVER</span>
            <button className='play_again' onClick={() => {
                 navigate('/map')
            }}>Chơi lại</button>
            <button className='exit_game' onClick={() => {
                navigate('/start')
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