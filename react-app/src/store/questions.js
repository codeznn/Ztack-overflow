const LOAD_ALL_QUESTIONS = 'questions/loadallquestions';
const LOAD_TOP_QUESTIONS = 'questions/loadtopquestions';
const LOAD_SEARCH_QUESTIONS = 'questions/loadsearchquestions';
const LOAD_ONE_QUESTION = 'questions/loadonequestion';
const CREATE_QUESTION = 'questions/createquestion';
const UPDATE_QUESTION = 'questions/updatequestion';
const REMOVE_QUESTION = 'questions/deletequestion';
const MY_QUESTIONS = 'questions/myquestion';
const SEARCH_QUESTIONS = 'questions/searchedquestions';


const allQuestions = (questions) => ({
    type: LOAD_ALL_QUESTIONS,
    questions
})

const topQuestions = (questions) => ({
    type: LOAD_TOP_QUESTIONS,
    questions
})

const searchQuestions = (questions) => ({
    type: LOAD_SEARCH_QUESTIONS,
    questions
})

const oneQuestion = (question) => ({
    type: LOAD_ONE_QUESTION,
    question
})

const addQuestion = (question) => ({
    type: CREATE_QUESTION,
    question
})

export const getAllQuestions = () => async (dispatch) =>  {
    const response = await fetch('/api/questions/all')

    if (response.ok) {
        const questions = await response.json();
        dispatch(allQuestions(questions))
        return questions
    }
}

export const getTopQuestions = () => async (dispatch) =>  {
    const response = await fetch('/api/questions/top')

    if (response.ok) {
        const questions = await response.json();
        dispatch(topQuestions(questions))
        return questions
    }
}

export const getSearchQuestions = (keyword) => async (dispatch) => {
    const response = await fetch(`/api/questions/search/${keyword}`)

    if (response.ok) {
        const questions = await response.json();
        dispatch(searchQuestions(questions))
        return questions
    }
}

export const getOneQuestion = (id) => async (dispatch) => {

    const response = await fetch(`/api/questions/${id}`)

    if (response.ok) {
        const question = await response.json();
        dispatch(oneQuestion(question))
        return question
    }
}

export const addOneQustion = (question) => async (dispatch) => {
    console.log("======in Reducer")
    try {
        const response = await fetch(`/api/questions`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(question)
        });

        if (response.ok) {
            const newQuestion = await response.json();
            console.log("======in Reducer-newQuestion", newQuestion)
            dispatch(addQuestion(newQuestion));
            return newQuestion
        }

    } catch(error) {
        throw error
    }

}


const initialState = {
    allQuestions: {},
    topQuestions: {},
    searchQuestions: {},
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

        case LOAD_TOP_QUESTIONS:
            newState = { ...state, searchQuestions: { ...state.searchQuestions}}
            action.questions.Questions.forEach(question => {
                newState.searchQuestions[question.id] = question
            })
            return newState;

        case LOAD_ONE_QUESTION:
            newState = { ...state, singleQuestion: { ...action.question}}
            return newState;

        case CREATE_QUESTION:
            newState = { ...state, allQuestions: { ...state.allQuestions, [action.question.id]: action.question} };
            return newState

        default:
            return state
    }
}

export default questions;
