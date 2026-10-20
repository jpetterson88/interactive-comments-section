import type { User } from "../CommentSection/types";
import React, { useState } from "react";

interface AddCommentProps {
  currentUser: User;
  replyingTo: User;
  onSubmit: (text: string) => void;
}

function AddComment({ currentUser, onSubmit }: AddCommentProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!text.trim()) return;

    onSubmit(text.trim());
    setText("");
  }

  return (
    <form
      id="currentUser-comment"
      className="flex gap-200 justify-between items-start flex-1 h-full"
      onSubmit={handleSubmit}
    >
      <picture className="w-[40px] h-[40px]">
        <img src={currentUser?.image.png} alt={currentUser?.username} />
      </picture>
      <textarea
        className="flex-1 h-full resize-none px-200 py-100 border border-grey-100 rounded-lg outline-primary-purple-600 text-grey-800"
        name="comment"
        id="comment"
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="Add a comment..."
      />
      <button
        type="submit"
        className="cursor-pointer w-26 h-12 text-white bg-primary-purple-600 rounded-lg"
      >
        SEND
      </button>
    </form>
  );
}

export default AddComment;
