import React, {useEffect, useState} from 'react';
import UploadBtn from './upload-btn/UploadBtn';
import './App.scss';
import {JSONPath} from "jsonpath-plus";
import JsonPathModalInput from "./json-path-modal-input/JsonPathModalInput";
import ReactJson from "react-json-view";



const App = () => {

    const LETTER_NUMBERS = (() => {
        const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
        return caps.concat(caps.map(letter => letter.toLowerCase()), '0123456789'.split(''));
    })();

    const JSON_INPUT_CHARS = LETTER_NUMBERS.concat('$@.[]*,:()\'?<>='.split(''));



    const [originalJsonString, setOriginalJsonString] = useState(null);
    const [viewJson, setViewJson] = useState(null);
    const [jsonPathString, setJsonPathString] = useState('');
    const [showJsonPathModal, setShowJsonPathModal] = useState(false)

    const isJsonPathLegalKey = key => {
        return (JSON_INPUT_CHARS.indexOf(key.toLowerCase()) !== -1);
    }

    const handleJsonPathReady = jsonPathString => {
        const obj = JSON.parse(originalJsonString);
        const result = JSONPath({path: jsonPathString, json: obj});
        setViewJson(result);
    }

    const downHandler = (keyEvent) => {

        if(!originalJsonString) return;

        //if enter - act like approve
        if (keyEvent.keyCode === 13) {
            handleJsonPathReady(jsonPathString);
            setShowJsonPathModal(false);
            return;
        }

        //if esc - act like toggle
        if (keyEvent.keyCode === 27) {
            setShowJsonPathModal(prevState => !prevState);
            return;
        }

        if(isJsonPathLegalKey(keyEvent.key))
            setShowJsonPathModal(true);


    }

    // Add event listeners
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', downHandler);
        };
    });

    const handleJsonLoaded = jsonString => {
        setOriginalJsonString(jsonString);
        setViewJson(JSON.parse(jsonString));
    }

    const onJsonPathInputChange = event => {
        setJsonPathString(event.target.value);
    };

    const renderReactJson = () => {
        return viewJson ? <ReactJson src={viewJson} theme={'monokai'}/> : '';
    }

    return (
        <>
            <UploadBtn onJsonLoaded={handleJsonLoaded}/>
            {renderReactJson()}
            <JsonPathModalInput
                value={jsonPathString}
                show={showJsonPathModal}
                onChange={onJsonPathInputChange}
            />
        </>

    );
}




export default App;
