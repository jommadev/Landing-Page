function ButtonGame({ onClick, children, size, isDisabled = false }) {
    //console.log('isDisabled:', typeof(isDisabled));
    return (
      <button  onClick={onClick} className={`custom-game-button ${size}`}>
        {children}
      </button>
    );
  }
  
  export default ButtonGame;
  