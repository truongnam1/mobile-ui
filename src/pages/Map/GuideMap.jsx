import Canvas from "../../components/Canvas";
import './Map.scss'

function GuideMap({ itemModal, srcImage, setTypeModal, ...props }) {
    console.log(itemModal);
    return (
        <div className='modal_map_intro container-sm border'>
            <div className="row">

                <div className="col-sm-12">
                    <i className="bi bi-x-circle" style={{ float: 'right' }} onClick={() => {
                        setTypeModal(false);
                    }}></i>
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-3" style={{ margin: 'auto', fontSize: '18px !important', color: '#c66666' }}>
                            <span className='text_modal_map' style={{  fontSize: '20px'}}>
                                Mô tả
                            </span>
                        </div>

                        <div className="col-sm-11" style={{ margin: 'auto' }}>
                            <span className='text_modal_map'>
                                Đây là bản đồ dẫn tới kho báu Rồng. Có rất nhiều chướng ngại vật, thử thách khó khăn trên đường đi tìm kho báu. Một số chướng ngại vật có thể cản trở bạn hoặc có thể giúp bạn đến kho báu nhanh hơn. Dưới đây là một vài chú thích:
                            </span>
                        </div>

                    </div>
                </div>

                <div className="col-sm-12 border_map_modal animate__zoomInDown animate__animated" style={{marginTop: '20px'}}>
                    <div className="row" style={{ alignItems: 'center' }}>
                        <div className="col-sm-1">
                            <img
                                src={process.env.PUBLIC_URL + '/assets/images/khobau.png'}
                                style={{ width: '32px', height: '32px' }}
                            />
                        </div>
                        <div className="col-sm-11">
                            <span className='text_modal_map'>Đây chính là kho báu Rồng. Nếu lấy được nó bạn sẽ được ban thưởng một phần thưởng</span>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 border_map_modal animate__zoomInDown animate__animated">
                    <div className="row" style={{ alignItems: 'center' }}>
                        <div className="col-sm-1">
                            <img
                                src={process.env.PUBLIC_URL + '/assets/images/dice.png'}
                                style={{ width: '32px', height: '32px' }}
                            />
                        </div>
                        <div className="col-sm-11">
                            <span className='text_modal_map'>Ấn vào đây để có thể di chuyển </span>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 border_map_modal animate__zoomInDown animate__animated">
                    <div className="row" style={{ alignItems: 'center' }}>
                        <div className="col-sm-1">
                            <img
                                src={process.env.PUBLIC_URL + '/assets/images/heart.png'}
                                style={{ width: '32px', height: '32px' }}
                            />
                        </div>
                        <div className="col-sm-11">
                            <span className='text_modal_map'>Số lượt chơi của bạn là giới hạn nên hãy thận trọng với những câu hỏi. Nó sẽ được hiển thị tại góc trên cùng bên phải của màn hình</span>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 border_map_modal animate__zoomInDown animate__animated">
                    <div className="row" style={{ alignItems: 'center' }}>
                        <div className="col-sm-1">
                            <img
                                src={process.env.PUBLIC_URL + '/assets/images/time.png'}
                                style={{ width: '32px', height: '32px' }}
                            />
                        </div>
                        <div className="col-sm-11">
                            <span className='text_modal_map'>Tại góc trên cùng bên trái màn hình. Đây là nơi hiển thị tổng thời gian từ ban đầu cho tới khi bạn tìm được kho báu.</span>
                        </div>
                    </div>
                </div>

                {itemModal.map(item => {
                    if (item?.effect.includes("back_forward")) {
                        item.des = "Đây là .....Khi bước vào đây bạn sẽ được tiến thêm một số ô nhất định"
                    } else if (item?.effect.includes("forward")) {
                        item.des = "Khi bước vào đây bạn sẽ phải lùi về sau"
                    } else if (item?.effect.includes("tele")) {
                        item.des = "Cổng không gian, bạn sẽ bị dịch chuyển tới một nơi bất kì nào đó trong bản đồ khi bước vào nó."
                    }

                    return (
                        <div className="col-sm-12 border_map_modal animate__zoomInDown animate__animated">
                            <div className="row" style={{ alignItems: 'center' }}>
                                <div className="col-sm-1">
                                    <Canvas keys={item?.td} img={srcImage[item?.tilesetIdx || 0]} />
                                </div>
                                <div className="col-sm-11">
                                    <span className='text_modal_map'>{item?.des}</span>
                                </div>
                            </div>

                        </div>
                    )
                })}

            </div>
        </div>
    );
}

export default GuideMap;