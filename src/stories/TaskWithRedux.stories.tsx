import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import AppWithRedux from '../AppWithRedux';
import {ReduxStoreProviderDecorator} from '../state/ReduxStoreProviderDecorator';
import {TaskWithRedux} from '../TaskWithRedux';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {TaskType} from '../TodoListWithRedux';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
	title: 'TODOLIST/TaskWithRedux',
	component: TaskWithRedux,
	decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const TaskCopy = () => {
	const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0]);
	return <TaskWithRedux todolistId={'todolistId1'} task={task}/>;
};

const Template: ComponentStory<typeof TaskWithRedux> = (args) => <TaskCopy/>;

export const TaskWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
