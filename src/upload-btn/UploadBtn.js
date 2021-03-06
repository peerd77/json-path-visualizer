import React from "react";

import './UploadBtn.scss'

const UploadBtn = props => {

    // On file select (from the pop up)

    const onFileChange = async event => {
        props.onFileReadStatusChange(true)
        if (event.target.files[0]) {
            const rawText = await event.target.files[0].text();
            props.onJsonLoaded(rawText)
        }
        props.onFileReadStatusChange(false);

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

