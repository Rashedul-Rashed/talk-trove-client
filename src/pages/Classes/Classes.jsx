import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Classes = () => {
	const { user } = useContext(AuthContext);
	const [isAdmin] = useAdmin();
	const [isInstructor] = useInstructor();
	const [axiosSecure] = useAxiosSecure();

	const { data: approvedClasses = [] } = useQuery({
		queryKey: ['approvedclasses'],
		queryFn: async () => {
			const res = await fetch(
				'https://assignment-12-server-rashed1879.vercel.app/classes/approved'
			);
			return res.json();
		},
	});

	const handleSelectClass = (selectedClass) => {
		if (!user) {
			alert('Please Login To Select The Class');
		}
		const {
			className,
			instructorName,
			instructorEmail,
			availableSeats,
			price,
			image,
			_id,
		} = selectedClass;
		const mySelectedClass = {
			className,
			instructorName,
			instructorEmail,
			availableSeats,
			price,
			image,
			classId: _id,
			studentEmail: user.email,
		};
		axiosSecure.post('/selectedClasses', mySelectedClass).then((data) => {
			if (data.data.insertedId) {
				alert('The Class is selected');
			}
		});
	};

	return (
		<div>
			<h2 className="text-center text-4xl my-3">
				Available Classes On Talk Trove
			</h2>
			<div className="grid grid-cols-3 gap-6 my-5">
				{approvedClasses.map((approvedClass) => (
					<div
						key={approvedClass._id}
						className={`card w-full bg-base-200 shadow-xl ${
							approvedClass.availableSeats === 0
								? 'bg-red-600'
								: ''
						}`}
					>
						<figure className="rounded-xl">
							<img
								src={approvedClass.image}
								alt="Shoes"
								className="rounded-xl w-full h-96"
							/>
						</figure>
						<div className="card-body items-center text-center">
							<h2 className=" text-black font-bold text-2xl">
								{approvedClass.className}
							</h2>
							<h3 className=" text-black font-bold text-xl">
								Instructor: {approvedClass.instructorName}
							</h3>

							<div className="flex items-center space-x-3">
								<p className=" text-black font-bold">
									Available Seats:{' '}
									{approvedClass.availableSeats}
								</p>
								<p className=" text-black font-bold ">
									Price: {approvedClass.price}
								</p>
							</div>
							<div>
								<button
									onClick={() =>
										handleSelectClass(approvedClass)
									}
									disabled={
										isAdmin ||
										isInstructor ||
										approvedClass.availableSeats === 0
									}
									className="btn btn-outline hover:bg-black hover:text-white"
								>
									Select Class
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Classes;
