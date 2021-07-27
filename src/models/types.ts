export interface IUser {
  firstname: String,
  lastname: String,
  email: String,
  phonenumber: String,

  password: String,
}

export interface INews {
  title: String;
  author: String;
  url: String;
  content: String;
}

export interface INewsArr {
  news: INews[];
}

export interface IDeleteNews {
  userId: Number;
  newsId: Number;
}
export interface IComment {
  comment: String;
}
export interface ICommentArr {
  comments: IComment[]
}