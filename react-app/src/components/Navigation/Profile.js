import React from "react";
import { NavLink, Link, useHistory, Redirect} from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyQuestions } from "../../store/questions";
import DeleteAnswer from "../Answer/deleteAnswer";
import { getMyAnswers } from "../../store/answers";

import '../CSS/Profile.css'

const Profile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const questionObj = useSelector(state => state.questions.myQuestions)
    const questionArr = Object.values(questionObj)
    const totalQuestionsNum = questionArr.length
    const answersObj = useSelector(state => state.answers.myAnswers)
    const answersArr = Object.values(answersObj)
    const totalAnswersNum = answersArr.length

    useEffect(() => {
        dispatch(getMyQuestions())
        dispatch(getMyAnswers())
    }, [dispatch])

    if (!sessionUser) {
        return <Redirect to='/' />;
      }

    return (
        <div className="profile-container">
            <div className="profile-user">
                <div className="profile-pic">
                    {sessionUser.profileImage && <img src={sessionUser.profileImage} className="profile-userImg"></img>}
                    {!sessionUser.profileImage && sessionUser.username &&
                        <div className="profile-no-userImg">{sessionUser.username[0].toUpperCase()}</div>
                    }
                </div>
                <div className="profile-username">{sessionUser.username}</div>
            </div>

            <div className="profile-questions-container">
                <div className="profile-questions-title">My Questions</div>
                <div className='profile-questions-single-container'>
                    {questionArr.map((question) => (
                        <div key={question.id} className="profile-questions-single-question" style={{ textDecoration: 'none'}}>
                            <div className='profile-questions-single-question-title'>
                                <NavLink to={`/questions/${question.id}`} style={{ textDecoration: 'none'}} className='profile-single-question-title'>{question.title}</NavLink>
                            </div>
                        </div>
                    ))
                    }
                </div>


            </div>

            <div className="profile-questions-container">
                <div className="profile-questions-title">My Answers</div>
                <div className='profile-questions-single-container'>
                {answersArr?.map((answer, i) => (
                <div key={i} className='profile-questions-single-question'>
                    <div className='profile-questions-single-question-title'>
                        <NavLink to={`/questions/${answer.Question.id}`} style={{ textDecoration: 'none'}} className='profile-single-question-title'>{answer.Question.title}</NavLink>
                        <div className='profile-single-answer-content'>{answer.content}</div>
                    </div>
                </div>

               ))
               }
               </div>

            </div>


        </div>
    )
}

export default Profile;
