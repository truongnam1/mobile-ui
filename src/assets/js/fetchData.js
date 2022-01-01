import { isNumber } from "lodash";

class FetchData {
    question(getData) {
        fetch('https://api.npoint.io/658232b33eb69c8bddc7')
            .then(response => response.json())
            .then(data => {

                console.log(data);
                getData(data);
            });
    }
    static dataMuseum(id, callbackDone) {
        console.log('fect data museum');


        fetch(`https://hcloud.trealet.com/apps_dev/btl/nhom08/lib/api/api.php?id=${id}&file`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data) {
                    callbackDone(data);
                    return true;
                } else {
                    callbackDone(false);
                    return false;
                }
            });
    }
    static urlItem(id, callbackDone) {
        console.log('fect url item');

        fetch(`https://hcloud.trealet.com/apps_dev/btl/nhom08/lib/api/api.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                if (data) {
                    const urlItem = 'https://hcloud.trealet.com' + data.url_full || 'https://hcloud.trealet.com/albums/Nhom00/Data/nhom8/pexels-photo-326055.jpeg';
                    callbackDone(urlItem);
                    return true;
                } else {
                    callbackDone(false);
                    return false;
                }
            });
    }
}


export default FetchData;