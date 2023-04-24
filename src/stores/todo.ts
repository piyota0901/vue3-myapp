import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import type { Todo, inputTodo } from "@/interfaces";

const date2string = (date: Date): string => {
  return (
    date.getFullYear() +
    "-" +
    Number(date.getMonth() + 1) +
    "-" +
    date.getDate()
  );
};

export const useTodoStore = defineStore("todo", {
  state: () => {
    return {
      todoList: new Map<string, Todo>(),
    };
  },
  getters: {
    // https://pinia.vuejs.org/core-concepts/getters.html#passing-arguments-to-getters
    // getterから関数を返す
    getById: (state) => {
      return (id: string) => {
        const todo = state.todoList.get(id) as Todo;
        return todo;
      };
    },
  },
  actions: {
    initTodoList(): void {
      const initTodo1 = {
        id: uuidv4(),
        title: "sample",
        comment: "サンプルタスクです",
        isDone: false,
        create_at: "2023-03-25",
      };
      const initTodo2 = {
        id: uuidv4(),
        title: "sample2",
        comment: "サンプルタスクです",
        isDone: false,
        create_at: "2023-03-25",
      };
      const initTodo3 = {
        id: uuidv4(),
        title: "sample3",
        comment: "サンプルタスクです",
        isDone: false,
        create_at: "2023-03-25",
      };
      this.todoList.set(initTodo1.id, initTodo1);
      this.todoList.set(initTodo2.id, initTodo2);
      this.todoList.set(initTodo3.id, initTodo3);
    },
    add(todo: inputTodo): void {
      const newTodo = {
        id: uuidv4(),
        title: todo.title,
        comment: todo.comment,
        isDone: false,
        create_at: date2string(new Date()),
      };
      this.todoList.set(newTodo.id, newTodo);
    },
    deleteById(id: string): void {
      this.todoList.delete(id);
    },
    update(todo: Todo): void {
      const updateTodo = {
        id: todo.id,
        title: todo.title,
        comment: todo.comment,
        isDone: todo.isDone,
        create_at: todo.create_at,
      };
      this.todoList.set(todo.id, updateTodo);
    },
  },
});
