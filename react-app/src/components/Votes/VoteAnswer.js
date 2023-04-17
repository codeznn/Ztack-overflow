import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAnswers } from '../../store/answers';
import { downVoteAnswer, getAnswerVotes, upVoteAnswer } from '../../store/votes';

const VoteAnswer = ({ ownerId, answerId, forVotesNum, questionId}) => {
    const dispatch = useDispatch();
    const currUser = useSelector(state => state.session.user)


    const upClick = async(e) => {
        if (!currUser) {
            alert("You should be logged in first!")
        }
        if (currUser && currUser.id == ownerId) {
            alert("You can not vote for your own answer!")
        }
        const up = {"up": true}
        const response = await dispatch(upVoteAnswer(answerId, up))
        if (response) {
            dispatch(getAllAnswers(questionId))
        }
    }

    const downClick = async(e) => {
        if (!currUser) {
            alert("You should be logged in first!")
        }
        if (currUser && currUser.id == ownerId) {
            alert("You can not vote for your own answer!")
        }
        const down = {"down": true}
        const response = await dispatch(downVoteAnswer(answerId, down))
        if (response) {
            dispatch(getAllAnswers(questionId))
        }
    }


    return (
        <>
        <div>
            <div>
                <button class="fa-solid fa-caret-up" onClick={upClick}></button>
            </div>

            <div className='signle-answer-vote-num'>{forVotesNum}</div>

            <div>
                <button class="fa-solid fa-caret-down" onClick={downClick}></button>
            </div>

        </div>
        </>




    )
}






export default VoteAnswer
