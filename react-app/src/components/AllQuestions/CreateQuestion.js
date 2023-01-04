import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addOneQustion } from "../../store/questions";

import '../CSS/CreateQuestion.css';

const CreateQuestion = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)


    if (!sessionUser) {
        alert("You need to be logged in first!")
        history.push('/login')
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setErrors([])
        setHasSubmitted(true)

        const errors = []

        if (title.length < 15) errors.push('Title requires 15 characters minimum!')
        if (title.length > 255) errors.push('Title exceeds 255 characters limit!')
        if (body.length < 30) errors.push('Body requires 30 characters minimum!')
        if (body.length > 200000) errors.push('Body exceeds 200000 characters limit!')
        setErrors(errors)

        console.log("=== in createQustion component-error:", errors)

        if (errors.length > 0) {
            return
        }

        const question = { title, body }
        console.log("=== in createQustion component-question:", question)

        const response = await dispatch(addOneQustion(question))

        console.log("=== in createQustion component-response:", response)
        if (response){
            history.push(`/questions/${response.id}`)
        }

        setTitle('')
        setBody('')
        setErrors([])
        setHasSubmitted(false)

    }

    const handleCancelClick = () => {
        return history.push('/');
    };


    return (
        <div className="create-question-wrapper">
            <div className="create-question-h1">Ask a public question</div>
            <form className="create-question-form" onSubmit={handleSubmit}>
            <div className="create-question-title">
                <div className="create-question-head">Title</div>
                <div className="create-question-head-sub">Be specific and imagine you are asking a question to another person. Minimum 15 characters.</div>
                <div>
                    {hasSubmitted && errors?.map((error, i) => {
                        if (error.split(" ")[0] === 'Title')
                            return (
                                <div key={i} className='create-question-errors'>•{error}</div>
                            )
                    })}
                </div>
                <input className="create-question-input"
                    type="text"
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="create-question-body">
                <div className="create-question-head">Body</div>
                <div className="create-question-head-sub">The body of your question contains your problem details and results. Minimum 30 characters.</div>
                <div>
                    {hasSubmitted && errors?.map((error, i) => {
                        if (error.split(" ")[0] === 'Body')
                            return (
                                <div key={i} className='create-question-errors'>•{error}</div>
                            )
                    })}
                </div>
                <input className="create-question-input"
                    type="text"
                    value={body}
                    required
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>

            <div className="create-question-button-container">
                <button type="submit" className="create-question-button">Post Your Question</button>
            </div>
            </form>

        </div>
    )
}

export default CreateQuestion;
