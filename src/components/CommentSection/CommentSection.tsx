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
    <div className="flex flex-col gap-300">
      {data?.comments?.map((comment) => (
        <CommentContainer comment={comment} />
      ))}
    </div>
  );
}

export default CommentSection;
