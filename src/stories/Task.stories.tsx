import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import { ReduxStoreProviderDecorator } from 'app/store/ReduxStoreProviderDecorator';
import {selectorTasks, Task} from "../features";
import App from "../app/ui/App";
import {TasksStateType, useAppSelector} from "../common";



// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
	title: 'TODOLIST/TaskWithRedux',
	component: Task,
	decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const TaskCopy = () => {
	const tasks = useAppSelector<TasksStateType>(selectorTasks);
	const task = tasks['todolistId1'][0]
	return <Task todolistId={'todolistId1'} task={task}/>;
};

const Template: ComponentStory<typeof Task> = (args: any) => <TaskCopy/>;

export const TaskWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
