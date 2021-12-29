import React, {useState, useEffect} from 'react';
import styleComplete from './Complete.module.scss';
import styleBase from '../Base/Base.module.scss';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import './complete.css'
function BodyComplete(props) {

    const [totalTime, setTotalTime] = useState(0);
    useEffect(() => {
        setTotalTime(JSON.parse(sessionStorage.getItem('totalTime')));
    }, [sessionStorage.getItem('totalTime')])
    const caculatorTime = (time) => {
        const second = time % 60 >=10 ?  time % 60 : `0${ time % 60}`;
        const minute = Math.floor(time / 60)  >=10 ?  Math.floor(time / 60) : `0${ Math.floor(time / 60)}`;
        return `${minute}:${second}`;
    }
    const navigate = useNavigate();
    return (
        <>
        <div className={clsx('row', styleComplete['container-winner-content'])} >
            <div className={clsx(styleComplete['done-clock'])}>
                <p className={clsx('text-center', 'fw-normal', 'fs-3', styleComplete['done-clock-text'])}>{caculatorTime(totalTime)}</p>
            </div>
            <div>
                <p className={clsx('text-center', 'fw-bolder', 'fs-4')}>KẺ HỦY DIỆT LỊCH SỬ</p>
            </div>
            <div style={{ position: "relative" }}>
                <p className={clsx('text-center')}>Thật tuyệt vời, bạn đã là một trong những người xuất sắc hoàn thành tour khám phá bảo tàng</p>

                <div className={clsx(styleComplete['bg-winner-content'])}></div>
            </div>

            <div className={clsx(styleBase['center-flex'], 'mt-2', 'row')}>
                <div>
                    <p className="text-center">Hà Nội, ngày 14-02-2021</p>
                </div>
            </div>

            <div className="row d-flex align-items-center justify-content-center mt-2 ">
                <div 
                onClick={() => navigate('/start')}
                className={clsx('col-4', 'btn', styleBase['btn-mobile'], styleBase['bg-button'])}
                >
                    CHIA SẺ
                </div>
            </div>
        </div>
    </>
    );
}

export default BodyComplete;