import VoteButtons from "../VoteButtons/VoteButtons";
import CommentBody from "../CommentBody/CommentBody";
import type { Comment } from "../CommentSection/types";

interface CommentContainerProps {
  comment: Comment;
}

function CommentContainer({ comment }: CommentContainerProps) {
  return (
    <div className="rounded-lg w-182.5 h-41.75 flex justify-center items-center bg-white">
      <div className="w-170.5 h-30 flex gap-300">
        <VoteButtons comment={comment} />
        <CommentBody comment={comment} />
      </div>
    </div>
  );
}

export default CommentContainer;
