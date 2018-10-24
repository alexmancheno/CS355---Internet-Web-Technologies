import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.

export default class Header extends React.Component {

    render() {
        return (
            <header>
                <nav className="navbar navbar-default navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                                aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">Alex Mancheno</a>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                                        aria-expanded="false">Assignments<span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="https://www.zybooks.com/" target="_blanks">Zybooks</a></li>
                                        <li><Link to="/">Assignment 1</Link></li>
                                        <li>
                                            <Link to="/Assignment2">
                                                Assignment 2
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/Assignment3">
                                                Assignment 3
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li><Link to="/UserInfo">User Info</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}