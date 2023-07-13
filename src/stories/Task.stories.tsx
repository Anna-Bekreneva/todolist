import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import App, {TaskDomainType} from '../App';
import {ReduxStoreProviderDecorator} from '../state/ReduxStoreProviderDecorator';
import {Task} from '../features/TodoList/Task';
import {useAppSelector} from '../state/store';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
	title: 'TODOLIST/TaskWithRedux',
	component: Task,
	decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const TaskCopy = () => {
	const task = useAppSelector<TaskDomainType>(state => state.tasks['todolistId1'][0]);
	return <Task todolistId={'todolistId1'} task={task}/>;
};

const Template: ComponentStory<typeof Task> = (args) => <TaskCopy/>;

export const TaskWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
