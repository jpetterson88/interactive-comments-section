import { useState, useEffect } from "react";
import CommentContainer from "../CommentContainer/CommentContainer";
import type { Data, Comment } from "./types";

function CommentSection() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  const isLastElement = (array: Comment[], index: number) => {
    const lastIndex = array.length - 1;

    return lastIndex === index ? "mb-0" : "mb-300";
  };

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="flex flex-col max-w-182.5 m-auto">
      {data?.comments?.map((comment, cidx) => {
        const style = isLastElement(data.comments, cidx);

        return (
          <div className="flex flex-col items-end" key={`comment-${cidx}`}>
            <CommentContainer comment={comment} style={style} />

            {comment.replies.length > 0 && (
              <div className="w-171 my-300 flex gap-500">
                <div className="border-2 border-grey-100"></div>
                <div className="flex-1">
                  {comment.replies.map((reply, ridx) => {
                    const style = isLastElement(comment.replies, ridx);

                    return (
                      <CommentContainer
                        key={`reply-${cidx}-${ridx}`}
                        comment={reply}
                        style={style}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CommentSection;
