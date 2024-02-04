function ButtonSecondary({ onClick, children, size, isDisabled}) {
    return (
      <button onClick={onClick} className={`custom-secondary-button ${size}`} disabled={ isDisabled ? isDisabled : false}>
        {children}
      </button>
    );
  }
  
  export default ButtonSecondary;