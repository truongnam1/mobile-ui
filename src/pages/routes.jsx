// import {Base} from "./Base";
import Complete from "./Complete/Complete";
import { Question } from "./Question";
import Scan from "./Scan/Scan";
import MapComponent from './Map/index'
import { Start } from "./Start";
import Lose from "./lose";

export default [
    {
        path : '/',
        element : <Start/>,
        name : 'Home'
    }, {
        path : '/start',
        element : <Start/>,
        name : 'start'
    }, {
        path : '/question',
        element : <Question/>,
        name : 'question'
    },
    {
        path : '/complete',
        element : <Complete/>,
        name : 'Complete'
    },
    {
        path : '/scan',
        element : <Scan/>,
        name : 'scan'
    },
    {
        path : '/map',
        element : <MapComponent/>,
        name : 'map'
    },
    {
        path : '/lose',
        element : <Lose/>,
        name : 'lose'
    },
]