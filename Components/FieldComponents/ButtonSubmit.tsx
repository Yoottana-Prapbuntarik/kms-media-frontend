const ButtonSubmit = ({ input, label, disable, type, style }: any) => {
    return (
      <input
        {...input}
        disabled={disable}
        className={style}
        type={type}
        name={label}
        value={label}
      />
    )
  }
  
  export default ButtonSubmit
