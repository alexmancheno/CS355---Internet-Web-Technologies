import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import UserInfo from './UserInfo';
import Assignment2 from './Assignment2/Assignment2';

// The Main component renders one of the provided
// Routes (provided that one matches).

export default class Main extends React.Component {
    render () {
        return (
            <main class="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/UserInfo" component={UserInfo} />
                    <Route path="/Assignment2" component={Assignment2} />
                </Switch>
            </main>
        )
    }
}