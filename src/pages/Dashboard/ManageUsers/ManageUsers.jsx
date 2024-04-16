import { ImUserTie } from 'react-icons/im';
import { GrUserAdmin } from 'react-icons/gr';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageUsers = () => {
	const [axiosSecure] = useAxiosSecure();

	const { data: users = [], refetch } = useQuery(['users'], async () => {
		const res = await axiosSecure.get('/users');
		return res.data;
	});

	const handleMakeAdmin = (id) => {
		fetch(
			`https://assignment-12-server-rashed1879.vercel.app/users/admin/${id}`,
			{
				method: 'PATCH',
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount) {
					refetch();
				}
			});
	};
	const handleMakeInstructor = (id) => {
		fetch(
			`https://assignment-12-server-rashed1879.vercel.app/users/instructor/${id}`,
			{
				method: 'PATCH',
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount) {
					refetch();
				}
			});
	};

	return (
		<div>
			<h2 className="text-center mb-5">
				Manage ALL Users: {users.length}
			</h2>
			<div className="overflow-x-auto">
				<table className="table border-2 border-black">
					{/* head */}
					<thead className="bg-base-200 text-black">
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email</th>
							<th>Role</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user, index) => (
							<tr key={user._id}>
								<th>{index + 1}</th>
								<td>
									<div className="flex items-center space-x-3">
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12">
												<img
													src={user.image}
													alt="Avatar Tailwind CSS Component"
												/>
											</div>
										</div>
										<div>
											<div className="font-bold">
												{user.name}
											</div>
										</div>
									</div>
								</td>
								<td>
									<div>{user.email}</div>
								</td>
								<td>{user.role}</td>
								<th>
									<button
										onClick={() =>
											handleMakeInstructor(user._id)
										}
										disabled={
											user.role === 'instructor'
												? true
												: false
										}
										className="btn btn-sm mr-2"
									>
										<ImUserTie />
									</button>
									<button
										onClick={() =>
											handleMakeAdmin(user._id)
										}
										className="btn btn-sm"
										disabled={
											user.role === 'admin' ? true : false
										}
									>
										<GrUserAdmin />
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

export default ManageUsers;
