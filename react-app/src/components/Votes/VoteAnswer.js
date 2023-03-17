import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { downVoteAnswer, getAnswerNum, upVoteAnswer } from '../../store/votes';

const VoteAnswer = ({ ownerId, answerId, forVotesNum}) => {
    const dispatch = useDispatch();
    const aftVotesNum = useSelector(state => state.votes.voteAnswerNum.voteNum);
    const currUser = useSelector(state => state.session.user)
    console.log(forVotesNum)
    console.log(aftVotesNum)

    // useEffect(() => {
    //     dispatch(getAnswerNum(answerId))
    // }, [dispatch])

    const upClick = async(e) => {
        if (currUser && currUser.id == ownerId) {
            alert("You can not vote for your own answer!")
        }
        const up = {"up": true}
        console.log("in vote component:", up)
        const response = await dispatch(upVoteAnswer(answerId, up))
        if (response) {
            dispatch(getAnswerNum(answerId))
        }
    }

    const downClick = async(e) => {
        if (currUser && currUser.id == ownerId) {
            alert("You can not vote for your own answer!")
        }
        const down = {"down": true}
        const response = await dispatch(downVoteAnswer(answerId, down))
        if (response) {
            dispatch(getAnswerNum(answerId))
        }
    }


    return (
        <>
        <div>
            <div>
                <button class="fa-solid fa-caret-up" onClick={upClick}></button>
            </div>

            <div className='signle-answer-vote-num'>{!aftVotesNum ? forVotesNum : aftVotesNum}</div>

            <div>
                <button class="fa-solid fa-caret-down" onClick={downClick}></button>
            </div>

        </div>
        </>




    )
}






export default VoteAnswer
