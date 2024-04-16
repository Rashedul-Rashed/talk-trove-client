import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaEdit } from 'react-icons/fa';

const MyClasses = () => {
	const { user } = useContext(AuthContext);
	const [axiosSecure] = useAxiosSecure();

	const { data: myclasses = [] } = useQuery({
		queryKey: ['myclasses', user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(`/classes/${user?.email}`);
			return res.data;
		},
	});

	return (
		<div>
			<h2 className="text-center mb-5 text-3xl">My Classes</h2>
			<div className="overflow-x-auto">
				<table className="table border-2 border-black">
					{/* head */}
					<thead className="bg-base-200 text-black">
						<tr>
							<th>#</th>
							<th>Class Name</th>
							<th>Available Seats</th>
							<th>Price</th>
							<th>Status</th>
							<th>Enrolled Students</th>
							<th>Feedback</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{myclasses.map((myclass, index) => (
							<tr key={myclass._id}>
								<th>{index + 1}</th>
								<td>
									<div className="flex items-center space-x-3">
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12">
												<img
													src={myclass.image}
													alt="Avatar Tailwind CSS Component"
												/>
											</div>
										</div>
										<div>
											<div className="font-bold">
												{myclass.className}
											</div>
										</div>
									</div>
								</td>
								<td>
									<div>{myclass.availableSeats}</div>
								</td>
								<td>${myclass.price}</td>
								<td>{myclass.status}</td>
								<td>{myclass.enrolledStudents}</td>
								<td>{myclass.feedback}</td>
								<th>
									<button className="btn btn-sm mr-2">
										<FaEdit />
									</button>
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyClasses;
