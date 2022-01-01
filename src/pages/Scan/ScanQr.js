import { Html5Qrcode } from 'html5-qrcode';
import styleScan from './Scan.module.scss';
import FetchData from '../../assets/js/fetchData';

const ScanQr = function() {
    this.arrDeviceCamera = null;
    this.currentCameraId = null;
    this.html5QrCode = null;
    this.callbackCorrect = {};
    // this._start();
    // this._changeCamera();
    // this._displayCamera();
    console.log('khoi tao scan qr code');

}

ScanQr.prototype._start = function(callbackStartDone = {}) {
    Html5Qrcode.getCameras().then(devices => {
        console.log(devices);
        if (devices && devices.length) {
            this.arrDeviceCamera = devices;
            // console.log(this.arrDeviceCamera);
            // this._displayCamera(this.arrDeviceCamera[0].id);
            // this._checkIn(this.arrDeviceCamera[0].id);
            console.log('ok camera');
            callbackStartDone();
        }
    }).catch(err => {
        alert('Người dùng không cấp quyền truy cập');
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
    var tempTextRes = '';

    html5QrCode.start(
            cameraId, {
                fps: 10, // Optional, frame per seconds for qr code scanning
                qrbox: 250
            },
            (decodedText, decodedResult) => {
                // do something when code is read
                // console.log(`decodedText`, decodedText);
                // console.log(`decodedResult`, decodedResult);

                this.callbackCorrect({ decodedText, tempTextRes });
                tempTextRes = decodedText;



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


ScanQr.prototype._checkIn = function(callBack = {}) {
    console.log('check in');

    this._start(() => {
        this.callbackCorrect = function(resQr) {

            console.log('getDataMuseum');
            if (resQr.tempTextRes != resQr.decodedText) {
                console.log('ok');
                FetchData.dataMuseum(resQr.decodedText, (data) => {
                    console.log(data);
                    callBack(data)
                });
            }
        }
        if (this.arrDeviceCamera) {
            this._displayCamera(this.arrDeviceCamera[0].id);
        }

    })
}
ScanQr.prototype.question = function(answer, { cbCorrect = {}, cbWrong = {} }) {
    console.log('scan dap an queston');
    let tempDate = new Date().getTime();
    this._start(() => {
        this.callbackCorrect = function(resQr) {
            if (resQr.tempTextRes != resQr.decodedText && answer === resQr.decodedText) {
                // console.log('ok');
                console.log('dap an chinh xac');
                cbCorrect('right');
            } else if (answer !== resQr.decodedText) {
                const timeWaiting = new Date().getTime() - tempDate;

                if (timeWaiting > 5 * 1000) {
                    cbWrong();
                    console.log(tempDate);
                    tempDate = new Date().getTime();
                }
            }
        }


        if (this.arrDeviceCamera) {
            this._displayCamera(this.arrDeviceCamera[0].id);
        }
    })
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