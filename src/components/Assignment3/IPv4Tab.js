import React from 'react';
import autoBind from 'react-autobind';
import style from './style.css';

export default class IPv4TabContent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            classful: true,
            classNameValue: "A",
            numberOfHostsNeeded: 0,
            generatedIPAddress: "",
            ipAddressInBinary: "",
        }
    }

    handleclassNameChange(event) {
        this.setState({classNameValue: event.target.value});
    }

    handleNumberOfHostsChange(event) {
        this.setState({numberOfHostsNeeded: event.target.value });
    }

    handleclassNameRadioButtonChange(bool) {
        this.setState({classful: bool});
    }

    handleSubmit(event) { 
        event.preventDefault();
        this.generateIPv4Address();
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    generateIPv4Address() {
        let map;
        if (localStorage.getItem("IPv4Addresses") !== null) {
            map = JSON.parse(localStorage.getItem("IPv4Addresses"));
        } else {
            map = new Object();
        }
        let randomAddress;
        let binaryString;
        let r = 0;
        let subnetMask = 0;
        do {
            if (this.state.classful) {
                if (this.state.classNameValue === "A") {
                    subnetMask = 24;
                    r = (this.getRandomInt(128)) << subnetMask;
                    binaryString = r.toString(2);
                    while (binaryString.length < 31)
                        binaryString = "0" + binaryString;
                    binaryString = "0" + binaryString;
                    
                } else if (this.state.classNameValue === "B") {
                    subnetMask = 16;
                    r = (this.getRandomInt(16384)) << subnetMask;
                    binaryString = r.toString(2);
                    while (binaryString.length < 30)
                        binaryString = "0" + binaryString;
                    binaryString = "10" + binaryString;
                    
                } else if (this.state.classNameValue === "C") {
                    subnetMask = 8;
                    r = (this.getRandomInt(2097152)) << subnetMask;
                    binaryString = r.toString(2);
                    while (binaryString.length < 29)
                        binaryString = "0" + binaryString;
                    binaryString = "110" + binaryString;
                } else if (this.state.classNameValue === "D")  {
                    r = (this.getRandomInt(268435456));
                    binaryString = r.toString(2);
                    while (binaryString.length < 28)
                        binaryString = "0" + binaryString;
                    binaryString = "1110" + binaryString;
                    
                } else if (this.state.classNameValue === "E") {
                    this.setState({generatedIPAddress: "Cannot assign class E addressses!"});
                    this.setState({ ipAddressInBinary: "Cannot assign class E addressses!"});
                    return;
                }
            } else {
                let numberOfHostsNeeded = this.state.numberOfHostsNeeded;
                if (numberOfHostsNeeded === 0 || numberOfHostsNeeded == "") return;
                let suffixBits = Math.ceil(Math.log2(this.state.numberOfHostsNeeded));
                subnetMask = 32 - suffixBits;
                r = this.getRandomInt(Math.pow(2, subnetMask));
                r = r << (suffixBits);
                binaryString = r.toString(2);
                if (binaryString[0] === '-') binaryString = binaryString.substr(1);
                while (binaryString.length < 32) {
                    binaryString = "0" + binaryString;
                } 
            }
            
        } while (r in map) ;
        
        map[r] = true;
        randomAddress = this.intToIPAddressString(r) + "/" + subnetMask.toString();
        this.setState({generatedIPAddress: randomAddress});
        this.setState({ipAddressInBinary: binaryString});
        
        localStorage.setItem("IPv4Addresses", JSON.stringify(map));
    }

    intToIPAddressString(ip) {
        let bytes = [4];
        bytes[3] = ip & 0xFF;
        bytes[2] = (ip >> 8) & 0xFF;
        bytes[1] = (ip >> 16) & 0xFF;
        bytes[0] = (ip >> 24) & 0xFF;
        return `${bytes[0]}.${bytes[1]}.${bytes[2]}.${bytes[3]}`; 
    }

    render() {
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <div className="form-group-row">
                        <legend className="col-form-label">classful or classless?</legend>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    checked={this.state.classful === true}
                                    onChange={e => this.handleclassNameRadioButtonChange(true)} />
                                classful
                            </label>
                        </div>
                    <div className="form-group">
                            <label htmlFor="classNameSelect">Pick addressing className</label>
                        <select className="form-control" id="classNameSelect" value={this.state.classNameValue} onChange={e => this.handleclassNameChange(e)}  disabled={!this.state.classful}>
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
                                    checked={this.state.classful === false}
                                    onChange={e => this.handleclassNameRadioButtonChange(false)} />
                                classless
                            </label>
                        </div>
                    <div className="input-group">
                        <span className="input-group-addon" id="basic-addon1">Number of hosts needed:</span>
                        <input type="number" className="form-control" placeholder="hosts.." aria-describedby="basic-addon1" disabled={this.state.classful} onChange={e=>{this.handleNumberOfHostsChange(e)}}/>
                    </div>
                    <br/>
                    <button type="submit" value="submit" className="btn btn-primary">Assign!</button>
                    </div>
                </form>
                <br/>
                <div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Your IPv4 address in decimal:</label>
                        <input className={"form-control " + style.courier} type="text" name="country" value={this.state.generatedIPAddress} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Your IPv4 address in binary:</label>
                        <input className={"form-control " + style.courier} type="text" name="country" value={this.state.ipAddressInBinary} readOnly />
                    </div>
                </div>
            </div>
        )
    }
}