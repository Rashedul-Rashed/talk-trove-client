import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const MyEnrolledClasses = () => {
	const { user } = useContext(AuthContext);
	const [axiosSecure] = useAxiosSecure();

	const { data: myEnrolledClasses = [] } = useQuery({
		queryKey: ['myEnrolledClasses', user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(
				`/myenrolledclasses/${user?.email}`
			);
			return res.data;
		},
	});
	return (
		<div>
			<h2 className="text-center mb-5 text-3xl">My Enrolled Classes</h2>
			<div className="overflow-x-auto">
				<table className="table border-2 border-black">
					{/* head */}
					<thead className="bg-base-200 text-black">
						<tr>
							<th>#</th>
							<th>Class Name</th>
							<th>Instructor Name</th>
							<th>Instructor Email</th>
							<th>Transaction Id</th>
						</tr>
					</thead>
					<tbody>
						{myEnrolledClasses.map((myEnrolledClass, index) => (
							<tr key={myEnrolledClass._id}>
								<th>{index + 1}</th>
								<td>
									<div className="flex items-center space-x-3">
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12">
												<img
													src={myEnrolledClass.image}
													alt="Avatar Tailwind CSS Component"
												/>
											</div>
										</div>
										<div>
											<div className="font-bold">
												{myEnrolledClass.className}
											</div>
										</div>
									</div>
								</td>
								<td>
									<div>{myEnrolledClass.instructorName}</div>
								</td>
								<td>{myEnrolledClass.instructorEmail}</td>
								<td>${myEnrolledClass.transactionId}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyEnrolledClasses;
