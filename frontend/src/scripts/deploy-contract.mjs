async function deployContract() {
    const PetitionNFT = await ethers.getContractFactory("PetitionNFT")
    const exampleNFT = await PetitionNFT.deploy()
    await exampleNFT.deployed()
    // This solves the bug in Mumbai network where the contract address is not the real one
    const txHash = exampleNFT.deployTransaction.hash
    const txReceipt = await ethers.provider.waitForTransaction(txHash)
    const contractAddress = txReceipt.contractAddress
    console.log("Contract deployed to address:", contractAddress)
   }
   
   deployContract()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });