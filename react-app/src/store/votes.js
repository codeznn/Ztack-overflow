const UP_VOTE = 'votes/up';
const DOWN_VOTE = 'votes/down';

const upVote = (id) => ({
    type: UP_VOTE,
    id
})

const downVote = (id) => ({
    type: DOWN_VOTE,
    id
})

export const upVoteAnswer = (answerId, up) => async (dispatch) => {
    try {
        console.log("in vote thunk:", up)
        const response = await fetch(`/api/votes/${answerId}/up`, {
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


export const downVoteAnswer = (answerId, isVote) => async (dispatch) => {
    try {
        const response = await fetch(`/api/answers/${answerId}/votes`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(isVote)
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
