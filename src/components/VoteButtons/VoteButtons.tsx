import IconPlus from "../../assets/images/icon-plus.svg?react";
import IconMinus from "../../assets/images/icon-minus.svg?react";
import type { Comment } from "../CommentSection/types";

interface VoteButtonsProps {
  comment: Comment;
}

function VoteButtons({ comment }: VoteButtonsProps) {
  return (
    <div className="w-10 h-25 flex justify-center items-center bg-grey-50 rounded-[10px]">
      <div className="h-[68.5px] w-7.5 flex flex-col justify-between items-center">
        <button className="cursor-pointer">
          <IconPlus />
        </button>
        <p className="text-preset-2 font-medium text-primary-purple-600">
          {comment.score}
        </p>
        <button className="cursor-pointer">
          <IconMinus />
        </button>
      </div>
    </div>
  );
}

export default VoteButtons;
