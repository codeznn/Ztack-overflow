import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { getAllQuestions, getTopQuestions } from '../../store/questions';

// import "./questions.css";

const TopQuestions = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const questionObj = useSelector(state => state.questions.topQuestions)
    const questionArr = Object.values(questionObj).reverse()
    const totalNum = questionArr.length
    //console.log("=====in TopQuestions components:", questionArr)

    useEffect(() => {
        dispatch(getTopQuestions())
    }, [dispatch])

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


    const handleAskClick = () => {
        return history.push('/new-questions')
    }

    if (!questionObj) return null;

    return (
        <div className='questions-container'>
            <div className='questions-top'>
                <h1>Top Questions</h1>
                <button type='button' onClick={handleAskClick}>Ask Question</button>
            </div>
            <div className='questions-total-num'>{totalNum} questions</div>
            <div className='questions-single-container'>
                {questionArr.map((question) => (
                    <div key={question.id} className="questions-single-question" style={{ textDecoration: 'none'}}>
                        <div className='questions-single-question-left'>
                            <div>{question.votesNum} votes</div>
                            <div>{getAnswerNum(question.answersNum)} </div>
                        </div>
                        <div className='questions-single-question-right'>
                            <div className='questions-single-question-title'>
                                <NavLink to={`/questions/${question.id}`} style={{ textDecoration: 'none'}}>{question.title}</NavLink>
                            </div>
                            <div className='questions-single-question-body'>{question.body}</div>
                            {/* <div className='questions-single-question-tag'>{question.category}</div> */}
                        </div>
                        <div className='questions-single-question-user'>
                            {question.profileImg ?
                                <div>
                                    <img src={question.profileImg} className="questions-userImg"></img>
                                </div>
                                :
                                <div className="questions-no-userImg">{question.userName[0].toUpperCase()}</div>

                            }
                            <span>{question.userName} asked </span>
                            <span>{getAskedTime(question.createdAt)}</span>
                        </div>
                    </div>
                ))

                }
            </div>
        </div>
    )
}

export default TopQuestions;
