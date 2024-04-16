/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useInstructor from '../hooks/useInstructor';

const InstructorRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const [isInstructor, isInstructorLoading] = useInstructor();
	const location = useLocation();
	if (loading || isInstructorLoading) {
		return (
			<div>
				<span className="loading loading-bars loading-xs"></span>
				<span className="loading loading-bars loading-sm"></span>
				<span className="loading loading-bars loading-md"></span>
				<span className="loading loading-bars loading-lg"></span>
			</div>
		);
	}
	if (user && isInstructor) {
		return children;
	}
	return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
