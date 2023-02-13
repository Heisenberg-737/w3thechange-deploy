const CONTRACT_ADDRESS = "0xE0ac88897a6b3137e561B79B5573222c7F4EF35F";
const META_DATA_URL = "ipfs://bafyreifnck6yo4uv2zazokivlbtuhh7cdvw4qgyhb7jct4cjxq75eh33hy/metadata.json";

async function mintNFT() {
  const ExampleNFT = await ethers.getContractFactory("PetitionNFT");
  const [owner] = await ethers.getSigners();
  await ExampleNFT.attach("0xE0ac88897a6b3137e561B79B5573222c7F4EF35F").mintNFT(owner.address, "ipfs://bafyreifnck6yo4uv2zazokivlbtuhh7cdvw4qgyhb7jct4cjxq75eh33hy/metadata.json");
  console.log("NFT minted to: ", owner.address);
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

export default mintNFT;
