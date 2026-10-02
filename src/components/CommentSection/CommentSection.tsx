import { useState, useEffect } from "react";
import CommentContainer from "../CommentContainer/CommentContainer";
import type { Data, Comment } from "./types";
import ContainerContent from "../ContainerContent/ContainerContent";
import AddComment from "../AddComment/AddComment";
import { getRelativeTime } from "./helpers";

function CommentSection() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Data>(() => {
    const savedData = localStorage.getItem("newData");
    if (savedData) {
      setLoading(false);
      return JSON.parse(savedData);
    } else {
      return null;
    }
  });
  const [replyingTo, setReplyingTo] = useState<Set<number>>(new Set());

  const handleReply = (commentId: number) => {
    setReplyingTo((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        // close the currentUser comment section if it's already open
        newSet.delete(commentId);
      } else {
        // open the currentUser comment section
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const content = formData.get("comment") as string;
    if (!content) return;

    const createdAt = getRelativeTime(new Date());
    const score = 0;
    const user = {
      image: {
        png: data.currentUser.image.png,
        webp: data.currentUser.image.webp,
      },
      username: data.currentUser.username,
    };
    const replies = [] as Comment[];

    const currentUserReply = {
      id: data?.comments?.length + 1,
      content,
      createdAt,
      score,
      user,
      replies,
    };

    setData((prevData) => ({
      ...prevData,
      comments: [...prevData.comments, currentUserReply],
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
        const commentKey: number = comment.id;

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
                <AddComment
                  currentUser={data?.currentUser}
                  handleSubmit={handleSubmit}
                />
              </CommentContainer>
            )}

            {comment.replies.length > 0 && (
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
                            onReply={() => handleReply(replyKey)}
                          />
                        </CommentContainer>

                        {replyingTo.has(replyKey) && (
                          <CommentContainer>
                            <AddComment
                              currentUser={data?.currentUser}
                              handleSubmit={handleSubmit}
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
          handleSubmit={handleSubmit}
        />
      </CommentContainer>
    </div>
  );
}

export default CommentSection;
