import React from 'react';


export default function TextInput(props) {
    return (
        <div className={props.className}>
            <label
                className="mr-auto ml-1"
                htmlFor={props.id}
            >
                {props.name}
            </label>
            <input
                readOnly={props.readOnly}
                className="border-orange-500 border-2 w-56 ml-1 mt-2"
                id={props.id} onChange={props.handleChange} value={props.value}
            />
        </div>
    );
}
/*
    properties ::
        className     :: style of input
        id , htmlFor  :: choose a id for input
        name          :: name of input
        handleChange  :: this function runs when ever input changes
        value         :: value of input
*/