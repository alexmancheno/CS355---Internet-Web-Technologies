import React from 'react';
import UrlVisualizer from './UrlVisualizer';
import autoBind from 'react-autobind';

export default class Assignment2 extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            urls: []
        };
    }

    openFile(e) {
        let input = e.target;
        let reader = new FileReader();
        reader.onload = () => {
            let str = reader.result;
            let arr = str.split(/[\r\n]+/g);
            this.setState({ urls: arr });
        };
        reader.readAsText(input.files[0]);
    }

    render() {

        let url_array = this.state.urls;

        return (
            <div>
                <h2>Assignment 2 - Url Analyzer</h2>
                <h3>Upload file containing url's</h3>
                <input type='file' accept='text/plain'
                    onChange={e => this.openFile(e)} />
                <br />
                <UrlVisualizer urls={url_array} />
            </div>
        )
    }
}