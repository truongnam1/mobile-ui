import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { Base } from '../../pages/Base';
import BodyLoading from './BodyLoading';



function Loading(props) {
    const elLoading = useRef();

    useEffect(() => {
        elLoading.current.classList.add("animate__fadeIn");

        return () => {
            elLoading.current?.classList.remove("animate__fadeIn");
            elLoading.current?.classList.add("animate__fadeOut");

        }
    },[])


    return (
        <div ref={elLoading}>

            <Base
                headerBody={<BodyLoading></BodyLoading>}
            ></Base>
        </div>
    );
}

export default Loading;