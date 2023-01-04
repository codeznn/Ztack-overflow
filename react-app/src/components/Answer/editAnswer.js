import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateOneAnswer } from "../../store/answers";


const EditAnswer = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { answerId } = useParams();
    const answer = useSelector((state) => state.answers.answers[answerId]);
    const questionId = answer?.questionId
    const [content, setContent] = useState(answer?.content);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    console.log("=== in editAnswer component-answer:", answer)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setErrors([])
        setHasSubmitted(true)

        const errors = []

        if (content.length < 30) errors.push('Content requires 30 characters minimum!')
        if (content.length > 200000) errors.push('Content exceeds 200000 characters limit!')
        setErrors(errors)

        console.log("=== in editAnswer component-error:", errors)

        if (errors.length > 0) {
            return
        }

        const answer = { content }
        console.log("=== in editAnswer component-answer:", answerId)

        const response = await dispatch(updateOneAnswer(answer, answerId))

        //console.log("=== in editQustion component-response:", response)
        if (response){
            history.push(`/questions/${questionId}`)
        }

        setContent('')
        setErrors([])
        setHasSubmitted(false)
    }

    const handleCancelClick = () => {
        history.push(`/questions/${questionId}`)
    }

    return (
        <div className="create-question-wrapper">
        <div className="create-question-h1">Edit your answer</div>
        <form className="create-answer-form" onSubmit={handleSubmit}>

        <div className="create-answer-body">
            <div className="create-question-head-sub">Minimum 30 characters.</div>
            <div>
                {hasSubmitted && errors?.map((error, i) => {
                    if (error.split(" ")[0] === 'Content')
                        return (
                            <div key={i} className='create-question-errors'>•{error}</div>
                        )
                })}
            </div>
            <textarea className="create-question-textarea"
                type="text"
                value={content}
                required
                onChange={(e) => setContent(e.target.value)}
            />
        </div>

        <div className="create-answer-button">
            <button type="submit" className="create-question-button">Save Edits</button>
            <button type="button" onClick={handleCancelClick} className="create-question-button">Cancel</button>
        </div>
        </form>

    </div>
    )
}

export default EditAnswer;
