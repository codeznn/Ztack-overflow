const LOAD_ALL_ANSWERS = 'answers/loadallanswers';
const CREATE_ANSWER = 'answers/createanswer';
const UPDATE_ANSWER = 'answers/updateanswer';
const REMOVE_ANSWER = 'answers/deleteanswer';
const MY_ANSWERS = 'answers/myanswers';


const allAnswers = (answers) => ({
    type: LOAD_ALL_ANSWERS,
    answers
})

const addAnswer = (answer) => ({
    type: CREATE_ANSWER,
    answer
})

const updateAnswer = (answer) => ({
    type: UPDATE_ANSWER,
    answer
})

const removeAnswer = (answerId) => ({
    type: REMOVE_ANSWER,
    answerId
})


export const getAllAnswers = (questionId) => async (dispatch) => {
    const response = await fetch(`/api/questions/${questionId}/answers`)

    if (response.ok) {
        const answers = await response.json();
        dispatch(allAnswers(answers))
        return answers
    }
}

export const addOneAnswer = (answer, questionId) => async (dispatch) => {
    try {
        console.log("=====in Reducer", answer)
        const response = await fetch(`/api/questions/${questionId}/answers`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answer)
        });

        if (response.ok) {
            const newAnswer = await response.json();
            console.log("=====in Reducer", newAnswer)
            dispatch(addAnswer(newAnswer));
            return newAnswer
        } else {
            const error = await response.json()
            console.log("=====in Reducer-error", error)
                return error
        }

    } catch(error) {
        throw error
    }
}

export const updateOneAnswer = (answer, answerId) => async (dispatch) => {
    try {
        console.log("=====in Reducer", answer)
        const response = await fetch(`/api/answers/${answerId}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answer)
        });

        if (response.ok) {
            const newAnswer = await response.json();
            dispatch(addAnswer(newAnswer));
            console.log("=====in Reducer", newAnswer)
            return newAnswer
        }

    } catch(error) {
        throw error
    }
}

export const removeOneAnswer = (answerId) => async (dispatch) => {
    const response = await fetch(`/api/answers/${answerId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        console.log("====in Reducer before dispatch")
        dispatch(removeAnswer(answerId))
        return ("Answer has been deleted successfully!")
    }
}



const initialState = {
    answers: {},
}

const answers = (state = initialState, action) => {
    let newState
    switch(action.type) {
        case REMOVE_ANSWER:
            newState = {...state}
            newState.answers = {}
            return newState
        case LOAD_ALL_ANSWERS:
            newState = { ...state, answers: {}}
            action.answers.Answers.forEach(answer => {
                newState.answers[answer.id] = answer
            })
            return newState

        case CREATE_ANSWER:
            newState = { ...state, answers: { ...state.answers, [action.answer.id]: action.answer}}
            return newState

        case UPDATE_ANSWER:
            newState = { ...state, answers: { ...state.answers, [action.answer.id]: action.answer}}
            return newState

        case REMOVE_ANSWER:
            newState = newState = { ...state, answers: { ...state.answers}}
            console.log("=====in before REMOVE_ANSWER-newState:", newState)
            delete newState.answers[action.answerId]
            console.log("=====in after REMOVE_ANSWER-newState:", newState)
            return newState

        default:
            return state
    }
}

export default answers
