import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSearchQuestions } from '../../../store/questions';
import './SearchBar.css'

const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [keyword, setKeyword] = useState("");



    const handleSearch = async (e) => {
        e.preventDefault()

        if (keyword.trim().length === 0) {
            return
        }
        //console.log("=====in search comonent-keyword:", keyword)
        const response = await dispatch(getSearchQuestions(keyword))

        if (response) {
            history.push(`/search/${keyword}`)
        }

        setKeyword("")
    }

    const myFunction = (e) => {
        if((e && e.keyCode == 13) || e == 0) {
          alert("The form was submitted");
          document.forms.form01.submit();
          document.forms.form01.fname.value = ""; // could be form01.reset as well
        }
     }

    return (
        <div className='searchBar-main'>
            <div className='searchBar-container'>
                <div onKeyPress={(e)=> myFunction(e)}>
                    <form id="form01" action="demo_form.asp" onSubmit={handleSearch} className='searchBar-form'>
                        <i className="fa-sharp fa-solid fa-magnifying-glass"></i>
                        <input
                            placeholder="Search..."
                            className='searchBar-input'
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            maxLength="100"
                        >
                        </input>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default SearchBar
