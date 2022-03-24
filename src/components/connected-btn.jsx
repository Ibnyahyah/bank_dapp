import { useContext } from "react";
import { Context } from "../context/context";

const ConnectBtn = ()=>{
    const {connectHandler, connect} = useContext(Context);
    return(
        <>
            <button onClick={connectHandler}>{connect?"Wallet Connected 🔒":"Connect Wallet 🔑"}</button>
        </>
    )
}
export default ConnectBtn;