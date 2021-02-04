import React,{Component} from 'react';
class App extends Component {

    state = {

        // Initially, no file is selected
        selectedFile: null
    };

    // On file select (from the pop up)

    onFileChange = async event => {
        debugger;
        // Update the state
        const selectedFile = await event.target.files[0].text();
        this.setState({ selectedFile });
    };


    // File content to be displayed after
    // file upload is complete
    fileData = () => {
        if (this.state.selectedFile) {

            return (
                <div>
                    {this.state.selectedFile}
                </div>
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
