import React from 'react';
import autoBind from 'react-autobind';

export default class UserInput1 extends React.Component {
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

    getTab()
    {
        if (this.state.tab == "1") {
            return (
                <div id="IPv4" className="tab-pane fade in active">
                    hey
                </div>
            )
        } else {
            return (
                <div id="IPv6" className="tab-pane">
                    hi
                </div>
            )
        }
    }


    render() {
        let tab = this.getTab();
        return (
            <div>
                <ul className="nav nav-tabs">
                    <li className="active" onClick={e => this.changeTab("1")}>
                        <a data-toggle="tab" href="#IPv4">IPv4</a>
                    </li>
                    <li onClick={e => this.changeTab("2")}>
                        <a data-toggle="tab" href="#IPv6" >IPv6</a>
                    </li>
                </ul>
                <div className="tab-content">
                    {tab}
                </div>
            </div>
        )
    }
}