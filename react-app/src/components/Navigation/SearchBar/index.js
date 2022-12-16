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

        const response = await dispatch(getSearchQuestions(keyword))

        if (response) {
            history.pushState(`/search/${keyword}`)
        }

        setKeyword("")
    }

    return (
        <div className='searchBar-main'>
            <div className='searchBar-container'>
                <form onSubmit={handleSearch} className='searchBar-form'>
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
    )
}

export default SearchBar
