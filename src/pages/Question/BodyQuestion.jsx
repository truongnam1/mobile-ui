import clsx from 'clsx';
import React, {useEffect} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick';

import styleQuestion from './Question.module.scss';
import { useNavigate } from 'react-router-dom';
import Artifacts from './Artifacts';
import CountTime from '../../components/CountTime';
function BodyQuestion(props) {
    const settings = {
        className: styleQuestion['artifacts'],
        slidesToScroll: 1,
        slidesToShow: 4,
        variableWidth: true,
    };

    // useEffect(() => {
    //     fetch('https://api.npoint.io/658232b33eb69c8bddc7')
    //         .then(response => response.json())
    //         .then(data => console.log(data));
    // }, [])

    
    const navigate = useNavigate();

    return (
        <>
            <div className={clsx('row', 'gx-0')}>
                {/* <div className={clsx(styleQuestion['artifacts'])}> */}
              <Artifacts></Artifacts>
                {/* </div> */}
            </div>
           <CountTime firstValue={5}/>
            <div className={clsx('row', 'gx-0', styleQuestion['container-decription-history'])}>
                <p>Đây là bộ sưu tập thời đại Hùng Vương và giai đoạn văn hóa Phùng Nguyên, Phú Thọ ok</p>
            </div>
            <div
                className={clsx('row', 'align-items-center', 'justify-content-center')}
            >
                <div
                    onClick={() => navigate('/scan')}
                    className={clsx('col-3', 'btn', styleQuestion['btn-mobile'], styleQuestion['btn-scan'])}
                >
                    QUÉT
                </div>

            </div>
        </>
    );
}

export default BodyQuestion;