import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {action} from '@storybook/addon-actions';
import TextField from '@mui/material/TextField/TextField';
import {IconButton} from '@mui/material';
import {AddBoxOutlined} from '@mui/icons-material';
import {AddItemForm} from "common/components";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    callback: {
      description: 'Button clicked inside form'
    }
  },
} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

AddItemFormStory.args = {
  callback: action('Button clicked inside form')
}

const Template1: ComponentStory<typeof AddItemForm> = (args) => {
  const [title, setTitle] = useState<string>('');
  const [error, setError] = useState<boolean>(true);

  const onEnterDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addItem();

  const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
    error && setError(false);
  };

  const addItem = () => {
    const trimmedTitle = title.trim();

    if (trimmedTitle) {
      args.callback(trimmedTitle);
    } else {
      setError(true);
    }

    setTitle('');
  };

  return (
      <div>
			<TextField variant={'outlined'} size={'small'} type="text" value={title} onChange={onChangeSetTitle} onKeyDown={onEnterDownAddItem} error={error} helperText={error && 'Title is required!'}/>
			<IconButton onClick={addItem}>
				<AddBoxOutlined></AddBoxOutlined>
			</IconButton>
		</div>
  );
};

export const AddItemFormErrorStory = Template1.bind({});