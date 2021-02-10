import React from "react";

import './JsonViewer.scss';

const JsonViewer = props => {
    return (
        <pre className="json-container">
            {props.jsonString}
        </pre>
    );

}

export default JsonViewer;
