import {Base} from "./Base";
import Complete from "./Complete/Complete";
import { Question } from "./Question";
import { Start } from "./Start";

export default [
    {
        path : '/',
        element : <Base/>,
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
    }
]