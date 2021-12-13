import React from 'react';
import { Base } from '../Base';
import BodyScan from './BodyScan';

function Scan(props) {

    const config = {
        propsHeader: { RemoveHQ: true },
        body: <BodyScan></BodyScan>
    }

    return (
        <Base {...config} >
        </Base>
    );
}

export default Scan;