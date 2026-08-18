export interface User {
  image: {
    png: string;
    webp: string;
  }
  username: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replyingTo?: string;
  replies: Comment[]
}

export interface Data {
  currentUser: User;
  comments: Comment[];
}