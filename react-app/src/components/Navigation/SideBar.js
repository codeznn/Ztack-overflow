import React from "react"
import { NavLink, useHistory } from "react-router-dom";
import "../CSS/SideBar.css"

const SideBar = () => {
    const history = useHistory();

    return (
        <>
        <div className="sidebar-container">
            <NavLink to='/home' exact={true}  activeClassName='active' className="sidebar-home">
                Home
            </NavLink>
            <div className="sidebar-public">PUBLIC</div>

            <NavLink to='/questions' exact={true} activeClassName='active' className="sidebar-questions">
            <i class="fa-solid fa-earth-americas"></i> Questions
            </NavLink>
            <NavLink to='/tags' exact={true} activeClassName='active' className="sidebar-tags">
                Tags
            </NavLink>
            <NavLink to='/users' exact={true} activeClassName='active' className="sidebar-users">
                Users
            </NavLink>
        </div>
        </>
    )
}

export default SideBar;
