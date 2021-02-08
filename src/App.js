import React,{Component} from 'react';
import {JSONPath} from 'jsonpath-plus'

import './App.css'
class App extends Component {

    state = {

        // Initially, no file is selected
        selectedFile: null
    };

    // On file select (from the pop up)
    
    onFileChange = async event => {

        const rawText = await event.target.files[0].text();

        // Prettify json in case the raw file contains unformatted json
        const obj = JSON.parse(rawText);
        const result = JSONPath({path: '$.store.book[*].author', json: obj})
        const selectedFile = JSON.stringify(result, null, 2);
        this.setState({ selectedFile });
    };


    // Json content to be displayed after
    // file upload is complete
    fileData = () => {
        if (this.state.selectedFile) {

            return (
                <pre className="json-container">
                    {this.state.selectedFile}
                </pre>
            );
        }
    };

    render() {
        return (
            <div className="flex">
                <div>
                    <input type="file" id="fileElem" className="visually-hidden" onChange={this.onFileChange} />
                    <label htmlFor="fileElem">Upload a JSON</label>
                </div> 
                {this.fileData()}
            </div>
        );
    }
}

export default App;
