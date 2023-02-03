import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory } from "react-router-dom";
import { getAllAnswers, removeOneAnswer, resetAnswers } from '../../store/answers';
import DeleteAnswer from './deleteAnswer';

const AllAnswers = ( { questionId, user } ) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const answersObj = useSelector(state => state.answers.answers)
    const answersArr = Object.values(answersObj)
    //console.log("=====in AllAnswers components:", answersArr)

    useEffect(() => {
        dispatch(getAllAnswers(+questionId))
    }, [dispatch])

    const getAnsweredTime = (time) => {
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



    return (
        <>
        <div >
            {answersArr?.map((answer, i) => (
                <div key={i} className='single-answer'>
                    <div className='signle-answer-vote-container'>
                        <i class="fa-solid fa-caret-up"></i>
                        <div className='signle-answer-vote-num'>{answer.votesNum}</div>
                        <i class="fa-solid fa-caret-down"></i>
                    </div>
                    <div className='single-answer-content'>{answer.content}</div>
                    <div className='single-answer-detail'>
                        <div className='single-answer-modify'>
                            {user && user.id == answer.ownerId
                            ?
                            <div>
                            <Link to={`/answers/${answer.id}/edit`} className="single-question-delete" style={{ textDecoration: 'none'}} >Edit </Link>
                            <DeleteAnswer answerId={answer.id} questionId={questionId}/>
                            </div>
                            :
                            null
                            }
                        </div>
                        <div className='single-answer-user'>
                            <div className='singel-question-time'>answered  {getAnsweredTime(answer.createdAt)}</div>
                            <div className='singel-question-profile'>
                                {answer.User.profileImage && <img src={answer.User.profileImage} className="questions-userImg"></img>}
                                {!answer.User.profileImage && <div className="questions-no-userImg">{answer.User.userName[0].toUpperCase()}</div>}
                                <span className='singel-question-username'>{answer.User.userName}  </span>
                            </div>
                        </div>
                    </div>
                </div>

            ))
            }
        </div>
        </>
    )
}

export default AllAnswers
