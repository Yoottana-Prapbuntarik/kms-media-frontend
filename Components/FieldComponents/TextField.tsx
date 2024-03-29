const TextField = ({ input, disabled, label, min, type, className, styleTextError, name, meta: { touched, error } }: any) => {  
    return (
      <div>
        <input {...input}  disabled={disabled} min={min} placeholder={label} type={type} 
         name={name} className={className} />
        <p className={`${styleTextError} text-left`}>{touched && error && <span>{error}</span>}</p>
      </div>
    )
  }
  
  export default TextField
