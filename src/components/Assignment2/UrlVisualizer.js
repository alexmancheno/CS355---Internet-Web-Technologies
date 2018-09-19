import React from 'react';
import UrlTable from './UrlTable';
const autoBind = require('auto-bind');

export default class UrlVisualizer extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return (
            <div>
                <h3>Current time: {new Date().toLocaleTimeString()}</h3>
                <h4>Urls length: {this.props.urls.length}</h4>
                <UrlTable urls={this.props.urls} />
            </div>
        )
    }
}