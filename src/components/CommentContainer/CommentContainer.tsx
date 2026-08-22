import type { ReactNode } from "react";

interface CommentContainerProps {
  children: ReactNode;
}

function CommentContainer({ children }: CommentContainerProps) {
  return (
    <div className={`rounded-lg w-full h-41.75 flex justify-center items-center bg-white p-[24px]`}>
      {children}
    </div>
  );
}

export default CommentContainer;
