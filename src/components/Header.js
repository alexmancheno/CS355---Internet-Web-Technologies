import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.

export default class Header extends React.Component {

    render () {
        return (
            <header>
                <nav class="navbar navbar-default navbar-inverse">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                                aria-expanded="false">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <a class="navbar-brand" href="#">Alex Mancheno</a>
                        </div>
                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul class="nav navbar-nav">
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                                        aria-expanded="false">Assignments<span class="caret"></span></a>
                                    <ul class="dropdown-menu">
                                        <li><a href="https://www.zybooks.com/" target="_blanks">Zybooks</a></li>
                                        <li><Link to="/">Assignment 1</Link></li>
                                        <li>
                                            <Link to="/Assignment2">
                                                Assignment 2
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