const LOAD_COMMENT_QUESTION = 'comments/question'
const LOAD_COMMENT_ANSWER = 'comments/answer'
const CREATE_COMMENT = 'comments/create'
const UPDATE_COMMENT = 'comments/update'
const REMOVE_COMMENT = 'comments/delete'


const allComments = (comments) => ({
    type: LOAD_COMMENT_QUESTION,
    comments
})

const addComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
})

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
})

const removeComment = (commentId) => ({
    type: REMOVE_COMMENT,
    commentId
})

export const getQuestionComments = (questionId) => async (dispatch) => {
    const response = await fetch(`/api/comments/question/${questionId}`)

    if (response.ok) {
        const comments = await response.json();
        dispatch(allComments(comments))
        return comments
    }
}

export const addOneComment = (comment, questionId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/questions/${questionId}/comments`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });

        if (response.ok) {
            const newComment = await response.json()
            dispatch(addComment(newComment));
            return newComment
        } else {
            const error = await response.json()
            return error
        }

    } catch(error) {
        throw error
    }
}

export const updateOneComment = (comment, commentId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/comments/${commentId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });

        if (response.ok) {
            const newComment = await response.json()
            dispatch(addComment(newComment));
            return newComment
        } else {
            const error = await response.json()
            return error
        }

    } catch(error) {
        throw error
    }
}

export const removeOneComment = (commentId) => async (dispatch) => {
    const response = await fetch(`api/comments/${commentId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(removeComment(commentId))
        return ('Comment has been deleted successfully!')
    }
}

const initialState = {
    questionComments: {},
    answerComments: {}
}

const comments = (state = initialState, action) => {
    let newState
    switch(action.type) {
        case LOAD_COMMENT_QUESTION:
            newState = { ...state, questionComments: {}}
            action.questionComments.Comments.forEach(comment => {
                newState.questionComments[comment.id] = comment
            });
            return newState

        case CREATE_COMMENT:
            newState = { ...state, questionComments: { ...state.questionComments, [action.comment.id]: action.comment}}
            return newState

        case REMOVE_COMMENT:
            newState = { ...state, questionComments: { ...state.questionComments}}
            delete newState.questionComments[action.commentId]
            return newState
        default:
            return state
    }
}

export default comments
