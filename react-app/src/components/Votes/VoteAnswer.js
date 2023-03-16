import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { downVoteAnswer, upVoteAnswer } from '../../store/votes';

const VoteAnswer = ({ votesNum, answerId }) => {
    const dispatch = useDispatch();

    const upClick = () => {
        const up = {"up": true}
        console.log("in vote component:", up)
        dispatch(upVoteAnswer(answerId, up))

    }

    const downClick = () => {
        const down = true
        dispatch(downVoteAnswer(answerId, down))

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
