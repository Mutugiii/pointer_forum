import { useMutation } from "react-query";
import useCommentsContract from "./useCommentContract";

interface UseAddCommentPayload {
  topic: string;
  message: string;
}

const useAddComment = () => {
  const contract = useCommentsContract();

  return useMutation(async ({ topic, message }: UseAddCommentPayload) => {
    await contract.addComments(topic, message);
  });
};

export default useAddComment;