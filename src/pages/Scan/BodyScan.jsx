import clsx from 'clsx';
import React, { useEffect, useMemo } from 'react';
import styleScan from './Scan.module.scss';
import ScanQr from './ScanQr.js';

function BodyScan(props) {


    const scanQr = useMemo(() => {
        // const scanQr = new ScanQr();
        console.log('khoi tao');
        return new ScanQr();
    }, []);

    useEffect(() => {
        scanQr._start();
        return () => scanQr._stopCamera();
    }, []);



    return (
        <div className={clsx(styleScan['camera'])}>
            <div className={clsx('row')}>
                <div className={clsx('col', styleScan['view-camera'])} >
                    <div className={clsx('w-100')} id="reader"></div>
                </div>

            </div>
            <div className={clsx('row', 'flex-grow-1', styleScan['control-camera'])} >
                <div className={clsx('text-center', 'col-6', styleScan['item-control-camera'])} >
                    <i className={clsx('bi', 'bi-brightness-high')} ></i>
                </div>
                <div
                    className={clsx('text-center', 'col-6', styleScan['item-control-camera'], styleScan['switch-camera'])} >
                    <i
                    onClick={() => {
                        scanQr._changeCamera();
                    }}
                        className={clsx('bi', 'bi-camera')}
                    >
                    </i>
                    {/* <i className={clsx('bi', 'bi-camera-fill',)}></i> */}
                </div>

            </div>
        </div>
    );
}

export default BodyScan;