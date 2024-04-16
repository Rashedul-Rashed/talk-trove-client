import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../pages/Home/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Dashboard from '../Layout/Dashboard';
import ManageUsers from '../pages/Dashboard/ManageUsers/ManageUsers';
import ManageClasses from '../pages/Dashboard/ManageClasses/ManageClasses';
import PrivateRoute from './PrivateRoute';
import AddClasses from '../pages/Dashboard/AddClasses/AddClasses';
import InstructorRoute from './InstructorRoute';
import AdminRoute from './AdminRoute';
import MyClasses from '../pages/Dashboard/MyClasses/MyClasses';
import Classes from '../pages/Classes/Classes';
import Instructors from '../pages/Instructors/Instructors';
import MySelectedClasses from '../pages/Dashboard/MySelectedClasses/MySelectedClasses';
import Payment from '../pages/Dashboard/Payment/Payment';
import MyEnrolledClasses from '../pages/Dashboard/MyEnrolledClasses/MyEnrolledClasses';
import PaymentHistory from '../pages/Dashboard/PaymentHistory/PaymentHistory';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Main></Main>,
		errorElement: <ErrorPage></ErrorPage>,
		children: [
			{
				path: '/',
				element: <Home></Home>,
			},
			{
				path: 'instructors',
				element: <Instructors></Instructors>,
			},
			{
				path: 'classes',
				element: <Classes></Classes>,
			},
			{
				path: 'login',
				element: <Login></Login>,
			},
			{
				path: 'signup',
				element: <Register></Register>,
			},
		],
	},
	{
		path: 'dashboard',
		errorElement: <ErrorPage></ErrorPage>,
		element: (
			<PrivateRoute>
				<Dashboard></Dashboard>
			</PrivateRoute>
		),
		children: [
			// Admin Routes
			{
				path: 'manageusers',
				element: (
					<AdminRoute>
						<ManageUsers></ManageUsers>
					</AdminRoute>
				),
			},
			{
				path: 'manageclasses',
				element: (
					<AdminRoute>
						<ManageClasses></ManageClasses>
					</AdminRoute>
				),
			},
			// Instructor Routes
			{
				path: 'addclass',
				element: (
					<InstructorRoute>
						<AddClasses></AddClasses>
					</InstructorRoute>
				),
			},
			{
				path: 'myclasses',
				element: (
					<InstructorRoute>
						<MyClasses></MyClasses>
					</InstructorRoute>
				),
			},
			// Student Routes
			{
				path: 'myselectedclasses',
				element: <MySelectedClasses></MySelectedClasses>,
			},
			{
				path: 'myenrolledclasses',
				element: <MyEnrolledClasses></MyEnrolledClasses>,
			},
			{
				path: 'payment',
				element: <Payment></Payment>,
			},
			{
				path: 'paymenthistory',
				element: <PaymentHistory></PaymentHistory>,
			},
		],
	},
]);
