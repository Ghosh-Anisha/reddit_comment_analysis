import React, {useState} from 'react';
import classes from './Uploadimage.module.css';

import {getSubReddit} from '../../../helpers/subreddit.js';
import Answer from '../../Answer/Answer.components.jsx';


const UploadImage = () => {
    const [subReddit, setsubReddit] = useState();
    const [answer, setAnswer] = useState();
    const [loading, setLoading] = useState("null");

    const send = async () => {
        setLoading("spinner");
        const response = await getSubReddit(subReddit);
        setAnswer(response["pythonFileResponse"]);
        setLoading("answer");
    };

    return (
            <>
            <div className = "UploadForm">
                <form action = "#">
                    <div className = {classes.flex}>
                        <label htmlFor="name">subReddit</label>
                        <input
                            type = "text"
                            id = "name"
                            onChange = {(event) => setsubReddit(event.target.value)}
                        />
                    </div>
                </form>
                <button onClick={() => send()}>Submit</button>
            </div>
            <Answer
                loading = {loading}
                answer = {answer}
            />
            </>
    )
}

export default UploadImage;
