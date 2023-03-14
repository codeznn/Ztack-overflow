import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { downVoteAnswer, upVoteAnswer } from '../../store/votes';

const VoteAnswer = ({ votesNum, answerId }) => {
    const dispatch = useDispatch();

    const upClick = () => {
        const isVote = {"isVote": true}
        console.log("in vote component:", isVote)
        dispatch(upVoteAnswer(answerId, isVote))

    }

    const downClick = () => {
        const isVote = {"isVote": false}
        dispatch(downVoteAnswer(answerId, isVote))

    }


    return (
        <>
        <div>
            <div>
                <button class="fa-solid fa-caret-up" onClick={upClick}></button>
            </div>

            <div className='signle-answer-vote-num'>{votesNum}</div>

            <div>
                <button class="fa-solid fa-caret-down" onClick={downClick}></button>
            </div>

        </div>
        </>




    )
}






export default VoteAnswer
