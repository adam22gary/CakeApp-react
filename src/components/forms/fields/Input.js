import React from "react";

const Input = (props) => {
    return (
        <>
            <input {...props.input} type={props.type} />
            <span>{props.meta.touched && props.meta.error}</span>
        </>
    )
}

export default Input;