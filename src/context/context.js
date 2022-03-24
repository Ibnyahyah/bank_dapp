import { createContext, useEffect, useState } from "react";
import { ethers, utils } from "ethers";
import abi from "../contracts/Bank.json";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [connect, setConnect] = useState(false);
  const [customerAddress, setCustomerAddress] = useState(null);
  const [bankOwner, setBankOwner] = useState(false);
  const [inputValue, setInputValue] = useState({
    withdraw: "",
    deposit: "",
    bankName: "",
  });
  const [accountOwner, setAccountOwner] = useState(null);
  const [accountBalance, setAccountBalance] = useState(null);
  const [currentBankName, setCurrentBankName] = useState(null);
  const [error, setError] = useState(null);

  const contractAddress = "0x0918700Dd458b3573cb7207063f91219Af88e209";
  const contractABI = abi.abi;

  const connectHandler = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setConnect(true);
        setCustomerAddress(account);
        console.log(account, "connected to metamask");
      } else {
        setError("Please Install a Metamask Wallet to use the Bank");
        console.log("No metamask detected");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getBankName = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const bankContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let bankName = await bankContract.bankName();
        bankName = utils.parseBytes32String(bankName);
        setCurrentBankName(bankName.toString());
      } else {
        setError("Please Install a Metamask Wallet to use the Bank");
        console.log("No metamask detected");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const setBankNameHandler = async (e) => {
    e.preventDefault();
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const bankContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const txn = await bankContract.setBankName(
          utils.formatBytes32String(inputValue.bankName)
        );
        console.log("Setting Bank Name ...");
        await txn.wait();
        console.log("Bnak Name was Change", txn);
        await getBankName();
      } else {
        setError("Please Install a Metamask Wallet to use the Bank");
        console.log("No metamask detected");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getbankOwnerHandler = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const bankContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let owner = await bankContract.bankOwner();
        setAccountOwner(owner);

        const [account] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        if (owner.toLowerCase() === account.toLowerCase()) {
          setBankOwner(true);
        }
      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const customerBalanceHandler = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const bankContract = new ethers.Contract(contractAddress, contractABI, signer);

        let balance = await bankContract.getCustomerBalance();
        setAccountBalance(utils.formatEther(balance));
        console.log("Retrieved balance...", balance);

      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error)
    }
  }

    const deposityMoneyHandler = async (event) => {
        try {
        event.preventDefault();
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const bankContract = new ethers.Contract(contractAddress, contractABI, signer);

        const txn = await bankContract.depositMoney({ value: ethers.utils.parseEther(inputValue.deposit) });
        console.log("Deposting money...");
        await txn.wait();
        console.log("Deposited money...done", txn.hash);

        customerBalanceHandler();

      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error)
    }
  }

    const withDrawMoneyHandler = async (event) => {
    try {
      event.preventDefault();
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const bankContract = new ethers.Contract(contractAddress, contractABI, signer);

        let myAddress = await signer.getAddress()
        console.log("provider signer...", myAddress);

        const txn = await bankContract.withDrawMoney(myAddress, ethers.utils.parseEther(inputValue.withdraw));
        console.log("Withdrawing money...");
        await txn.wait();
        console.log("Money with drew...done", txn.hash);

        customerBalanceHandler();

      } else {
        console.log("Ethereum object not found, install Metamask.");
        setError("Please install a MetaMask wallet to use our bank.");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleInputChange = (event) => {
    setInputValue(prevFormData => ({ ...prevFormData, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    connectHandler();
    getBankName();
    getbankOwnerHandler();
    customerBalanceHandler();
  }, [connect]);
    

  const value = {
    connectHandler: connectHandler,
    connect: connect,
    customerAddress: customerAddress,
    error: error,
    bankOwner: bankOwner,
    currentBankName: currentBankName,
    setBankNameHandler: setBankNameHandler,
    inputValue: inputValue,
    accountOwner: accountOwner,
    getbankOwnerHandler:getbankOwnerHandler,
    handleInputChange:handleInputChange,
    accountBalance:accountBalance,
    deposityMoneyHandler:deposityMoneyHandler,
    withDrawMoneyHandler:withDrawMoneyHandler,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
