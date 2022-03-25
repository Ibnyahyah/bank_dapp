import { useContext } from "react";
import ConnectBtn from "./components/connected-btn";
import Deposit from "./components/deposit";
import Withdraw from "./components/withdraw";
import { ShortenAddress } from './utils/shorten'
import { Context } from "./context/context.js";

const Main = () => {
  const {
    customerAddress,
    currentBankName,
    bankOwner,
    handleInputChange,
    inputValue,
    setBankNameHandler,
    accountBalance,
    bankOwnerAddress,
    error
  
  } = useContext(Context);
  return (
    <>
      <div className="container display-f align-center">
        <div className="card">
          <header className="font-3 font-md text-black mb-1">
            <h1>IBNBank Contract Project 💰</h1>
          </header>
          <p className="text-center text-red font-3">{error}</p>
          <div>
            {currentBankName === "" && bankOwner ? (
              <p>"Setup the name of your bank." </p>
            ) : (
              <p className="text-3xl font-bold">{currentBankName}</p>
            )}
            <Deposit />
            <Withdraw />
          </div>
          <div>
            <p className="font-3 font-md mt-2">Your Account Balance: {accountBalance}</p>
            <p className="font-3 font-md mt-1">Bank Owner Address: {bankOwnerAddress}</p>
            <p className="font-3 font-md mt-1 mb-1">
              Your Bank Wallet Address: {customerAddress}
            </p>
          </div>
          <ConnectBtn />
        {bankOwner && (
          <div className="mt-3">
            <h2 className="text-center mb-1">Admin Panel</h2>
            <div>
              <form>
                <input
                  type="text"
                  onChange={handleInputChange}
                  name="bankName"
                  placeholder="Enter a Name for Your Bank"
                  value={inputValue.bankName}
                />
                <button className="btn-grey" onClick={setBankNameHandler}>
                  Set Bank Name
                </button>
              </form>
            </div>
          </div>
        )}
        </div>
      </div>
    </>
  );
};
export default Main;
