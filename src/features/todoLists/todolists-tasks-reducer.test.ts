import {TasksStateType, TodoListDomainType} from "../../common";
import {todolistsReducer, todolistsThunks} from "./model";
import {tasksReducer} from "./tasks";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodoListDomainType> = []

    const todoList: TodoListDomainType = {
        title: 'New todo', order: 0, addedDate: '', id: 'newId', filter: 'all', entityStatus: 'idle'
    }

    type ActionType = {
        type: typeof todolistsThunks.addTodolist.fulfilled.type
        payload: {id: string, todoList: TodoListDomainType}
    }

    const action: ActionType = {
        type: todolistsThunks.addTodolist.fulfilled.type,
        payload: {id: 'newId', todoList}
    }

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodolists).toBe(action.payload.id)
})