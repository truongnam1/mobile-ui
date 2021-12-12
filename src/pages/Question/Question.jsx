import React from 'react';
import Button from '../../components/Button/Button';
import { Base } from '../Base';
// import styleStart from './Question.module.scss';
import BodyQuestion from './BodyQuestion';

function Question(props) {
    return (
        <>
            <Base body={<BodyQuestion></BodyQuestion>}>
            </Base>
        </>
    );
}

export default Question;