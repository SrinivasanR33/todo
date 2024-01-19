import React from 'react'
import "./field.css"
const Field = ({
    label,
    value,
    onChange,
    type,
    placeholder, ...props
}) => {
    return (
        <div className="form-control w-full max-w-xs">
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="input input-bordered w-full max-w-xs input-sm"
                {...props}
            />
        </div>
    );
};

export default Field