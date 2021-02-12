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

    const JSON_INPUT_CHARS = LETTER_NUMBERS.concat('$@.[]*,:()'.split(''));



    const [originalJsonString, setOriginalJsonString] = useState(null);
    const [viewJson, setViewJson] = useState(null);
    const [charBuffer, setCharBuffer] = useState([]);

    const isJsonPathLegalKey = key => {
        return (JSON_INPUT_CHARS.indexOf(key.toLowerCase()) !== -1);
    }

    const handleJsonPathReady = jsonPath => {
        const obj = JSON.parse(originalJsonString);
        const result = JSONPath({path: jsonPath, json: obj});
        setViewJson(JSON.stringify(result, null, 2));
    }

    const downHandler = (keyEvent) => {

        if(!originalJsonString) return;

        //if backspace - remove last char
        if (keyEvent.keyCode === 8) {
            setCharBuffer(prevState => prevState.slice(0,-1));
            return;
        }

        //if enter - act like approve
        if (keyEvent.keyCode === 13) {
            handleJsonPathReady(charBuffer.join(''));
            setCharBuffer([]);
            return;
        }

        //if esc - act like cancel
        if (keyEvent.keyCode === 27) {
            setCharBuffer([]);
            return;
        }

        if(!isJsonPathLegalKey(keyEvent.key)) return;

        setCharBuffer(prevState => [...prevState, keyEvent.key]);

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

    return (
        <>
            <UploadBtn onJsonLoaded={handleJsonLoaded}/>
            <JsonViewer jsonString={viewJson}/>
            <JsonPathModalInput charBuffer={charBuffer}/>
        </>

    );
}




export default App;
