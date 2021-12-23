import { Base } from '../Base';
import BodyStart from './BodyStart';

function Start(props) {
    return (
        <>
            <Base body={<BodyStart></BodyStart>}>
            </Base>
        </>
    );
}

export default Start;