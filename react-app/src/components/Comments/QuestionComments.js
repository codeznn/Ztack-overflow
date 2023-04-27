import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from "react-router-dom";

const QuestionComments = ({questionId, user}) => {

    const addComment = () => {
        if (!user) {
            alert("You should be logged in first!")
        }

    }
    return (
        <>
        <div className='question-comment-container'>
            <button className='question-comment-add' onClick={addComment}>Add a comment</button>
        </div>
        </>
    )
};



export default QuestionComments
