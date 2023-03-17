import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useHistory } from "react-router-dom";
import { getAllAnswers, removeOneAnswer, resetAnswers } from '../../store/answers';
import VoteAnswer from '../Votes/VoteAnswer';
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
        const beginDate = new Date(time);
        const endDate = new Date();

        const diffTime = (endDate - beginDate) / 1000;

        return diffTime < 60
          ? `${Math.floor(diffTime)} sec${diffTime === 1 ? "" : "s"} ago`
          : diffTime < 60 * 60
          ? `${Math.floor(diffTime / 60)} min${Math.floor(
              diffTime / 60
            ) === 1 ? "" : "s"} ago`
          : diffTime < 60 * 60 * 24
          ? `${Math.floor(diffTime / 60 / 60)} hour${Math.floor(
              diffTime / 60 / 60
            ) === 1 ? "" : "s"} ago`
          : `${Math.floor(diffTime / 60 / 60 / 24)} day${Math.floor(
              diffTime / 60 / 60 / 24
            ) === 1 ? "" : "s"} ago`;
      };




    return (
        <>
        <div >
            {answersArr?.map((answer, i) => (
                <div key={i} className='single-answer'>
                    <div className='signle-answer-vote-container'>
                        <VoteAnswer ownerId={answer.ownerId} answerId={answer.id} forVotesNum={answer.votesNum}/>
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
