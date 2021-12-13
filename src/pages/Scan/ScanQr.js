import React, { useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import styleScan from './Scan.module.scss';


const ScanQr = function() {
    this.arrDeviceCamera = null;
    this.currentCameraId = null;
    this.html5QrCode = null;
    // this._start();
    // this._changeCamera();
    // this._displayCamera();
    console.log('khoi tao scan qr code');

}

ScanQr.prototype._start = function() {
    Html5Qrcode.getCameras().then(devices => {
        console.log(devices);
        if (devices && devices.length) {
            this.arrDeviceCamera = devices;
            // console.log(this.arrDeviceCamera);
            this._displayCamera(this.arrDeviceCamera[1].id);
            console.log('ok camera');
        }
    }).catch(err => {
        // handle err
    });
}


ScanQr.prototype._changeCamera = function() {
    console.log('change');
    if (this.arrDeviceCamera && this.arrDeviceCamera.length >= 2) {
        var indexCam = this.arrDeviceCamera.findIndex(item => item.id == this.currentCameraId);
        console.log(indexCam);
        var cameraIdNew = this.arrDeviceCamera[(indexCam + 1) % this.arrDeviceCamera.length].id;
        this.html5QrCode.stop().then((ignore) => {
            this._displayCamera(cameraIdNew);
            // QR Code scanning is stopped.
        }).catch((err) => {
            // Stop failed, handle it.
        });

    }

}

ScanQr.prototype._displayCamera = function(cameraId) {
    const html5QrCode = new Html5Qrcode( /* element id */ "reader");
    this.html5QrCode = html5QrCode;
    this.currentCameraId = cameraId;

    html5QrCode.start(
            cameraId, {
                fps: 10, // Optional, frame per seconds for qr code scanning
                qrbox: 250
            },
            (decodedText, decodedResult) => {
                // do something when code is read
                console.log(`decodedText`, decodedText);
                console.log(`decodedResult`, decodedResult);
                if (decodedText === '123456') {
                    // toastr.success('Đáp án chính xác');
                    setTimeout(function() {
                        // window.location.href = './done.html'     
                    }, 2000);
                }

            },
            (errorMessage) => {
                // parse error, ignore it.
            }).then(function(r) {
            console.log('sau khoi tao camera');
            document.querySelector(`.${styleScan['control-camera']}`).style.display = "flex";
        })
        .catch((err) => {
            // Start failed, handle it.
            console.log('loi khoi tao camera');
        });
}
ScanQr.prototype._stopCamera = function() {
    this.html5QrCode.stop().then((ignore) => {
        console.log('stop camera');
        // QR Code scanning is stopped.
    }).catch((err) => {
        // Stop failed, handle it.
    });
}


export default ScanQr;