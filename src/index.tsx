import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppWithRedux from './AppWithRedux';
import {store} from './state/store';
import {Provider} from 'react-redux';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {amber, green} from '@mui/material/colors';

const theme = createTheme({
	palette: {
		primary: green,
		secondary: amber,
	}
})

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
	<ThemeProvider theme={theme}>
		<CssBaseline/>
		<Provider store={store}>
			<AppWithRedux />
		</Provider>
	</ThemeProvider>
);


serviceWorker.unregister();

