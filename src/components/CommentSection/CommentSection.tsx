import { useState, useEffect } from "react";
import CommentContainer from "../CommentContainer/CommentContainer";
import type { Data, Comment } from "./types";
import ContainerContent from "../ContainerContent/ContainerContent";
import AddComment from "../AddComment/AddComment";
import { getRelativeTime } from "./helpers";

let ID = 4;

function CommentSection() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data>(() => {
    const savedData = localStorage.getItem("newData");
    if (savedData) {
      setLoading(false);
      return JSON.parse(savedData);
    } else {
      return null;
    }
  });
  const [openReplyBoxes, setOpenReplyBoxes] = useState<Record<number, boolean>>(
    {},
  );

  console.log("DATA: ", data);

  // ==== REPLIES HANDLES ====
  const handleOpenReply = (commentId: number) =>
    setOpenReplyBoxes((prev) => ({ ...prev, [commentId]: !prev[commentId] }));

  const addReply = (
    target: Comment,
    reply: Comment,
    list: Comment[],
  ): Comment[] =>
    list.map((obj) => {
      if (obj.id === target.id) {
        return { ...obj, replies: [...(obj.replies ?? []), reply] };
      }
      if (obj.replies?.length) {
        return { ...obj, replies: addReply(target, reply, obj.replies) };
      }
      return obj;
    });

  const handleAddReply = (text: string, comment: Comment) => {
    const newReply: Comment = {
      id: ++ID,
      content: text,
      createdAt: getRelativeTime(new Date()),
      score: 0,
      replyingTo: comment.user.username,
      user: data.currentUser,
    };

    setData((prevData) => ({
      ...prevData,
      comments: addReply(comment, newReply, prevData.comments),
    }));

    setOpenReplyBoxes((prev) => ({ ...prev, [comment.id]: false }));
  };

  const removeReply = (replyId: number, list: Comment[]): Comment[] =>
    list
      .filter((obj) => obj.id !== replyId)
      .map((obj) =>
        obj.replies?.length
          ? { ...obj, replies: removeReply(replyId, obj.replies) }
          : obj,
      );

  const handleDeleteReply = (reply: Comment) => {
    setData((prevData) => ({
      ...prevData,
      comments: removeReply(reply.id, prevData.comments),
    }));
  };

  // ==== COMMENT HANDLES ====
  const handleAddComment = (text: string) => {
    const newComment = {
      id: ++ID,
      content: text,
      createdAt: getRelativeTime(new Date()),
      score: 0,
      user: data.currentUser,
    };

    setData((prevData) => ({
      ...prevData,
      comments: [...prevData.comments, newComment],
    }));
  };

  const handleDeleteComment = (comment: Comment) => {
    setData((prevData) => ({
      ...prevData,
      comments: prevData.comments.filter((c) => c.id !== comment.id),
    }));
  };
  // ========================

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
      localStorage.setItem("newData", JSON.stringify(data));
    }
  }, [data]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="flex flex-col max-w-182.5 mx-auto py-15 gap-300">
      {data?.comments?.map((comment) => {
        const commentKey = comment.id;

        return (
          <div className="flex flex-col items-end gap-300" key={commentKey}>
            <CommentContainer>
              <ContainerContent
                comment={comment}
                currentUser={data.currentUser}
                onReply={() => handleOpenReply(commentKey)}
                onDelete={() => handleDeleteComment(comment)}
              />
            </CommentContainer>

            {openReplyBoxes[commentKey] && (
              <CommentContainer>
                <AddComment
                  currentUser={data?.currentUser}
                  replyingTo={comment.user.username}
                  onSubmit={(text) => handleAddReply(text, comment)}
                />
              </CommentContainer>
            )}

            {comment.replies && comment.replies.length > 0 && (
              <div className="w-full max-w-171 flex gap-500">
                <div className="border-2 border-grey-100"></div>
                <div className="flex-1 flex flex-col gap-300">
                  {comment.replies.map((reply) => {
                    const replyKey = reply.id;

                    return (
                      <div
                        className="flex flex-col items-end gap-300"
                        key={replyKey}
                      >
                        <CommentContainer>
                          <ContainerContent
                            comment={reply}
                            currentUser={data.currentUser}
                            onReply={() => handleOpenReply(replyKey)}
                            onDelete={() => handleDeleteReply(reply)}
                          />
                        </CommentContainer>

                        {openReplyBoxes[replyKey] && (
                          <CommentContainer>
                            <AddComment
                              currentUser={data?.currentUser}
                              onSubmit={(text) => handleAddReply(text, reply)}
                            />
                          </CommentContainer>
                        )}

                        {reply.replies && reply.replies.length > 0 && (
                          <div className="w-full max-w-148.5 flex gap-500">
                            <div className="border-2 border-grey-100"></div>
                            <div className="flex-1 flex flex-col gap-300">
                              {reply.replies.map((rr) => {
                                const rrKey = rr.id;

                                return (
                                  <div
                                    className="flex flex-col gap-300"
                                    key={rrKey}
                                  >
                                    <CommentContainer>
                                      <ContainerContent
                                        comment={rr}
                                        currentUser={data.currentUser}
                                        onReply={() => handleOpenReply(rrKey)}
                                        onDelete={() => handleDeleteReply(rr)}
                                      />
                                    </CommentContainer>

                                    {openReplyBoxes[rrKey] && (
                                      <CommentContainer>
                                        <AddComment
                                          currentUser={data?.currentUser}
                                          onSubmit={(text) =>
                                            handleAddReply(text, rr)
                                          }
                                        />
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
                </div>
              </div>
            )}
          </div>
        );
      })}
      <CommentContainer>
        <AddComment
          currentUser={data.currentUser}
          onSubmit={handleAddComment}
        />
      </CommentContainer>
    </div>
  );
}

export default CommentSection;
