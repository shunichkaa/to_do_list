// Типы для todo-list
export type FilterValues = "all" | "active" | "completed"
export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
  filter: FilterValues
}

// Типы для задач
export enum TaskStatus {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}
export enum TaskPriority {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}
export type Task = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

// Тип состояния приложения
export type AppState = {
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
  isInitialized: boolean
  themeMode?: "light" | "dark"
} 