import React, {useState} from 'react';
import classes from './Uploadimage.module.css';

import {getSubReddit} from '../../../helpers/subreddit.js';
import Answer from '../../Answer/Answer.components.jsx';

// class RegExp1 extends RegExp {
//     [Symbol.split](str, limit) {
//       const result = RegExp.prototype[Symbol.split].call(this, str, limit);
//       return result.map(x => `(${x})`);
//     }
//   }

// const strip_answer = (s) => {
//     s = s.split("[")[1]
//     s = s.split("]")[0]
//     return s;
// }


const UploadImage = () => {
    const [subReddit, setsubReddit] = useState();
    const [answer, setAnswer] = useState();
    const [loading, setLoading] = useState("null");

    const send = async () => {
        setLoading("spinner");
        const response = await getSubReddit(subReddit);
        // const answer1 = strip_answer(response["pythonFileResponse"])
        setAnswer(response["pythonFileResponse"]);
        setLoading("answer");
    };

    return (
            <>
            <div>
                <form action = "#" className = {classes.form} >
                    <div className = {classes.flex} > 
                        <label htmlFor="name" className = {classes.title} >Enter SubReddit</label>
                        <input 
                            className = {classes.name} 
                            type = "text"
                            id = "name"
                            placeholder="/r/"
                            onChange = {(event) => setsubReddit(event.target.value)}
                        />
                    </div>
                </form>
                <button onClick={() => send()} className = {classes.submit} >Submit</button>
            </div>
            <div className = {classes.ans}>
                <Answer
                    loading = {loading}
                    answer = {answer}
                />
            </div>
            </>
    )
}

export default UploadImage;
