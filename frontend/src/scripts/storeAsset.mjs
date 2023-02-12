import { NFTStorage, File } from "nft.storage";
import * as fs from 'fs';
// import dotenv from "dotenv";
// dotenv.config();

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGE0QTc0OTI4NGNDOEFhNGY2QjZlY2UwMWUwOUQ4NzYwQmM3MTYwMkIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NjE5Mjk0NTUzOSwibmFtZSI6IlczVGhlQ2hhbmdlIn0.ZSv6hBKMHExtpoqp2DUgA0YUJAIwHhn9aN_aEkNoJec";

async function storeAsset() {
  const client = new NFTStorage({ token: API_KEY });
  // console.log(client);
  const metadata = await client.store({
    name: "Sign Petition NFT on W3TheChange",
    description: "This NFT shows you have signed for a petition!",
    image: new File(
      [await fs.promises.readFile('image/signpetition.png')],
      "examplepetition.png",
      { type: "image/png" }
    ),
  });
  // console.log(metadata);
  console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url);
  return metadata.url;
}

// storeAsset()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
// });

export default storeAsset;

// ipfs://bafyreifnck6yo4uv2zazokivlbtuhh7cdvw4qgyhb7jct4cjxq75eh33hy/metadata.json