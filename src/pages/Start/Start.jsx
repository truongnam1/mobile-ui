import React from 'react';
import Button from '../../components/Button/Button';
import { Base } from '../Base';
import styleStart from './Start.module.scss';
import BodyStart from './BodyStart';

function Start(props) {
    return (
        <>
            <Base body={<BodyStart></BodyStart>}>
            </Base>
        </>
    );
}

export default Start;