import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from "react-router-dom";
import { getAllAnswers } from '../../store/answers';
import questions, { getOneQuestion, removeOneQuestion } from '../../store/questions';
import { getQuestionVotes, upVoteQuestion, downVoteQuestion } from '../../store/votes';
import CreateAnswer from '../Answer/createAnswer';
import AllAnswers from '../Answer/getAnswers';
import QuestionComments from '../Comments/QuestionComments';
import SideBar from '../Navigation/SideBar';

import '../CSS/SingleQuestion.css'

const SingleQuestion = () => {
    const { questionId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const question = useSelector(state => state.questions.singleQuestion)
    const voteQuestionNum = useSelector(state => state.questions.singleQuestion.votesNum)
    const answerNum = useSelector(state => state.questions.singleQuestion.answersNum)
    const answers = useSelector(state => state.answers.answers)

    useEffect(() => {
        dispatch(getOneQuestion(questionId))
        dispatch(getQuestionVotes(questionId))
    }, [dispatch, questionId, answers, voteQuestionNum])

    if (!question) return null;

    const getAnswerNum = (num) => {
        if (num ===1) {
            return num + " Answer"
        } else {
            return num + " Answers"
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
            if (sec === 1) {
                return sec + " sec ago"
            } else {
                return sec + " secs ago"
            }
        } else if ( min < 59) {
            if (min === 1) {
                return min + " min ago"
            } else {
                return min + " mins ago"
            }
        } else if ( hour < 24) {
            if (hour === 1) {
                return hour + " hour ago"
            } else {
                return hour + " hours ago"
            }
        } else {
            if (day === 1) {
                return day + " day ago"
            } else {
                return day + " days ago"
            }
        }


    }

    const handleAskClick = () => {
        return history.push('/new-questions')
    }

    const deleteQuestionClick = async() => {
        if (window.confirm("Are you sure you want to delete this question?")){
            const response = await dispatch(removeOneQuestion(questionId))
            if (response) {
                history.push('/home')
            }
        }
    }

    const upClick = async(e) => {
        if (!sessionUser) {
            alert("You should be logged in first!")
        }
        if (sessionUser && sessionUser.id == question.ownerId) {
            alert("You can not vote for your own question!")
        }
        const up = {"up": true}
        const response = await dispatch(upVoteQuestion(questionId, up))
        if (response) {
            dispatch(getOneQuestion(questionId))
        }
    }

    const downClick = async(e) => {
        if (!sessionUser) {
            alert("You should be logged in first!")
        }
        if (sessionUser && sessionUser.id == question.ownerId) {
            alert("You can not vote for your own question!")
        }
        const down = {"down": true}
        const response = await dispatch(downVoteQuestion(questionId, down))
        if (response) {
            dispatch(getOneQuestion(questionId))
        }
    }


    return (
        <div className='single-question-wrapper'>
            <div className='sidebar-wrapper'>
                <SideBar />
            </div>
            <div className='single-question-container'>
            <div className='single-question-upper'>
                <div>
                    <div>
                        <button class="fa-solid fa-caret-up" onClick={upClick}></button>
                    </div>

                    <div className='signle-question-vote-num'>{voteQuestionNum}</div>

                    <div>
                        <button class="fa-solid fa-caret-down" onClick={downClick}></button>
                    </div>
                </div>

                <div className='single-question-title'>{question.title}</div>
                <div className='single-question-askbutton'>
                    <button type='button' onClick={handleAskClick} className='single-question-askbutton'>Ask Question</button>
                </div>
            </div>
            <div className='single-question-body'>{question.body}</div>
            <div className='single-question-detail'>
                <div className='single-question-modify'>
                    {sessionUser && sessionUser.id == question.ownerId
                    ?
                    <div>
                        <Link to={`/questions/${questionId}/edit`} className="single-question-delete" style={{ textDecoration: 'none'} } >Edit </Link>
                        <button type='button' onClick={deleteQuestionClick} className='single-question-delete'>Delete</button>
                    </div>
                    :
                    null
                    }
                </div>
                <div className='single-question-owner'>
                    <div className='singel-question-time'>asked {getAskedTime(question.createdAt)}</div>
                    <div className='singel-question-profile'>
                        {question.profileImg && <img src={question.profileImg} className="questions-userImg"></img>}
                        {!question.profileImg && question.userName &&
                            <div className="questions-no-userImg">{question.userName[0].toUpperCase()}</div>
                        }
                        <span className='singel-question-username'>{question.userName}</span>
                    </div>
                </div>
            </div>

            <div className='single-question-comment-wrapper'>
                <div className='single-question-comment-container'>
                    <QuestionComments questionId={questionId} user={sessionUser}/>
                </div>
                <div className='single-question-add-comment-container'></div>
            </div>

            <div className='single-question-answer-wrapper'>
                {question.answersNum !== 0 && <div className='single-question-answerNum'>{getAnswerNum(question.answersNum)} </div>}
                <div className='single-question-answer-container'>
                    <AllAnswers questionId={questionId} user={sessionUser} />
                </div>
            </div>

            <div className='single-question-create-answer-wrapper'>
                <div className='single-question-create-answer-container'>
                    {sessionUser
                    ?
                    <CreateAnswer questionId={questionId}/>
                    :
                    null
                    }
                </div>
            </div>


            </div>

        </div>
    )
};

export default SingleQuestion;
