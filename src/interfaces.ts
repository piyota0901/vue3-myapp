export interface Todo {
  id: string;
  title: string;
  comment: string;
  isDone: boolean;
  create_at: string;
}

export interface EditTodo {
  id: string;
  title: string;
  comment: string;
}
