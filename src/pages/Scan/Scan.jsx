import React from 'react';
import CountTime from '../../components/CountTime';
import { Base } from '../Base';
import BodyScan from './BodyScan';

function Scan({onCloseModal,questions, onBackToPrev,...props}) {

    const config = {
        propsHeader: { RemoveHQ: true },
        body: <BodyScan questions={questions}></BodyScan>
    }


    return (
        <>
        <BodyScan questions={questions} onClearTime={onCloseModal} onBackToPrev={onBackToPrev}>

        </BodyScan>
        <div style={{position: 'absolute', top: 0, right: 0, color: 'white'}}>
            <CountTime firstValue={60} onClearTime={onCloseModal} onBackToPrev={onBackToPrev}/>
        </div>
         
        </>
        // <Base {...config} >
        //     <CountTime firstValue={600} onClearTime={onCloseModal} onBackToPrev={onBackToPrev}/>
        // </Base>


    );
}

export default Scan;