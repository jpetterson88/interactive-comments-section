import ReplyIcon from "../../assets/images/icon-reply.svg?react";
import TrashIcon from "../../assets/images/icon-delete.svg?react";
import EditIcon from "../../assets/images/icon-edit.svg?react";
import type { User, Comment } from "../CommentSection/types";

interface CommentBodyProps {
  comment: Comment;
  currentUser: User;
  onReply: () => void;
}

function CommentBody({ comment, currentUser, onReply }: CommentBodyProps) {
  return (
    <div className="flex-1">
      <div className="flex h-8 justify-between mb-200">
        <div className="flex items-center justify-between gap-200 ">
          <img
            className="h-full"
            src={comment.user.image.png}
            alt={comment.user.username}
          />
          <p className="text-preset-2 text-grey-800 font-medium flex items-center gap-100">
            {comment.user.username}
            {currentUser.username === comment.user.username ? <div className="bg-primary-purple-600 text-white text-preset-3 font-medium rounded-xs w-9 h-4.75 flex items-center justify-center">you</div> : null}
          </p>
          <p className="text-preset-2 text-grey-500">{comment.createdAt}</p>
        </div>
        {currentUser.username === comment.user.username ? (
          <div className="flex items-center justify-between gap-300">
            <button className="flex justify-center items-center gap-100 cursor-pointer">
              <TrashIcon />
              <p className="text-primary-pink-400 text-preset-2 font-medium">
                Delete
              </p>
            </button>
            <button className="flex justify-center items-center gap-100 cursor-pointer">
              <EditIcon />
              <p className="text-primary-purple-600 text-preset-2 font-medium">
                Edit
              </p>
            </button>
          </div>
        ) : (
          <button
            className="flex justify-center items-center gap-100 cursor-pointer"
            onClick={onReply}
          >
            <ReplyIcon />
            <p className="text-primary-purple-600 text-preset-2 font-medium">
              Reply
            </p>
          </button>
        )}
      </div>
      <div className="text-preset-2 text-grey-500">{comment.content}</div>
    </div>
  );
}

export default CommentBody;
