import React from "react"
import { useHistory } from "react-router-dom"
import "./CSS/PageNotFound.css"

const PageNotFound = () => {
  const history = useHistory()

  return (
    <div className="wrapper-center">
      <div className="notfound-header">
        <h1>Page Not Found</h1>
      </div>
      <h2 className="notfound-header cursor-pointer" onClick={() => history.push("/")}>Go back to the home page</h2>
    </div>
  )
}

export default PageNotFound
