import React from 'react';
import autoBind from 'react-autobind';

export default class UserInput extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        let addresses = new Object();
        this.state = {
            classful: true,
            classNameValue: "A",
            numberOfHostsNeeded: 0,
            addresses: JSON.stringify(addresses)
        }
    }

    handleclassNameChange(event) {
        this.setState({classNameValue: event.target.value})
    }

    handleclassNameRadioButtonChange(bool) {
        this.setState({classNameful: bool});
    }

    handleSubmit(event) { 
        event.preventDefault();
        this.generateIPv4Address();
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    dec2bin(dec) {
        return (dec >>> 0).toString(2);
    }   

    generateIPv4Address() {
        console.log(this.state.addresses);
        let map;
        if (localStorage.getItem("addresses") !== null) {
            map = JSON.parse(localStorage.getItem("addresses"));
        } else {
            map = new Object();
        }
        let randomAddress;
        let r = 0;
        if (this.state.classful) {
            if (this.state.classNameValue === "A") {
                r += (this.getRandomInt(128)) << 24;
            } else if (this.state.classNameValue === "B") {
                r += (this.getRandomInt(64) + 128) << 24;
                r += (this.getRandomInt(256) << 16);
            } else if (this.state.classNameValue === "C") {
                r += (this.getRandomInt(32) + 192) << 24;
                r += (this.getRandomInt(256)) << 16;
                r += (this.getRandomInt(256)) << 8;
            } else if (this.state.classNameValue === "D")  {
                r += (this.getRandomInt(16) + 224) << 24;
                r += (this.getRandomInt(256)) << 16;
                r += (this.getRandomInt(256)) << 8;
                r += (this.getRandomInt(256));
            } else if (this.state.classNameValue === "E") {
                r += Math.ceil(Math.log2(this.state.numberOfHostsNeeded));
                console.elog(r);
            }
        } else {

        }

        randomAddress = r.toString();
        console.log(map);
        if (!(randomAddress in map)) map[randomAddress] = "yes";
        else console.log("Address already existed!");
        
        localStorage.setItem("addresses", JSON.stringify(map));
        console.log(r.toString(2));
        // localStorage.clear();
    }

    handleNumberOfHostsChange(event) {
        this.setState({numberOfHostsNeeded: event.target.value});
    }

    getIPv4TabContent() {
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <div className="form-group-row">
                        <legend className="col-form-label">classNameful or classNameless?</legend>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    checked={this.state.classNameful === true}
                                    onChange={e => this.handleclassNameRadioButtonChange(true)} />
                                classful
                            </label>
                        </div>
                    <div className="form-group">
                        <label htmlFor="classNameSelect">Pick addressing className</label>
                        <select className="form-control" id="classNameSelect" value={this.state.classNameValue} onChange={e => this.handleclassNameChange(e)}  disabled={!this.state.classNameful}>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                        </select>
                    </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    checked={this.state.classNameful === false}
                                    onChange={e => this.handleclassNameRadioButtonChange(false)} />
                                classless
                            </label>
                        </div>
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">Number of hosts needed:</span>
                        <input type="number" className="form-control" placeholder="hosts.." aria-describedby="basic-addon1" disabled={this.state.classNameful} onChange={e=>{this.handleNumberOfHostsChange(e)}}/>
                    </div>
                    <br/>
                    <button type="submit" value="submit" className="btn btn-primary">Assign!</button>
                    </div>
                </form>
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
                <ul className="nav nav-tabs">
                    <li className="active"><a data-toggle="tab" href="#IPv4Tab">IPv4</a></li>
                    <li><a data-toggle="tab" href="#IPv6Tab">IPv6</a></li>
                </ul>

                <div className="tab-content">
                    <div id="IPv4Tab" className="tab-pane fade in active">
                        {this.getIPv4TabContent()}
                    </div>
                    <div id="IPv6Tab" className="tab-pane fade">
                        {this.getIPv6TabContent()}
                    </div>
                </div>
            </div>
        )
    }
}