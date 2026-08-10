import VoteButtons from "./VoteButtons";
import CommentBody from "./CommentBody";

function CommentContainer() {
  return (
    <div className="rounded-lg w-182.5 h-41.75 flex justify-center items-center bg-white">
      <div className="w-170.5 h-30 flex gap-300">
        <VoteButtons />
        <CommentBody />
      </div>
    </div>
  );
}

export default CommentContainer;
