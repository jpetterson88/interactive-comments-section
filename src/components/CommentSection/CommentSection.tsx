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

  const handleOpenReply = (commentId: number) =>
    setOpenReplyBoxes((prev) => ({ ...prev, [commentId]: !prev[commentId] }));

  const handleReply = (
    e: React.SyntheticEvent<HTMLFormElement>,
    comment: Comment,
  ) => {
    e.preventDefault();

    const commentId = comment.id;
    const formData = new FormData(e.currentTarget);
    const formDataComment = formData.get("comment") as string;
    const replies = comment.replies as Comment[];

    if (replies) {
      replies.push({
        id: ID++,
        content: formDataComment,
        createdAt: getRelativeTime(new Date()),
        score: 0,
        user: data.currentUser,
        replyingTo: comment.user.username,
      });
    }

    setData((prevData) => ({
      ...prevData,
      replies,
    }));

    setOpenReplyBoxes((prev) => ({ ...prev, [commentId]: false }));
  };
  
  const handleCreateComment = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDataComment = formData.get("comment") as string;
    const comments = data.comments;

    comments.push({
      id: ID++,
      content: formDataComment,
      createdAt: getRelativeTime(new Date()),
      score: 0,
      user: data.currentUser,
    });

    setData((prevData) => ({
      ...prevData,
      comments,
    }));
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
              />
            </CommentContainer>

            {openReplyBoxes[commentKey] && (
              <CommentContainer>
                <AddComment
                  currentUser={data?.currentUser}
                  onSubmit={(e) => handleReply(e, comment)}
                />
              </CommentContainer>
            )}

            {comment.replies && comment.replies.length > 0 && (
              <div className="w-171 flex gap-500">
                <div className="border-2 border-grey-100"></div>
                <div className="flex-1 flex flex-col gap-300">
                  {comment.replies.map((reply) => {
                    const replyKey = reply.id;

                    return (
                      <div className="flex flex-col gap-300" key={replyKey}>
                        <CommentContainer>
                          <ContainerContent
                            comment={reply}
                            currentUser={data.currentUser}
                            onReply={() => handleOpenReply(replyKey)}
                          />
                        </CommentContainer>

                        {openReplyBoxes[replyKey] && (
                          <CommentContainer>
                            <AddComment
                              currentUser={data?.currentUser}
                              onSubmit={(e) => handleReply(e, comment)}
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
      <CommentContainer>
        <AddComment
          currentUser={data.currentUser}
          onSubmit={(e) => handleCreateComment(e)}
        />
      </CommentContainer>
    </div>
  );
}

export default CommentSection;
