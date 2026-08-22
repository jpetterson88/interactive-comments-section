import type { User } from "../CommentSection/types";

interface AddCommentProps {
  currentUser: User | undefined;
}

function AddComment({ currentUser }: AddCommentProps) {
  return (
    <form
      id="comment-form"
      className="flex gap-200 justify-between items-start flex-1 h-full"
    >
      <picture className="w-[40px] h-[40px]">
        <img src={currentUser?.image.png} alt={currentUser?.username} />
      </picture>
      <textarea
        className="flex-1 h-full resize-none px-200 py-100 border border-grey-100 rounded-lg outline-primary-purple-600 text-grey-800"
        name="comment"
        id="comment"
        placeholder="Add a comment..."
      />
      <button type="submit" className="cursor-pointer w-26 h-12 text-white bg-primary-purple-600 rounded-lg">
        SEND
      </button>
    </form>
  );
}

export default AddComment;
