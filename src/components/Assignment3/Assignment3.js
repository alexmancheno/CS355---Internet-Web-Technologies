import React from 'react';
import autoBind from 'react-autobind';
import UserInput from './UserInput';

export default class Asssignment3 extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return (
            <div>
                <UserInput />
            </div>
        )
    }
}