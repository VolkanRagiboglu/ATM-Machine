const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ["Deposit", "Cash Back"];
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <div className="center-container">
      <label className="label huge">
        {isDeposit && (
          <>
            <h3>Deposit</h3>
            <input id="number-input" type="number" onChange={onChange}></input>
          </>
        )}
        {!isDeposit && (
          <>
            <h3>Cash Back</h3>
            <input
              id="number-input"
              type="number"
              onChange={onChange}
              min="1"
            ></input>
          </>
        )}
        <input
          type="submit"
          disabled={!isValid}
          value="Submit"
          id="submit-input"
          className={`submit-button ${isValid ? "active" : ""}`} // Add conditional class based on isValid
        ></input>
        {!isValid && <p>Invalid transaction. Please check the amount.</p>}
      </label>
    </div>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(false); // Default to "Cash Back"
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    console.log(Number(event.target.value));
    if (Number(event.target.value) <= 0) {
      return setValidTransaction(false);
    }
    if (!isDeposit && Number(event.target.value) > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));
  };

  const handleSubmit = (event) => {
    if (!validTransaction) {
      event.preventDefault();
      return;
    }
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    console.log(event.target.value);
    setAtmMode(event.target.value);
    setValidTransaction(false);
    setIsDeposit(event.target.value === "Deposit");
  };

  return (
    <form onSubmit={handleSubmit}>
      <>
        <div id="form-container">
          <h1>
            <label>ATM Machine</label>
          </h1>
          <h2 id="total">{status}</h2>
          <label>Select an action below to continue</label>
          <div>
            <select
              onChange={(e) => handleModeSelect(e)}
              name="mode"
              id="mode-select"
            >
              <option id="no-selection" value=""></option>
              <option id="deposit-selection" value="Deposit">
                Deposit
              </option>
              <option id="cashback-selection" value="Cash Back">
                Cash Back
              </option>
            </select>
          </div>
          {atmMode && (
            <ATMDeposit
              onChange={handleChange}
              isDeposit={isDeposit}
              isValid={validTransaction}
            ></ATMDeposit>
          )}
        </div>
      </>
    </form>
  );
};

// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
