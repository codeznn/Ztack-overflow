import React from "react"
import { Link, useHistory } from "react-router-dom"

const SideBar = () => {
    const history = useHistory();

    return (
        <>
        <Link className="sidebar-home">
            Home
        </Link>
        <div className="sidebar-public">PUBLIC</div>
        <Link className="sidebar-questions">
            Questions
        </Link>
        <Link className="sidebar-tags">
            Tags
        </Link>
        <Link className="sidebar-users">
            Users
        </Link>
        </>
    )
}
