import React from "react"
import { useHistory } from "react-router-dom"
import "./CSS/PageNotFound.css"

const PageNotFound = () => {
  const history = useHistory()

  return (
    <div className="wrapper-center">
      <div className="notfound-header">
        <div className="notfound-header-title">Page Not Found</div>
      </div>
      <div className="notfound-header cursor-pointer" onClick={() => history.push("/home")}>Go back to the home page</div>
    </div>
  )
}

export default PageNotFound
