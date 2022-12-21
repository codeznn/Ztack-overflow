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
        <>
        <div>
            {answersArr?.map((answer, i) => (
                <div key={i} className='single-answer'>
                    <div className='single-answer-content'>{answer.content}</div>
                    <div className='single-question-modify'>
                        {user && user.id == answer.ownerId
                        ?
                        <div>
                        <Link to={`/answers/${answer.id}/edit`} style={{ textDecoration: 'none'}} >Edit </Link>
                        <DeleteAnswer answerId={answer.id} questionId={questionId}/>
                        </div>
                        :
                        null
                        }
                    </div>
            <div className='single-answer-user'>
                {answer.User.profileImage && <img src={answer.User.profileImage} className="questions-userImg"></img>}
                <span>{answer.User.userName} answered </span>
                <span>{getAnsweredTime(answer.createdAt)}</span>
                </div>
            </div>


            ))
            }
        </div>
        </>
    )
}

export default AllAnswers
