function ButtonPrimary({ onClick, onKeyDown, children, size, isDisabled }) {
  //console.log('isDisabled:', typeof(isDisabled));
  return (
    <button  onClick={onClick} onKeyDown={onKeyDown} className={`custom-primary-button ${size}`} disabled={ isDisabled ? isDisabled : false}>
      {children}
    </button>
  );
}

export default ButtonPrimary;
