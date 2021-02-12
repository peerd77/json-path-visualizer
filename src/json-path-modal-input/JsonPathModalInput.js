import Modal from "react-bootstrap/Modal";
import './JsonPathModalInput.scss';
import {useEffect, useRef} from "react";

const JsonPathModalInput = props => {

    const inputEl = useRef();

    useEffect(() => {
        if(inputEl.current)
            inputEl.current.focus();
    })

    return (
        <>
            <Modal
                show={props.show}
                backdrop="static"
                centered={true}
                size='lg'
            >
                <Modal.Body className='string-container'>
                    <input
                        type="text"
                        value={props.value}
                        onChange={props.onChange}
                        ref={inputEl}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default JsonPathModalInput;
