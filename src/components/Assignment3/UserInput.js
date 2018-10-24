import React from 'react';
import autoBind from 'react-autobind';

export default class UserInput extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            tab: "1"
        }
    }

    changeTab(tab) {
        this.setState({tab: tab});
    }

    getIPv4TabContent() {
        return (
            <div>
                
            </div>
        )
    }

    getIPv6TabContent() {
        return (
            <div>
                hey
            </div>
        )
    }


    render() {
        
        return (
        <div>
            <ul class="nav nav-tabs">
                <li class="active"><a data-toggle="tab" href="#IPv4Tab">Home</a></li>
                <li><a data-toggle="tab" href="#IPv6Tab">Menu 1</a></li>
            </ul>

            <div class="tab-content">
                <div id="IPv4Tab" class="tab-pane fade in active">
                    {this.getIPv4TabContent()}
                </div>
                <div id="IPv6Tab" class="tab-pane fade">
                    {this.getIPv6TabContent()}
                </div>
            </div>
        </div>
        )
    }
}