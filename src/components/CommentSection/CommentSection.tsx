import { useState, useEffect } from "react";
import CommentContainer from "../CommentContainer/CommentContainer";
import type { Data } from "./types";
import ContainerContent from "../ContainerContent/ContainerContent";
import AddComment from "../AddComment/AddComment";

function CommentSection() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Data | null>(() => {
    const savedData = localStorage.getItem("newData");
    if (savedData) {
      setLoading(false);
      return JSON.parse(savedData);
    } else {
      return null;
    }
  });
  const [replyingTo, setReplyingTo] = useState<Set<string>>(new Set());

  const handleReply = (commentId: string) => {
    setReplyingTo((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId); // fechar se já está aberto
      } else {
        newSet.add(commentId); // abrir
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (data) return;

    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [data]);

  useEffect(() => {
    if (data) {
      localStorage.setItem("newItem", JSON.stringify(data));
    }
  }, [data]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="flex flex-col max-w-182.5 mx-auto py-15 gap-300">
      {data?.comments?.map((comment, cidx) => {
        const commentKey = `comment-${cidx}`;

        return (
          <div className="flex flex-col items-end gap-300" key={commentKey}>
            <CommentContainer>
              <ContainerContent
                comment={comment}
                currentUser={data.currentUser}
                onReply={() => handleReply(commentKey)}
              />
            </CommentContainer>

            {replyingTo.has(commentKey) && (
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
                      <div key={replyKey}>
                        <CommentContainer>
                          <ContainerContent
                            comment={reply}
                            currentUser={data.currentUser}
                            onReply={() => handleReply(replyKey)}
                          />
                        </CommentContainer>

                        {replyingTo.has(replyKey) && (
                          <CommentContainer>
                            <AddComment currentUser={data?.currentUser} />
                          </CommentContainer>
                        )}
                      </div>
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
