const TextAreaField = ({ input, disabled, label, rows, currentValue, type, className, styleTextError, name, meta: { touched, error } }: any) => {
    return (
        <div>
            <textarea {...input} disabled={disabled} placeholder={label} type={type}
                name={name} className={className}

                rows={rows}
            />
            <p className={`${styleTextError} text-left`}>{touched && error && <span>{error}</span>}</p>
        </div>
    )
}

export default TextAreaField
