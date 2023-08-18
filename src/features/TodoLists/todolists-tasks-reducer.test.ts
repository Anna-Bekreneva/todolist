import {TasksStateType, TodoListDomainType} from 'app/App';
import {todolistsActions, todolistsReducer} from './todolists-reducer';
import {tasksReducer} from "./Tasks/tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodoListDomainType> = []

    const action = todolistsActions.addTodoList({
        id: 'newId', todoList: {
            title: 'New todo', order: 0, addedDate: '', id: 'newId', filter: 'all', entityStatus: 'idle'
        }
    })

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.id)
    expect(idFromTodolists).toBe(action.payload.id)
})