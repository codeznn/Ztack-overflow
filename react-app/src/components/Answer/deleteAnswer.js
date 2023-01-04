import { getAllAnswers, removeOneAnswer } from "../../store/answers"
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const DeleteAnswer = ({ answerId, questionId }) => {
    const dispatch = useDispatch();

    const deleteAnswerClick = async() => {
        if (window.confirm("Are you sure you want to delete this answer?")){
            const response = await dispatch(removeOneAnswer(answerId))
            if (response) {
                dispatch(getAllAnswers(questionId))
            }
        }

    }

    return (
        <button type="button" onClick={deleteAnswerClick} className="single-question-delete">Delete</button>
    )
}

export default DeleteAnswer;
