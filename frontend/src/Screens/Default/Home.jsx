import React, {useEffect, useRef, useState} from "react";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";
import { Route, Switch } from "wouter";
import Index from "../../Pages/Index";
import Navbar from "../../Components/Navbar[initial]/Navbar";
import Login from "../../Pages/Login";
import SignUp from "../../Pages/SignUp";
import StartPetition from "../../Pages/StartPetition";
import Category from "../../Pages/Category";
import Browse from "../../Pages/Browse";
import PetitionPage from "../../Pages/petitionPage";
import Profile from "../../Pages/Profile";
import Supporters from "../../Pages/Supporters";
import NotFound from "../../Pages/NotFound";
import UnAuth from "../../Pages/UnAuth";


function Home() {

//   const web3ModalRef = useRef();

// const [walletConnected, setWalletConnected] = useState(false);

// const getProviderOrSigner = async (needSigner = false) => {
//   // Connect to Metamask
//   // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
//   const provider = await web3ModalRef.current.connect();
//   const web3Provider = new providers.Web3Provider(provider);

//   // If user is not connected to the Goerli network, let them know and throw an error
//   const { chainId } = await web3Provider.getNetwork();
//   if (chainId !== 5) {
//     window.alert("Change the network to Goerli");
//     throw new Error("Change network to Goerli");
//   }
//   const signer = web3Provider.getSigner();
//   const addr = await signer.getAddress();
//     // return signer;
  
//   console.log("Providers are", addr, web3Provider)
//   // if (needSigner) {
//   //   const signer = web3Provider.getSigner();
//   //   return signer;
//   // }
//   return web3Provider;
// };


// const connectWallet = async () => {
//   try {
//     // Get the provider from web3Modal, which in our case is MetaMask
//     // When used for the first time, it prompts the user to connect their wallet
//     await getProviderOrSigner();
//     setWalletConnected(true);

//     // checkIfAddressInWhitelist();
//     // getNumberOfWhitelisted();
//   } catch (err) {
//     console.error(err);
//   }
// };

// useEffect(() => {
//   // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
//   if (!walletConnected) {
//     // Assign the Web3Modal class to the reference object by setting it's `current` value
//     // The `current` value is persisted throughout as long as this page is open
//     web3ModalRef.current = new Web3Modal({
//       network: "goerli",
//       providerOptions: {},
//       disableInjectedProvider: false,
//     });
//     connectWallet();
//   }
// }, [walletConnected]);


  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" component={Index} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/start-a-petition" component={StartPetition} />
        <Route path="/category/:id">
          {(params) => <Category id={params.id} />}
        </Route>
        <Route path="/petitions" component={Browse} />
        <Route path="/p/:id">
          {(params) => <PetitionPage id={params.id} />}
        </Route>
        <Route path="/profile/:id">
          {(params) => <Profile id={params.id} />}
        </Route>
        <Route path="/supporters/:id">
          {(params) => <Supporters id={params.id} />}
        </Route>
        <Route path="/UnAuthorized" component={UnAuth} />
        <Route path="/:rest*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default Home;
