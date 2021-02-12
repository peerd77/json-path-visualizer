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



    const [jsonString, setJsonString] = useState(null);
    const [jsonPath, setJsonPath] = useState(null);
    const [charBuffer, setCharBuffer] = useState([]);

    const isJsonPathLegalKey = key => {
        return (JSON_INPUT_CHARS.indexOf(key.toLowerCase()) !== -1);
    }

    const downHandler = (keyEvent) => {

        if(!jsonString) return;

        //if backspace - remove last char
        if (keyEvent.keyCode === 8) {
            setCharBuffer(prevState => prevState.slice(0,-1));
            return;
        }

        //if enter - act like approve
        if (keyEvent.keyCode === 13) {
            setJsonPath(charBuffer.join(''));
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
    }, [jsonString, charBuffer]);


    const handleJsonReady = jsonString => {
        if (!jsonPath) {
            setJsonString(prevState => {
                console.log(prevState);
                return jsonString;
            });
            return;
        }
        const obj = JSON.parse(jsonString);
        const result = JSONPath({path: jsonPath, json: obj});
        setJsonString(JSON.stringify(result, null, 2));

    }

    return (
        <>
            <UploadBtn onJsonLoaded={handleJsonReady}/>
            <JsonViewer jsonString={jsonString}/>
            <JsonPathModalInput charBuffer={charBuffer}/>
        </>

    );
}




export default App;
