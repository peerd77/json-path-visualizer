import React from "react";

import './JsonViewer.scss';

const jsonViewer = props => {
    return (
        <pre className="json-container">
            {props.jsonString}
        </pre>
    );

}

export default jsonViewer;
