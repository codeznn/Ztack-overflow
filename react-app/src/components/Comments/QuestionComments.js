import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Link } from "react-router-dom";
import { addOneComment } from '../../store/comments';

const QuestionComments = ({questionId, user}) => {
    const [showCommentBox, setShowCommentBox] = useState(false)
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])
    console.log("showCommentBox", showCommentBox)



    const addComment = () => {
        if (!user) {
            alert("You should be logged in first!")
        }

        setShowCommentBox(!showCommentBox)

    }

    const handleSubmit = async(e) => {
        const cont = {"content": content}
        const response = await dispatchEvent(addOneComment(questionId, cont))

    }


    return (
        <>
        <div className='question-comment-container'>
            <button className='question-comment-add' onClick={addComment}>Add a comment</button>
        </div>
        <div className='question-comment-box'>
            {showCommentBox &&
            <div>
                <textarea className='question-comment-box-textarea'
                    type='text'
                    value={content}
                    required
                    onChange={(e) => setContent(e.target.value)}
                />
                <button className='question-comment-box-submit' onClick={handleSubmit}>Submit</button>
            </div>
            }
        </div>
        </>
    )
};



export default QuestionComments
