import React from 'react';
import autoBind from 'react-autobind';
import IPv4Tab from './IPv4Tab';
import IPv6Tab from './IPv6Tab';

export default class Asssignment3 extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#IPv4Tab">IPv4</a></li>
                    <li><a data-toggle="tab" href="#IPv6Tab">IPv6</a></li>
                </ul>

                <div className="tab-content">
                <br></br>
                    <div id="IPv4Tab" className="tab-pane fade in active">
                        <IPv4Tab />
                    </div>
                    <div id="IPv6Tab" className="tab-pane fade">
                        <IPv6Tab />
                    </div>
                </div>
            </div>
        )
    }
}