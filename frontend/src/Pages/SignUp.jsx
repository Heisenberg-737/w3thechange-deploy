// import React from "react";
import { Link } from "wouter";
import { Formik } from "formik";
import RegisterSchema from "../Schema/Register";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../Redux/Register/action";
import React, {useEffect, useRef, useState} from "react";
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";

function SignUp() {

const web3ModalRef = useRef();

const [walletConnected, setWalletConnected] = useState(false);
const [walletAddress, setWalletAddress] = useState("");


const getProviderOrSigner = async (needSigner = false) => {
  // Connect to Metamask
  // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
  const provider = await web3ModalRef.current.connect();
  const web3Provider = new providers.Web3Provider(provider);

  // If user is not connected to the Polygon network, let them know and throw an error
  const { chainId } = await web3Provider.getNetwork();
  if (chainId !== 80001) {
    window.alert("Change the network to Polygon");
    throw new Error("Change network to Polygon");
  }
  const signer = web3Provider.getSigner();
  const addr = await signer.getAddress();
    // return signer;
  console.log(addr);
  setWalletAddress(addr)
  // console.log("Providers are", addr, web3Provider)
  // if (needSigner) {
  //   const signer = web3Provider.getSigner();
  //   return signer;
  // }
  return web3Provider;
};

async function isConnected() {
  console.log("Isconnected called")
  const accounts = await window.ethereum.request({method: 'eth_accounts'});       
  if (accounts.length) {
     console.log(`You're connected to: ${accounts[0]}`);
     setWalletConnected(true);
  } else {
     console.log("Metamask is not connected");
     setWalletConnected(false);

  }
}
const connectWallet = async () => {
  try {
    // Get the provider from web3Modal, which in our case is MetaMask
    // When used for the first time, it prompts the user to connect their wallet
    await getProviderOrSigner();
    setWalletConnected(true);

    // checkIfAddressInWhitelist();
    // getNumberOfWhitelisted();
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
  if (!walletConnected) {
    // Assign the Web3Modal class to the reference object by setting it's `current` value
    // The `current` value is persisted throughout as long as this page is open
    web3ModalRef.current = new Web3Modal({
      network: "Polygon",
      providerOptions: {},
      disableInjectedProvider: false,
    });
    connectWallet();
  }
  isConnected();
}, [walletConnected]);


  window.document.title = "Change - SignUp";
  const state = useSelector((state) => state.register);
  const dispatch = useDispatch();

  if (state.status) {
    window.location.href = "/login";
  }

  return (
    <div className="container mt-5">
      {state.error && (
        <div className="alert alert-danger" role="alert">
          {state.error}
        </div>
      )}
      <div className="row ">
        <div className=" col-md-6 offset-md-3">
        {walletConnected?<h3 className="alert alert-primary">Wallet Connected!</h3>:<></>}
          <h1 className="mb-4 rubik">SignUp</h1>

          <div className="form">
            <Formik
              initialValues={{
                email: "",
                password: "",
                userName: "",
                description: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={(values, { setSubmitting }) => {
                dispatch(registerAction({...values, walletConnected, walletAddress}));
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      type="text"
                      name="userName"
                      value={values.userName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control ${
                        errors.userName ? "border-danger" : null
                      }`}
                    />
                    <div className="form-label text-danger">
                      {errors.userName && touched.userName && errors.userName}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Wallet address</label>
                    <input
                      // type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control ${
                        errors.email ? "border-danger" : null
                      }`}
                    />
                    <div className="form-label text-danger">
                      {errors.email && touched.email && errors.email}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control ${
                        errors.password && "border-danger"
                      }`}
                    />
                    <div className="form-label text-danger">
                      {errors.password && touched.password && errors.password}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-danger btn_red"
                    disabled={state.error ? false : isSubmitting}
                  >
                    <strong>{state.loading ? "Loading..." : "Login"}</strong>
                  </button>
                </form>
              )}
            </Formik>

            <Link href="/login">
              <a className="redColor mt-3 d-block">
                Already have an account? Login Now
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
