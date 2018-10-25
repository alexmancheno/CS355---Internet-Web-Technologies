import React from 'react';
import autoBind from 'react-autobind';

export default class UserInput extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            classful: true,
            classValue: "A"
        }
    }

    handleClassChange(event) {
        this.setState({classValue: event.target.value})
        console.log("classValue: " + this.state.classValue);
    }

    handleClassRadioButtonChange(classful) {
        this.setState({classful: classful});
    }

    handleSubmit(event) { 
        event.preventDefault();

    }

    getIPv4TabContent() {
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <div className="form-group-row">
                        <legend class="col-form-label col-sm-2 pt-0">Classful or classless?</legend>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    checked={this.state.classful === true}
                                    onChange={e => this.handleClassRadioButtonChange(true)} />
                                Classful
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                                <input type="radio"
                                    checked={this.state.classful === false}
                                    onChange={e => this.handleClassRadioButtonChange(false)}/>
                                Classless
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="classSelect">Pick addressing class</label>
                        <select className="form-control" id="classSelect" value={this.state.classValue} onChange={e => this.handleClassChange(e)} >
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                        </select>
                    </div>
                    <button type="submit" value="submit" className="btn btn-primary">Assign!</button>
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