import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import UserInfo from './UserInfo';
import Assignment2 from './Assignment2/Assignment2';
import Assignment3 from './Assignment3/Assignment3';

// The Main component renders one of the provided
// Routes (provided that one matches).

export default class Main extends React.Component {
    render() {
        return (
            <main className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/UserInfo" component={UserInfo} />
                    <Route path="/Assignment2" component={Assignment2} />
                    <Route path="/Assignment3" component={Assignment3} />
                </Switch>
            </main>
        )
    }
}