import clsx from 'clsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styleQuestion from './Question.module.scss';
import TracNghiem from './TracNghiem';
import XepHinh from './XepHinh';
import Scan from '../Scan/Scan';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../Provider/UserContext';
import { useGlobalState } from 'state-pool';
import { CacheImageContext } from '../../Provider/CacheImageContext';
function BodyQuestion({ questions, onCloseModal, onBackToPrev }) {
    var arrIndexQuestion = JSON.parse(sessionStorage.getItem('arrIndexQuestion'));

    // console.log(arrIndexQuestion);
    // const indexQuestionRd =  arrIndexQuestion[Math.floor(Math.random()* arrIndexQuestion.length)];
    // const typeQuestion = questions[indexQuestionRd];


    // arrIndexQuestion =  arrIndexQuestion.filter(indexQuestion => indexQuestion !== indexQuestionRd)
    // sessionStorage.setItem('arrIndexQuestion', `[${arrIndexQuestion.toString()}]`);
    // console.log('set lai index');

    const [typeQuestion, setTypeQuestion] = useState(questions[9]);

    const [refElMain] = useGlobalState("elMain");
    useEffect(() => {
        console.log('scroll top');
        refElMain.current.scrollTop = 1;
    }, [])


    const questionItem = () => {
        const configCD = {
            "trac_nghiem": 60,
            "xep_hinh": 60,
            "scan": 20,
        }

        const configQuestion = {
            onCloseModal: onCloseModal,
            questions: typeQuestion,
            onBackToPrev: onBackToPrev
        }


        console.log(`question`, typeQuestion);
        switch (typeQuestion.type) {
            case 'trac_nghiem':
                const rd = Math.random();
                return (<TracNghiem
                    {...configQuestion}
                    countdown={configCD['trac_nghiem']}
                />)

            case 'xep_hinh':
                return (<XepHinh
                    {...configQuestion}
                    countdown={configCD['xep_hinh']}
                />)

            case 'scan':

                return (<Scan
                    {...configQuestion}
                    countdown={configCD['scan']}
                ></Scan>)
            default:
                return <><h2>loi</h2></>

        }


    }

    return (
        <>
            <div className={clsx(styleQuestion['main-question'])} >
                <div className={clsx(styleQuestion['body-question'], "container-sm")}>
                    {questionItem()}
                </div>
            </div>
        </>
    );
}

export default BodyQuestion;