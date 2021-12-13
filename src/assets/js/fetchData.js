function FetchData(params) {
    console.log('fetch data');
    this.question = function(getData) {
        fetch('https://api.npoint.io/658232b33eb69c8bddc7')
            .then(response => response.json())
            .then(data => {

                console.log(data);
                getData(data);
            });
    }
}


export default FetchData;