import { useState, useEffect } from "react";
import CommentContainer from "../CommentContainer/CommentContainer";
import type { Data } from "./types";
import ContainerContent from "../ContainerContent/ContainerContent";
import AddComment from "../AddComment/AddComment";

function CommentSection() {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleReply = (commentId: string) => {
    setReplyingTo(commentId);
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
    <div className="flex flex-col max-w-182.5 mx-auto py-15 gap-300">
      {data?.comments?.map((comment, cidx) => {
        const commentKey = `comment-${cidx}`;

        return (
          <div className="flex flex-col items-end gap-300">
            <CommentContainer key={commentKey}>
              <ContainerContent
                comment={comment}
                onReply={() => handleReply(commentKey)}
              />
            </CommentContainer>

            {replyingTo === commentKey && (
              <CommentContainer>
                <AddComment currentUser={data?.currentUser} />
              </CommentContainer>
            )}

            {comment.replies.length > 0 && (
              <div className="w-171 flex gap-500">
                <div className="border-2 border-grey-100"></div>
                <div className="flex-1 flex flex-col gap-300">
                  {comment.replies.map((reply, ridx) => {
                    const replyKey = `reply-${cidx}-${ridx}`;

                    return (
                      <>
                        <CommentContainer key={replyKey}>
                          <ContainerContent
                            comment={reply}
                            onReply={() => handleReply(replyKey)}
                          />
                        </CommentContainer>

                        {replyingTo === replyKey && (
                          <CommentContainer>
                            <AddComment currentUser={data?.currentUser} />
                          </CommentContainer>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
      <CommentContainer>
        <AddComment currentUser={data?.currentUser} />
      </CommentContainer>
    </div>
  );
}

export default CommentSection;
