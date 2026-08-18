import { useState, useEffect } from "react";
import CommentContainer from "../CommentContainer/CommentContainer";
import type { Data } from "./types";

function CommentSection() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

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
      {data?.comments?.map((comment, cidx) => (
        <div className="flex flex-col items-end">
          <CommentContainer key={cidx} comment={comment} />
          {comment.replies.length > 0 && (
            <div className="w-171 flex gap-500">
              <div className="border-2 border-grey-100"></div>
              <div className="flex-1">
                {comment.replies.map((reply, ridx) => (
                  <CommentContainer key={ridx} comment={reply} />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CommentSection;
