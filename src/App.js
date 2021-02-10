import React, {Component, Fragment} from 'react';
import UploadBtn from './upload-btn/UploadBtn';
import JsonViewer from "./json-viewer/JsonViewer";
import './App.scss';

class App extends Component {

    state = {
        jsonString: null
    };


    render() {
        return (
            <Fragment>
                <UploadBtn onJsonLoaded={jsonString => this.handleJsonReady(jsonString)}/>
                <JsonViewer jsonString={this.state.jsonString}/>
            </Fragment>

        );
    }

    handleJsonReady(jsonString) {
        this.setState({jsonString})
    }
}

export default App;
