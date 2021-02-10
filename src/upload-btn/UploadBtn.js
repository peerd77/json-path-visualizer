import React from "react";
import { JSONPath } from 'jsonpath-plus'

import './UploadBtn.scss'

const UploadBtn = props => {

    // On file select (from the pop up)

    const onFileChange = async event => {
        const rawText = await event.target.files[0].text();

        // Prettify json in case the raw file contains unformatted json
        const obj = JSON.parse(rawText);
        const result = JSONPath({ path: '$.store.book[*].author', json: obj })
        const selectedJsonString = JSON.stringify(result, null, 2);
        props.onJsonLoaded(selectedJsonString)
    };


        return (
            <div className="flex">
                <div>
                    <input type="file" id="fileElem" className="visually-hidden" onChange={onFileChange} />
                    <label htmlFor="fileElem">Upload a JSON</label>
                </div>
            </div>
        );
}

export default UploadBtn;

