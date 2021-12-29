import React from 'react';
import HoaRoiComponent from '../../components/HoaRoi';
import { Base } from '../Base';
import Background from './Background';
import BodyComplete from './BodyComplete';


function Complete(props) {

    return (
       <Base body={<BodyComplete/>} top={<Background/>}>
           <HoaRoiComponent/>
       </Base>
    );
}

export default Complete;