import styleComplete from './Complete.module.scss';
import clsx from 'clsx';

function Background(props) {
    return (
        <div className={clsx(styleComplete['background-main'])}>
            <div className={clsx(styleComplete['background-screen-winner'])}></div>
            <div className={clsx(styleComplete['image-huychuong'])}></div>
        </div>
    );
}

export default Background;