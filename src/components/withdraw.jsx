import { useContext } from "react";
import { Context } from "../context/context";

const Withdraw = ()=>{
    const {deposityMoneyHandler, inputValue, handleInputChange} = useContext(Context)
    return(
        <>
            <form>
                <input type="text" placeholder="0.0000 ETH" name="withdraw" onChange={handleInputChange} value={inputValue.withdraw}/>
                <button onClick={deposityMoneyHandler}>WITHDRAW MONEY IN ETH</button>
            </form>
        </>
    )
}
export default Withdraw;