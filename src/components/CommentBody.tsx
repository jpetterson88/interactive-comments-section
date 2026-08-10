import EditIcon from "../assets/images/icon-reply.svg?react";

function CommentBody() {
  return (
    <div className="w-145.5 h-30 flex-1">
      <div className="flex h-8 justify-between">
        <div>

        </div>
        <div className="flex justify-center items-center gap-100">
          <EditIcon />
          <p className="text-primary-purple-600 text-preset-2 font-medium">Reply</p>
        </div>
      </div>
    </div>
  )
}

export default CommentBody;