import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import App from '../app/App';
import {ReduxStoreProviderDecorator} from 'app/ReduxStoreProviderDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export

export default {
  title: 'TODOLIST/AppWithRedux',
  component: App,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof App> = (args) => <App/>;

export const AppWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
