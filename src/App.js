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
    const [isShowModal, setIsShowModal] = useState(false);
    const [charArray, setCharArray] = useState([]);

    function isJsonPathLegalKey(key) {
        return (JSON_INPUT_CHARS.indexOf(key.toLowerCase()) !== -1);
    }

    const downHandler = (keyEvent) => {
        if (isShowModal) return;
        if(!isJsonPathLegalKey(keyEvent.key)) return;
        const newArr = [...charArray, keyEvent.key];
        console.log('up', newArr);
        setIsShowModal(true);
        setCharArray(newArr);

    }

    const upHandler = () => {

    }

    // Add event listeners
    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
        // eslint-disable-next-line
    }, []); // Empty array ensures that effect is only run on mount and unmount


    const handleJsonReady = jsonString => {
        const obj = JSON.parse(jsonString);
        const result = JSONPath({path: jsonPath, json: obj});
        setJsonString({jsonString: JSON.stringify(result, null, 2)});
    }

    const onModalApprove = jsonPathString => {
        console.log('down', charArray);
        setCharArray([]);
        setIsShowModal(false)
        setJsonPath(jsonPathString);
    }


    const onModalCancel = () => {
        //do nothing
    }

    return (
        <>
            <UploadBtn onJsonLoaded={handleJsonReady}/>
            <JsonViewer jsonString={jsonString}/>
            <JsonPathModalInput
                showModal={isShowModal}
                onModalApprove={onModalApprove}
                onModalCancel={onModalCancel}
            />
        </>

    );
}




export default App;
