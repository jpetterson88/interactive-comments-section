import VoteButtons from "../VoteButtons/VoteButtons";
import CommentBody from "../CommentBody/CommentBody";
import type { User, Comment } from "../CommentSection/types";

interface ContainerContentProps {
  comment: Comment;
  currentUser: User;
  onReply: () => void;
}

function ContainerContent({ comment, currentUser, onReply }: ContainerContentProps) {
  return (
    <div className="max-w-170.5 flex-1 flex gap-300">
      <VoteButtons comment={comment} />
      <CommentBody comment={comment} currentUser={currentUser} onReply={onReply} />
    </div>
  );
}

export default ContainerContent;