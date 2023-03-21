import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { downVoteAnswer, getAnswerVotes, upVoteAnswer } from '../../store/votes';

const VoteAnswer = ({ ownerId, answerId, forVotesNum}) => {
    const dispatch = useDispatch();
    const aftVotesObj = useSelector(state => state.votes.votesAnswer);
    const aftVotes = Object.values(aftVotesObj)
    const currUser = useSelector(state => state.session.user)
    console.log("======== forVotesNum", forVotesNum)
    console.log("======== aftVotes", aftVotes)

    const getVotesNum = (aftvotes) => {
        let voteNum = 0;
        let votes = aftVotes
        for (let i = 0; i < votes.length; i++) {
          const vote = votes[i];
            if (vote.up) {
                voteNum++;
            }
            else if (vote.down) {
                voteNum--;
            }
        }

        return voteNum;
      }
      console.log("---------votesNum", getVotesNum(aftVotes))

    const upClick = async(e) => {
        if (currUser && currUser.id == ownerId) {
            alert("You can not vote for your own answer!")
        }
        const up = {"up": true}
        console.log("in vote component:", up)
        const response = await dispatch(upVoteAnswer(answerId, up))
        if (response) {
            dispatch(getAnswerVotes(answerId))
        }
    }

    const downClick = async(e) => {
        if (currUser && currUser.id == ownerId) {
            alert("You can not vote for your own answer!")
        }
        const down = {"down": true}
        const response = await dispatch(downVoteAnswer(answerId, down))
        if (response) {
            dispatch(getAnswerVotes(answerId))
        }
    }


    return (
        <>
        <div>
            <div>
                <button class="fa-solid fa-caret-up" onClick={upClick}></button>
            </div>

            <div className='signle-answer-vote-num'>{!aftVotes ? forVotesNum : getVotesNum(aftVotes)}</div>

            <div>
                <button class="fa-solid fa-caret-down" onClick={downClick}></button>
            </div>

        </div>
        </>




    )
}






export default VoteAnswer
