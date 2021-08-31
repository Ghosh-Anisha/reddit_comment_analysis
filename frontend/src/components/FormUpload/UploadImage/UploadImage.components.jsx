import React, {useState} from 'react';
import classes from './Uploadimage.module.css';

import {uploadImage} from '../../../helpers/image.js';
import Answer from '../../Answer/Answer.components.jsx';


const UploadImage = () => {
    const [subReddit, setSubReddit] = useState();
    const [answer, setAnswer] = useState();

    const send = async () => {
        const response = await uploadImage(subReddit);
        setAnswer(response["pythonFileResponse"]);
        
    };

    return (
            <>
            <div className = "UploadForm">
                <form action = "#">
                    <div className = {classes.flex}>
                        <label htmlFor="name">SubReddit</label>
                        <input
                            type = "text"
                            id = "name"
                            onChange = {(event) => setSubReddit(event.target.value)}
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
