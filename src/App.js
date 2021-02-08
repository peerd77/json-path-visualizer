import React,{Component} from 'react';
import {JSONPath} from 'jsonpath-plus'
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
                <pre>
                    {this.state.selectedFile}
                </pre>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose a json</h4>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                <div>
                <input type="file" onChange={this.onFileChange} />
                </div>
                {this.fileData()}
            </div>
        );
    }
}

export default App;
