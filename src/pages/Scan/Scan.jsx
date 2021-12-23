import React from 'react';
import CountTime from '../../components/CountTime';
import { Base } from '../Base';
import BodyScan from './BodyScan';

function Scan({onCloseModal,questions, onBackToPrev,...props}) {

    const config = {
        propsHeader: { RemoveHQ: true },
        body: <BodyScan></BodyScan>
    }

    return (
        <>
         <CountTime firstValue={15} onClearTime={onCloseModal} onBackToPrev={onBackToPrev}/>
        <BodyScan></BodyScan>
        </>
        // <Base {...config} >
        // </Base>
    );
}

export default Scan;