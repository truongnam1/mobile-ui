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
}


export default FetchData;