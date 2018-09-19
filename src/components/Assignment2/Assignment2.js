import React from 'react';
import UrlVisualizer from './UrlVisualizer';
const autoBind = require('auto-bind');

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
            this.setState({urls: arr});
        };
        reader.readAsText(input.files[0]);
    }

    render() {
        let url_array = this.state.urls;
        let msg = "hi";
        return (
            <div>
                 <input type='file' accept='text/plain'
                  onChange={e => this.openFile(e)} />
                  <UrlVisualizer urls={url_array} />
            </div>
        )
    }
}