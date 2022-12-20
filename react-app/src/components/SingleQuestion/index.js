import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from "react-router-dom";
import questions, { getOneQuestion } from '../../store/questions';

import './SingleQuestion.css'

const SingleQuestion = () => {
    const { questionId } = useParams();
    //console.log("======in singleQuestion components-questionId:", questionId)
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const question = useSelector(state => state.questions.singleQuestion)
    //console.log("======in singleQuestion components-question:", question)

    useEffect(() => {
        dispatch(getOneQuestion(questionId))
    }, [dispatch, questionId])

    if (!question) return null;

    const getAnswerNum = (num) => {
        if (num ===1) {
            return num + " answer"
        } else {
            return num + " answers"
        }
    }

    const getAskedTime = (time) => {
        let beginDate = new Date(time);
        let endDate = new Date()

        let day = parseInt((endDate - beginDate) / (1000 * 60 * 60 * 24))
        let hour = parseInt((endDate - beginDate) / (1000 * 60 * 60))
        let min = parseInt((endDate - beginDate) / (1000 * 60 ))
        let sec = parseInt((endDate - beginDate) / 1000)

        if (sec < 60) {
            return sec + " sec ago"
        } else if ( min < 59) {
            return min + " min ago"
        } else if ( hour < 24) {
            return hour + " hour ago"
        } else {
            return day + " day ago"
        }

    }

    return (
        <div className='single-question-wrapper'>
            <div className='single-question-upper'>
                <div className='single-question-title'>{question.title}</div>
                <div className='single-question-askbutton'>
                    <button>Ask Question</button>
                </div>
            </div>
            <div className='single-question-body'>{question.body}</div>
            <div className='single-question-owner'>
                <div className='singel-question-time'>asked {getAskedTime(question.createdAt)}</div>
                <div className='singel-question-profile'>
                    {question.profileImg && <img src={question.profileImg} className="questions-userImg"></img>}
                </div>
                <div className='singel-question-username'>{question.userName}</div>
            </div>
            <div className='single-question-modify'>
                {sessionUser && sessionUser.id == question.ownerId
                ?
                <div>
                    <Link to={`/questions/new-question`} style={{ textDecoration: 'none'}}>Edit </Link>
                    <Link to={`/questions/delete`} style={{ textDecoration: 'none'}}>Delete</Link>
                </div>
                :
                null
                }
            </div>

            <div className='single-question-answer'>
                <div className='single-question-answerNum'>{getAnswerNum(question.answersNum)} </div>
            </div>

        </div>
    )
};

export default SingleQuestion;
