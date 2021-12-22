import React from 'react';
import styleComplete from './Complete.module.scss';
import styleBase from '../Base/Base.module.scss';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import './complete.css'
function BodyComplete(props) {

    const navigate = useNavigate();
    return (
        <>
            <img src="https://media.giphy.com/media/3orntPDQO9sdQAZ4vT/giphy.gif" className="background-configration"/>
            <img src="../assets/images/start.png" alt="" className="background-screen-winner"/>
            <div className="image-huychuong">
                {/* <img src="../../assets/image/huychuong.svg" alt="" style={{width: '100%', height: '100%'}}/> */}
            </div>
            <div className={clsx('row', styleComplete['container-winner-content'])} >
                {/* <div className={clsx(styleComplete['done-clock'])}>
                    <p className={clsx('text-center', 'fw-normal', 'fs-3', styleComplete['done-clock-text'])}>00:30</p>
                </div> */}
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