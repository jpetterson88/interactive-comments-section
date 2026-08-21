import VoteButtons from "../VoteButtons/VoteButtons";
import CommentBody from "../CommentBody/CommentBody";
import type { Comment } from "../CommentSection/types";

interface CommentContainerProps {
  comment: Comment;
  style?: string;
}

function CommentContainer({ comment, style }: CommentContainerProps) {
  return (
    <div className={`rounded-lg w-full h-41.75 flex justify-center items-center bg-white  ${style} px-[24px]`}>
      <div className="max-w-170.5 flex-1 h-30 flex gap-300">
        <VoteButtons comment={comment} />
        <CommentBody comment={comment} />
      </div>
    </div>
  );
}

export default CommentContainer;
