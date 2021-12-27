import _ from 'lodash';

function findRoad(arr, heightMap) {
    const findFirtPoint = (arr) => {
        const arrPoint = arr.filter(item => item.split('-')[1] == (heightMap - 1));
        if (arr.includes((arrPoint[0].split('-')[0] + '-' + (arrPoint[0].split('-')[1] - 1)))) return arrPoint[_.size(arrPoint) - 1];
        else return arrPoint[0];
    }
    const caculatorDistance = (x, y, x1, y1) => {
        return (Math.pow((x - x1), 2) + Math.pow((y - y1), 2)) == 1 ? true : false;
    }

    const sort = (arr) => {
        if (!_.isEmpty(arr)) {
            const firstPoint = findFirtPoint(arr);
            let newArr = [firstPoint];
            _.remove(arr, function (item) {
                return item == newArr[0];
            })
            while (_.size(arr) != 0) {
                for (let i = 0; i < _.size(arr); ++i) {
                    if (newArr[_.size(newArr) - 1] != arr[i]) {
                        if (caculatorDistance(newArr[_.size(newArr) - 1].split('-')[0]
                            , newArr[_.size(newArr) - 1].split('-')[1], arr[i].split('-')[0], arr[i].split('-')[1])) {
                            newArr = [...newArr, arr[i]];
                            _.remove(arr, function (item) {
                                return item == arr[i];
                            })
                        }
                    }
                }
            }
            return newArr;
        } else return [];

    }

    return sort(arr);
}

export default findRoad;