import React from 'react';
import clsx from 'clsx';
import styleBase from './Base.module.scss';

function Overlay({ children, ...props }) {
    return (
        <div className={clsx(styleBase['overlay-main'])}>
            <div className={clsx(styleBase['guide'])}>
                <img className={clsx(styleBase['item-guide'], styleBase['image-guide'])} src="./image/Bot-1 1.png" alt="" />

                <div
                    className={clsx(styleBase['bg-main'], styleBase['item-guide'], styleBase['text-box-guide'])}>
                    <p>
                        Xem hộp thành tựu để biết những điều đã đạt được. Cùng nhau giải đố để đi đến địa điểm tiếp theo. Và scan khi tới nơi.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Overlay;