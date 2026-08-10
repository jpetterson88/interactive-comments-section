import EditIcon from "../assets/images/icon-reply.svg?react";

function CommentBody() {
  return (
    <div className="w-145.5 h-30 flex-1">
      <div className="flex border border-red-400 h-8 bg-red-400">
        <div>

        </div>
        <div>
          <EditIcon />
        </div>
      </div>
    </div>
  )
}

export default CommentBody;