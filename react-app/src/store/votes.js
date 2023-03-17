const UP_VOTE = 'votes/up';
const DOWN_VOTE = 'votes/down';
const GET_VOTE_NUM = 'votes/num';

const upVote = (id) => ({
    type: UP_VOTE,
    id
})

const downVote = (id) => ({
    type: DOWN_VOTE,
    id
})

const getVoteNum = (votesNum) => ({
    type: GET_VOTE_NUM,
    votesNum
})

export const getAnswerNum = (id) => async (dispatch) => {
    console.log("======in Reducer-id", id)
    const response = await fetch(`/api/votes/answer/${id}`)

    if (response.ok) {
        const votesNum = await response.json();
        console.log("======in Reducer-votesNum", votesNum)
        dispatch(getVoteNum(votesNum))
        return votesNum
    }
}

export const upVoteAnswer = (answerId, up) => async (dispatch) => {
    try {
        console.log("in vote thunk:", up)
        const response = await fetch(`/api/votes/answer/${answerId}/up`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(up)
        });

        if (response.ok) {
            const newVote = await response.json();
            console.log("======in Reducer-newVote", newVote)
            return newVote
        }

    } catch(error) {
        throw error
    }
}


export const downVoteAnswer = (answerId, down) => async (dispatch) => {
    try {
        const response = await fetch(`/api/votes/answer/${answerId}/down`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(down)
        });

        if (response.ok) {
            const newVote = await response.json();
            console.log("======in Reducer-newVote", newVote)
            return newVote
        }

    } catch(error) {
        throw error
    }
}


const initialState = {
    voteQuestionNum: {},
    voteAnswerNum: {}
}

const votes = (state = initialState, action) => {
    let newState
    switch(action.type) {
        case GET_VOTE_NUM:
            newState = { ...state, voteAnswerNum: { ...state.voteAnswerNum}}
            newState.voteAnswerNum = action.votesNum
            // console.log("======in Reducer-votesNum", newState)
            return newState
        default:
            return state
    }
}

export default votes
