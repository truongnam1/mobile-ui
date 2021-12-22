import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from 'react-slick';

import styleQuestion from './Question.module.scss';
import { useNavigate } from 'react-router-dom';
import Artifacts from './Artifacts';
import CountTime from '../../components/CountTime';
import TracNghiem from './TracNghiem';
import XepHinh from './XepHinh';
import Dice from '../Map/dice';
function BodyQuestion({ questions, onCloseModal, onBackToPrev, randomAngle }) {
    const [typeQuestion, setTypeQuestion] = useState(questions[randomAngle % 3]);
    // const [typeQuestion, setTypeQuestion] = useState(questions[1]);

    
    const navigate = useNavigate();
    console.log(randomAngle % 3);
    return (
        <>
            <div className={clsx(styleQuestion['main-question'])}>
                {typeQuestion?.type == 'trac_nghiem' ? 
                <TracNghiem onCloseModal={onCloseModal} questions={typeQuestion} onBackToPrev={onBackToPrev} />
                    : typeQuestion?.type == 'xep_hinh' ? <XepHinh onCloseModal={onCloseModal} questions={questions[0]} onBackToPrev={onBackToPrev} />
                        : <>
                            <CountTime firstValue={4} onClearTime={onCloseModal} onBackToPrev={onBackToPrev} />
                        </>
                }


            </div>
        </>
    );
}

export default BodyQuestion;