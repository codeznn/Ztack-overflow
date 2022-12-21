import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory } from "react-router-dom";
import { getAllAnswers } from '../../store/answers';

const AllAnswers = ( { questionId, user, getAskedTime } ) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const answersObj = useSelector(state => state.answers.answers)
    const answersArr = Object.values(answersObj)
    console.log("=====in AllAnswers components:", answersArr)

    useEffect(() => {
        dispatch(getAllAnswers(+questionId))
    }, [dispatch])

    return (
        <>
        <div>
            {answersArr?.map((answer) => (
                <div key={answer.id} className='single-answer'>
                    <div className='single-answer-content'>{answer.content}</div>
                    <div className='single-question-modify'>
                        {user && user.id == answer.ownerId
                        ?
                        <div>
                        <Link to={`/questions/${answer.id}/edit`} style={{ textDecoration: 'none'}} >Edit </Link>
                        <button type='button'>Delete</button>
                        </div>
                        :
                        null
                        }
            </div>
                    <div className='single-answer-user'>
                        {answer.User.profileImage && <img src={answer.User.profileImage} className="questions-userImg"></img>}
                        <span>{answer.User.userName} answered </span>
                        <span>{getAskedTime(answer.createdAt)}</span>
                    </div>
                </div>
            ))
            }
        </div>
        </>
    )
}

export default AllAnswers
