import FetchData from "../../assets/js/fetchData";

async function PreloadImage({ questions, ...props }, callbackDone) {
    // const loadImageMemo = useMemo(loadImage, [arrImage]);
    // const [arrImage, setArrImage] = useState([]);

    const loadImage = ({ url, imageId }) => {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => resolve({ [imageId]: img });
            img.onerror = () => reject(new Error(`load ${url} fail`));
            img.src = url;
        });

    };

    const cacheImage = async () => {
        const arrQXephinh = questions.filter(question => {
            return question.type === 'xep_hinh' && question.image_id
        })

        let promisesUrlImage = [];
        promisesUrlImage = arrQXephinh.map((question) => {
            return new Promise((resolve, reject) => {
                FetchData.urlItem(question.image_id, (url) => {
                    return resolve({ url, imageId: question.image_id });
                })
            })
        })
        console.log(`promisesUrlImage Before`, promisesUrlImage);

        Promise.all(promisesUrlImage)
            .then(arrUrlItem => {
                // console.log(arrUrlItem);

                let promisesCacheImage = [];
                for (const item of arrUrlItem) {
                    promisesCacheImage.push(loadImage({ url: item.url, imageId: item.imageId }));
                }

                Promise.all(promisesCacheImage).then(res => {
                    let objImages = {};
                    for (const item of res) {
                        objImages = { ...objImages, ...item }
                    }
                    callbackDone(objImages);
                })
            })
    }

    cacheImage();

}

export default PreloadImage;