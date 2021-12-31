import clsx from 'clsx';
import styleLoading from './loading.module.scss';

function BodyLoading(props) {
    const faceCube = (
        <>
            <div className={clsx(styleLoading.face, styleLoading.top)}></div>
            <div className={clsx(styleLoading.face, styleLoading.left)}></div>
            <div className={clsx(styleLoading.face, styleLoading.right)}></div>
        </>)


    const textLoading =
        <>
            <div className={clsx(styleLoading.textLoading, styleLoading.loadingText05)}>
                <span className={styleLoading.crtLoading}>L</span>
                <span className={styleLoading.crtLoading}>O</span>
                <span className={styleLoading.crtLoading}>A</span>
                <span className={styleLoading.crtLoading}>D</span>
                <span className={styleLoading.crtLoading}>I</span>
                <span className={styleLoading.crtLoading}>N</span>
                <span className={styleLoading.crtLoading}>G</span>
            </div>

        </>


    return (
        <>
            <div className={clsx(styleLoading.loading)}>
                <div className={clsx(styleLoading.background)}></div>
                <div className={clsx(styleLoading.container)} >
                    <div className={clsx(styleLoading.h1Container)}>

                        <div className={clsx(styleLoading.cube, styleLoading.h1, styleLoading.w1, styleLoading.l1, styleLoading.cube, styleLoading.h1, styleLoading.w1, styleLoading.l1)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h1, styleLoading.w1, styleLoading.l2)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h1, styleLoading.w1, styleLoading.l3)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h1, styleLoading.w2, styleLoading.l1)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h1, styleLoading.w2, styleLoading.l2)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h1, styleLoading.w2, styleLoading.l3)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h1, styleLoading.w3, styleLoading.l1)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h1, styleLoading.w3, styleLoading.l2)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h1, styleLoading.w3, styleLoading.l3)} >
                            {faceCube}
                        </div>
                    </div>

                    <div className={clsx(styleLoading.h2Container)}>

                        <div className={clsx(styleLoading.cube, styleLoading.h2, styleLoading.w1, styleLoading.l1)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h2, styleLoading.w1, styleLoading.l2)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h2, styleLoading.w1, styleLoading.l3)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h2, styleLoading.w2, styleLoading.l1)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h2, styleLoading.w2, styleLoading.l2)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h2, styleLoading.w2, styleLoading.l3)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h2, styleLoading.w3, styleLoading.l1)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h2, styleLoading.w3, styleLoading.l2)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.cube, styleLoading.h2, styleLoading.w3, styleLoading.l3)} >
                            {faceCube}
                        </div>
                    </div>

                    <div className={clsx(styleLoading.h3Container)}>

                        <div className={clsx(styleLoading.cube, styleLoading.h3, styleLoading.w1, styleLoading.l1)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h3, styleLoading.w1, styleLoading.l2)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h3, styleLoading.w1, styleLoading.l3)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h3, styleLoading.w2, styleLoading.l1)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h3, styleLoading.w2, styleLoading.l2)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h3, styleLoading.w2, styleLoading.l3)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h3, styleLoading.w3, styleLoading.l1)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h3, styleLoading.w3, styleLoading.l2)} >
                            {faceCube}
                        </div>

                        <div className={clsx(styleLoading.cube, styleLoading.h3, styleLoading.w3, styleLoading.l3)} >
                            {faceCube}
                        </div>
                    </div>

                </div>
                {textLoading}
            </div>
        </>
    );
}

export default BodyLoading;