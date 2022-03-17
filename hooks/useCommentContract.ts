import * as wagmi from "wagmi";
import { useProvider, useSigner } from "wagmi";
import type { BigNumber } from "ethers";
// Import contract ABI
import CommentsContract from "../artifacts/contracts/Comments.sol/Comments.json";

export interface Comment {
  id: string;
  topic: string;
  message: string;
  creator_address: string;
  created_at: BigNumber;
}

export enum EventType {
  CommentAdded = "CommentAdded",
}

const useCommentsContract = () => {
  const [signer] = useSigner();
  // Same one passed to WagmiProvider
  const provider = useProvider();

  const contract = wagmi.useContract({
    addressOrName: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    contractInterface: CommentsContract.abi,
    signerOrProvider: signer.data || provider,
  })

  const getComments = async (topic: string): Promise<Comment[]> => {
    return contract.getComments(topic).then((comments) => {
      // Each comment is represented as array by default so it is converted to an object
      return comments.map((c) => ({ ...c }));
    });
  };

  const addComments =async (topic: string, message: string): Promise<void> => {
    const tx = await contract.addComments(topic, message)    ;
    await tx.wait();
  };

  return {
    contract,
    chainId: contract.provider.network?.chainId,
    getComments,
    addComments,
  };
};

export default useCommentsContract;
