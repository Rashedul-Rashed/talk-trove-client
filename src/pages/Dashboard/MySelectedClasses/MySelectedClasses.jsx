import { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../providers/AuthProvider';
import { MdDeleteForever, MdPayments } from 'react-icons/md';
import { Link } from 'react-router-dom';

const MySelectedClasses = () => {
	const { user } = useContext(AuthContext);
	const [axiosSecure] = useAxiosSecure();

	const { data: mySelectedClasses = [], refetch } = useQuery({
		queryKey: ['mySelectedClasses', user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(
				`/selectedClasses/${user?.email}`
			);
			return res.data;
		},
	});

	const handleDeleteClass = (id) => {
		axiosSecure.delete(`/selectedClasses/${id}`).then((data) => {
			if (data.data.deletedCount > 0) {
				refetch();
				alert('Deleted Successfully');
			}
		});
	};

	return (
		<div>
			<h2 className="text-center text-4xl my-3">My Selected Classes</h2>
			<div className="overflow-x-auto">
				<table className="table border-2 border-black">
					{/* head */}
					<thead className="bg-base-200 text-black">
						<tr>
							<th>#</th>
							<th>Class Name</th>
							<th>Instructor Name</th>
							<th>Available Seats</th>
							<th>Price</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{mySelectedClasses.map((mySelectedClass, index) => (
							<tr key={mySelectedClass._id}>
								<th>{index + 1}</th>
								<td>
									<div className="flex items-center space-x-3">
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12">
												<img
													src={mySelectedClass.image}
													alt="Avatar Tailwind CSS Component"
												/>
											</div>
										</div>
										<div>
											<div className="font-bold">
												{mySelectedClass.className}
											</div>
										</div>
									</div>
								</td>
								<td>
									<div>{mySelectedClass.instructorName}</div>
								</td>
								<td>
									<div>{mySelectedClass.availableSeats}</div>
								</td>
								<td>${mySelectedClass.price}</td>
								<th>
									<Link
										to="/dashboard/payment"
										state={mySelectedClass}
									>
										<button className="btn btn-sm mr-2 text-xl">
											<MdPayments />
										</button>
									</Link>
									<button
										onClick={() =>
											handleDeleteClass(
												mySelectedClass._id
											)
										}
										className="btn btn-sm mr-2 text-xl text-red-600"
									>
										<MdDeleteForever />
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

export default MySelectedClasses;
