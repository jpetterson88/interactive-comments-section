import EditIcon from "../../assets/images/icon-reply.svg?react";
import type { Comment } from "../CommentSection/types";

interface CommentBodyProps {
  comment: Comment;
}

function CommentBody({ comment }: CommentBodyProps) {
  return (
    <div className="w-145.5 h-30 flex-1">
      <div className="flex h-8 justify-between mb-200">
        <div className="flex items-center justify-between w-60.75">
          <img
            className="h-full"
            src={comment.user.image.png}
            alt={comment.user.username}
          />
          <p className="text-preset-2 text-grey-800 font-medium">
            {comment.user.username}
          </p>
          <p className="text-preset-2 text-grey-500">{comment.createdAt}</p>
        </div>
        <div className="flex justify-center items-center gap-100">
          <EditIcon />
          <p className="text-primary-purple-600 text-preset-2 font-medium">
            Reply
          </p>
        </div>
      </div>
      <div className="text-preset-2 text-grey-500">
        {comment.content}
      </div>
    </div>
  );
}

export default CommentBody;
