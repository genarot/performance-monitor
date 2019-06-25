import React from 'react';
import './App.css';
import socket from './utilities/socketConnections';
import Widget from "./components/widget/component";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            performData: {}
        }
    }

    componentDidMount() {
        socket.on('data', (data) => {
            // inside this callback, we just got some new data
            // let's update the state, so we can re-render App -> Widget ->CPU, Info, Mem
            // we need to make a copy of our state
            // so we can mutate it
            const currentState = {...this.state.performData};
            // current state is an objec, not an array
            // the reason for this is so we can use the machine's
            // macA as it's property
            currentState[data.macA] = data;
            // console.log(data)
            this.setState({
                performData: currentState
            })
        })
    }

    render() {
        console.log(this.state.performData);
        let widgets = [];
        const data = this.state.performData;
        // grab each machine, by propert, from data
        Object.entries(data).forEach(([key, value]) => {
            widgets.push(<Widget key={key} data={value}/>)
        });
        return (
            <div className="App container fluid">
                <div className="row justify-content-md-center">
                    {widgets}
                </div>
            </div>
        );
    }
}

export default App;
