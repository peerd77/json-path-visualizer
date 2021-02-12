import React from "react";
import Modal from "react-bootstrap/Modal";

const JsonPathModalInput = props => {

    return (
        <>
            <Modal
                show={props.charBuffer.length > 0}
                backdrop="static"
                centered={true}
                size='lg'
            >
                <Modal.Body className='string-container'>
                    {props.charBuffer}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default JsonPathModalInput;
