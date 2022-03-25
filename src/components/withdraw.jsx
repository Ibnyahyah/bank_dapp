import { useContext } from "react";
import { Context } from "../context/context";

const Withdraw = ()=>{
    const {withDrawMoneyHandler, inputValue, handleInputChange} = useContext(Context)
    return(
        <>
            <form>
                <input type="text" placeholder="0.0000 ETH" name="withdraw" onChange={handleInputChange} value={inputValue.withdraw}/>
                <button onClick={withDrawMoneyHandler}>WITHDRAW MONEY IN ETH</button>
            </form>
        </>
    )
}
export default Withdraw;