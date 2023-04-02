import React, {ChangeEvent, useState} from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from '../Task';
import {TaskType} from '../TodoListWithRedux';
import {action} from '@storybook/addon-actions';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
	title: 'TODOLIST/Task',
	component: Task,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes

	// Суда можно выносить общие свойства объектов args, которые нужны для всех сторис
	args: {
		changeTaskStatus: action('changeTaskStatus'),
		changeTaskTitle: action('changeTaskTitle'),
		removeTask: action('removeTask'),
	}
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

TaskIsNotDoneStory.args = {
	task: {id: 'adsadada', title: 'JS', isDone: false},
};

export const TaskIsDoneStory = Template.bind({});

TaskIsDoneStory.args = {
  task: {id: 'adsadada', title: 'HTML', isDone: true},
};

const Template1: ComponentStory<typeof Task> = (args) => {

	const [task, setTask] = useState({ id: 'aaa', title: 'js', isDone: false})

	function changeTaskStatus (id: string, event: ChangeEvent<HTMLInputElement>) {
		setTask({ id: 'aaa', title: 'js', isDone: !task.isDone})
	}

	function changeTaskTitle (id: string, newTitle: string) {
		setTask({ id: 'aaa', title: newTitle, isDone: false})
	}

	function removeTask () {
		action('removeTask')
	}

	return <Task
		changeTaskStatus={changeTaskStatus}
		changeTaskTitle={changeTaskTitle}
		removeTask={args.removeTask}
		task={task}/>
};

export const TaskStory = Template1.bind({});