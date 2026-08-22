import VoteButtons from "../VoteButtons/VoteButtons";
import CommentBody from "../CommentBody/CommentBody";
import type { Comment } from "../CommentSection/types";

interface ContainerContentProps {
  comment: Comment;
  onReply: () => void;
}

function ContainerContent({ comment, onReply }: ContainerContentProps) {
  return (
    <div className="max-w-170.5 flex-1 flex gap-300">
      <VoteButtons comment={comment} />
      <CommentBody comment={comment} onReply={onReply} />
    </div>
  );
}

export default ContainerContent;