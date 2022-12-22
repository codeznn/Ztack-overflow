import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addOneAnswer } from "../../store/answers";

const CreateAnswer = ({ questionId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    //console.log("=== in createAnswer component-questionId:", questionId)

    const handleSubmit = async(e) => {
        e.preventDefault()
        setErrors([])
        //setHasSubmitted(true)

        const answer = { content }
        const response = await dispatch(addOneAnswer(answer, questionId))
        console.log("=== in createAnswer component-response:", response)
        const backendError = []
        if (response) {
            console.log("============")
        }
        if (response.errors) {
            backendError.push(response.errors)
            //console.log("=== in createAnswer component-error:", error)
            setErrors(backendError)
            //console.log("=== in createAnswer component-errors2:", errors)
        }

        // if (response) {
        //     console.log("==================")
        //     setContent('')
        // }

        //setContent('')
        // setErrors([])
        //setHasSubmitted(false)
    }

    const handleCancelClick = () => {
        setContent('')
        setErrors([])
    };


    return (
        <>
        <div className="create-answer-title">Your Answer</div>
        <div className="create-answer-wrapper">
        <form className="create-answer-form" onSubmit={handleSubmit}>

        <div className="create-answer-body">

            <div>
                {errors && errors?.map((error, i) => {
                    return (
                        <div key={i} className='create-question-errors'>•{error[0].split(":")[1]}</div>
                    )
                })}
            </div>
            <input className="create-answer-input"
                type="text"
                value={content}
                required
                onChange={(e) => setContent(e.target.value)}
            />
        </div>

        <div className="create-answer-button">
            <button type="submit">Post your answer</button>
            <button type="button" onClick={handleCancelClick}>Draft</button>
        </div>
        </form>

    </div>
        </>
    )

}

export default CreateAnswer;
