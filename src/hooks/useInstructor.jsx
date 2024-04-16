import { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useInstructor = () => {
	const { user } = useContext(AuthContext);
	const [axiosSecure] = useAxiosSecure();
	const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
		queryKey: ['isInstructor', user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(
				`/users/instructor/${user?.email}`
			);
			return res.data.instructor;
		},
	});
	return [isInstructor, isInstructorLoading];
};

export default useInstructor;
