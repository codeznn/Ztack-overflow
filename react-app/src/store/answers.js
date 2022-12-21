const LOAD_ALL_ANSWERS = 'questions/loadallanswers';
const CREATE_ANSWER = 'questions/createanswer';
const UPDATE_ANSWER = 'questions/updateanswer';
const REMOVE_ANSWER = 'questions/deleteanswer';
const MY_ANSWERS = 'questions/myanswers';


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

const initialState = {
    answers: {},
}

const answers = (state = initialState, action) => {
    let newState
    switch(action.type) {
        case LOAD_ALL_ANSWERS:
            newState = { ...state, answers: { ...state.answers}}
            action.answers.Answers.forEach(answer => {
                newState.answers[answer.id] = answer
            })
            return newState

        default:
            return state
    }
}

export default answers
