import React from 'react';
import { Base } from '../Base';
import BodyComplete from './BodyComplete';
import HeaderComplete from './HeaderComplete';

function Complete(props) {
    return (
       <Base body={<BodyComplete></BodyComplete>} header={<HeaderComplete></HeaderComplete>}>
       </Base>
    );
}

export default Complete;