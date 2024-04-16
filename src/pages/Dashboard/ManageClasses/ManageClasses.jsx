import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { RiFeedbackLine } from 'react-icons/ri';
import { FcApproval } from 'react-icons/fc';
import { HiNoSymbol } from 'react-icons/hi2';
import { useState } from 'react';

const ManageClasses = () => {
	const [modalParam, setModalParam] = useState('');
	const [axiosSecure] = useAxiosSecure();

	const { data: allclasses = [], refetch } = useQuery({
		queryKey: ['classes'],
		queryFn: async () => {
			const res = await axiosSecure.get('/classes');
			return res.data;
		},
	});

	const handleApprove = (id) => {
		fetch(
			`https://assignment-12-server-rashed1879.vercel.app/classes/approve/${id}`,
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
	const handleDeny = (id) => {
		fetch(
			`https://assignment-12-server-rashed1879.vercel.app/classes/deny/${id}`,
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

	const handleShowModal = (id) => {
		setModalParam(id);
		window.my_modal_1.showModal();
	};

	const handleSendFeedback = (event, id) => {
		event.preventDefault();
		const feedback = event.target.feedback.value;
		fetch(
			`https://assignment-12-server-rashed1879.vercel.app/classes/feedback/${id}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ feedback }),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.modifiedCount) {
					refetch();
					event.target.reset();
				}
			});
	};

	return (
		<div>
			<h2 className="text-center mb-5 text-3xl">Manage ALL classes</h2>
			<div className="overflow-x-auto mx-5">
				<table className="table border-2 border-black">
					{/* head */}
					<thead className="bg-base-200 text-black">
						<tr>
							<th>#</th>
							<th>Class Name</th>
							<th>Instructor Name</th>
							<th>Instructor Email</th>
							<th>Available Seats</th>
							<th>Price</th>
							<th>Status</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{allclasses.map((singleClass, index) => (
							<tr key={singleClass._id}>
								<th>{index + 1}</th>
								<td>
									<div className="flex items-center space-x-3">
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12">
												<img
													src={singleClass.image}
													alt="Avatar Tailwind CSS Component"
												/>
											</div>
										</div>
										<div>
											<div className="font-bold">
												{singleClass.className}
											</div>
										</div>
									</div>
								</td>
								<td>
									<div>{singleClass.instructorName}</div>
								</td>
								<td>{singleClass.instructorEmail}</td>
								<td>{singleClass.availableSeats}</td>
								<td>${singleClass.price}</td>
								<td>{singleClass.status}</td>
								<th className="flex flex-col space-y-2">
									<button
										onClick={() =>
											handleApprove(singleClass._id)
										}
										className="btn btn-sm mr-2"
										disabled={
											singleClass.status !== 'pending'
												? true
												: false
										}
									>
										<FcApproval />
									</button>
									<button
										onClick={() =>
											handleDeny(singleClass._id)
										}
										className="btn btn-sm mr-2 text-red-600"
										disabled={
											singleClass.status !== 'pending'
												? true
												: false
										}
									>
										<HiNoSymbol />
									</button>
									<button
										onClick={() =>
											handleShowModal(singleClass._id)
										}
										className="btn btn-sm mr-2"
									>
										<RiFeedbackLine />
									</button>
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<dialog id="my_modal_1" className="modal">
				<form
					onSubmit={() => handleSendFeedback(event, modalParam)}
					method="dialog"
					className="modal-box"
				>
					<div className="form-control">
						<label className="label">
							<span className="label-text text-black text-xl">
								Feedback
							</span>
						</label>
						<textarea
							className="textarea textarea-bordered h-24 mb-3"
							name="feedback"
							placeholder="Write here the reason of approved/denied the class"
						></textarea>
						<p>Press ESC key to close this window</p>
					</div>
					<div className="modal-action">
						<input
							className="btn bg-black text-white hover:bg-white hover:text-black rounded-full"
							type="submit"
							value="Send Feedback"
						/>
					</div>
				</form>
			</dialog>
		</div>
	);
};

export default ManageClasses;
