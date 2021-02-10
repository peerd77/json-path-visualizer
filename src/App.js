import React, {Component, Fragment} from 'react';
import UploadBtn from './upload-btn/UploadBtn';
import JsonViewer from "./json-viewer/JsonViewer";
import './App.scss';
import {JSONPath} from "jsonpath-plus";

class App extends Component {

    state = {
        jsonString: null,
        jsonPath: '$.store.book[*].author',
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
        const obj = JSON.parse(jsonString);
        const result = JSONPath({ path: this.state.jsonPath, json: obj });
        this.setState({jsonString: JSON.stringify(result, null, 2)});
    }
}

export default App;
