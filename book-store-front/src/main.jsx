import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import Home from './pages/Home.jsx';
import CreateBooks from './pages/CreateBooks';
import DeleteBooks from './pages/DeleteBooks';
import UpdateBooks from './pages/UpdateBooks';
import ShowBook from './pages/ShowBook';
import './index.css';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route index element={<Home />} />
			<Route path='/books/create' element={<CreateBooks />} />
			<Route path='/books/delete/:id' element={<DeleteBooks />} />
			<Route path='/books/update/:id' element={<UpdateBooks />} />
			<Route path='/books/details/:id' element={<ShowBook />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
