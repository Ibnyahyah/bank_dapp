import {useContext} from "react";
import {Context} from "../context/context";

const Deposit = ()=>{
    const {deposityMoneyHandler, inputValue, handleInputChange} = useContext(Context)
    return(
        <>
            <form>
                <input type="number" name="deposit" placeholder="0.0000 ETH" onChange={handleInputChange} value={inputValue.deposit}/>
                <button onClick={deposityMoneyHandler}>DEPOSIT MONEY IN ETH</button>
            </form>
        </>
    )
}
export default Deposit;