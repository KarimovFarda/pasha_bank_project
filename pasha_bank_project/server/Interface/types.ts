export interface IRegister {
  firstname: String,
  lastname: String,
  email: String,
  phonenumber: String,
  password: String,
}

export interface ILogin {
  email: String,
  password: String
}

export interface IAdmin {
  email: String,
  password: String
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
export interface INotes {
  title : String,
  content: String
}
export interface IComments{
  comment : String
}