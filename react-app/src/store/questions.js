const LOAD_ALL_QUESTIONS = 'questions/loadallquestions';
const LOAD_TOP_QUESTIONS = 'questions/loadtopquestions';
const LOAD_ONE_QUESTION = 'questions/loadonequestion';
const CREATE_QUESTION = 'questions/createquestion';
const ADD_IMG = 'questions/addimg';
const UPDATE_QUESTION = 'questions/updatequestion';
const REMOVE_QUESTION = 'questions/deletequestion';
const MY_QUESTIONS = 'questions/myquestion';
const RESET_QUESTIONS = 'questions/RESET_QUESTIONS'
const SEARCH_QUESTIONS = 'questions/searchedquestions';


const allQuestions = (questions) => ({
    type: LOAD_ALL_QUESTIONS,
    questions
})

const topQuestions = (questions) => ({
    type: LOAD_TOP_QUESTIONS,
    questions
})

export const getAllQuestions = () => async (dispatch) =>  {
    console.log("======in Reducer")
    const response = await fetch('/api/questions/all')

    if (response.ok) {
        const questions = await response.json();
        console.log("======in Reducer-questions", questions)
        dispatch(allQuestions(questions))
        return questions
    }
}

export const getTopQuestions = () => async (dispatch) =>  {
    console.log("======in Reducer")
    const response = await fetch('/api/questions/top')

    if (response.ok) {
        const questions = await response.json();
        console.log("======in Reducer-questions", questions)
        dispatch(topQuestions(questions))
        return questions
    }
}


const initialState = {
    allQuestions: {},
    topQuestions: {},
    singleQuestion: {},
}

const questions = (state = initialState, action) => {
    let newState
    switch(action.type) {
        case LOAD_ALL_QUESTIONS:
            newState = { ...state, allQuestions: { ...state.allQuestions}}
            action.questions.Questions.forEach(question => {
                newState.allQuestions[question.id] = question
            })
            return newState;
        case LOAD_TOP_QUESTIONS:
            newState = { ...state, topQuestions: { ...state.topQuestions}}
            action.questions.Questions.forEach(question => {
                newState.topQuestions[question.id] = question
            })
            return newState;

        default:
            return state
    }
}

export default questions;
