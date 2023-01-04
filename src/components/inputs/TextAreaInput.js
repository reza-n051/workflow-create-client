import React from 'react';

export default function TextAreaInput(props){
    return(
        <div className={props.className}>
            <label
                className="mr-auto ml-1"
                htmlFor={props.id}
            >
                {props.name}
            </label>
            <textarea
                className="border-orange-500 border-2 w-11/12 h-full ml-1"
                id={props.id} onChange={props.handleChange} value={props.value}
            >0</textarea>
        </div>
    );
}
