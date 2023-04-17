const UP_VOTE = 'votes/up';
const DOWN_VOTE = 'votes/down';
const GET_VOTE_ANSWER = 'votes/answerVote';
const GET_VOTE_QUESTION = 'votes/questionVote';

const upVote = (id) => ({
    type: UP_VOTE,
    id
})

const downVote = (id) => ({
    type: DOWN_VOTE,
    id
})

const getVotesAnswer = (votes) => ({
    type: GET_VOTE_ANSWER,
    votes
})

const getVotesQuestion = (votes) => ({
    type: GET_VOTE_QUESTION,
    votes
})

export const getAnswerVotes = (id) => async (dispatch) => {

    const response = await fetch(`/api/votes/answer/${id}`)

    if (response.ok) {
        const votes = await response.json();
        dispatch(getVotesAnswer(votes))
        return votes
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
            return newVote
        }

    } catch(error) {
        throw error
    }
}

export const getQuestionVotes = (id) => async (dispatch) => {
    console.log("======in getQuestionVotes Reducer-id", id)
    const response = await fetch(`/api/votes/question/${id}`)

    if (response.ok) {
        const votes = await response.json();
        dispatch(getVotesQuestion(votes))
        return votes
    }
}

export const upVoteQuestion = (questionId, up) => async (dispatch) => {
    try {
        console.log("in vote thunk:", up)
        const response = await fetch(`/api/votes/question/${questionId}/up`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(up)
        });

        if (response.ok) {
            const newVote = await response.json();
            return newVote
        }

    } catch(error) {
        throw error
    }
}


export const downVoteQuestion = (questionId, down) => async (dispatch) => {
    try {
        const response = await fetch(`/api/votes/question/${questionId}/down`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(down)
        });

        if (response.ok) {
            const newVote = await response.json();
            return newVote
        }

    } catch(error) {
        throw error
    }
}


const initialState = {
    votesQuestion: {},
    votesAnswer: {}
}

const votes = (state = initialState, action) => {
    let newState
    switch(action.type) {
        case GET_VOTE_ANSWER:
            newState = { ...state, votesAnswer: { ...state.votesAnswer}}
            action.votes.Votes.forEach(vote => {
                newState.votesAnswer[vote.id] = vote
            })
            return newState

        case GET_VOTE_QUESTION:
            newState = { ...state, votesQuestion: { ...state.votesQuestion}}
            action.votes.Votes.forEach(vote => {
                newState.votesQuestion[vote.id] = vote
            })
            return newState
        default:
            return state
    }
}

export default votes
