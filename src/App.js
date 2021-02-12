import React, {useEffect, useState} from 'react';
import UploadBtn from './upload-btn/UploadBtn';
import JsonViewer from "./json-viewer/JsonViewer";
import './App.scss';
import {JSONPath} from "jsonpath-plus";
import JsonPathModalInput from "./json-path-modal-input/JsonPathModalInput";



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
        setViewJson(JSON.stringify(result, null, 2));
    }

    const downHandler = (keyEvent) => {

        if(!originalJsonString) return;

        //if enter - act like approve
        if (keyEvent.keyCode === 13) {
            handleJsonPathReady(jsonPathString);
            setShowJsonPathModal(false);
            return;
        }

        //if esc - act like cancel
        if (keyEvent.keyCode === 27) {
            setShowJsonPathModal(false);
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
        setViewJson(jsonString);
    }

    const onJsonPathInputChange = event => {
        setJsonPathString(event.target.value);
    };

    return (
        <>
            <UploadBtn onJsonLoaded={handleJsonLoaded}/>
            <JsonViewer jsonString={viewJson}/>
            <JsonPathModalInput
                value={jsonPathString}
                show={showJsonPathModal}
                onChange={onJsonPathInputChange}
            />
        </>

    );
}




export default App;
