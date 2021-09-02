import React from 'react';
// import classes from './Answer.module.css';
import Spinner from '../UI/Spinner.components.jsx';


const Answer = (props) => {
    const AnswerOrSpinnerOrNull = (props) => {
        if (props.loading === "spinner") {
            return (<Spinner />);
        }
        if (props.loading === "answer") {
            return (
                <div>
                    <p>Flagged user details: {props.answer}</p>
                </div>
            );
        }
        return null;
    }
    return (
            <>
            {AnswerOrSpinnerOrNull(props)}
            </>
    );
}

export default Answer;
