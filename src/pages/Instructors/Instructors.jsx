import { useQuery } from '@tanstack/react-query';

const Instructors = () => {
	const { data: instructors = [] } = useQuery({
		queryKey: ['instructors'],
		queryFn: async () => {
			const res = await fetch(
				'https://assignment-12-server-rashed1879.vercel.app/users/instructors'
			);
			return res.json();
		},
	});

	return (
		<div>
			<h2 className="text-center text-4xl my-3">
				Instructors of Talk Trove
			</h2>
			<div className="grid grid-cols-3 gap-6 my-5">
				{instructors.map((instructor) => (
					<div
						key={instructor._id}
						className="card w-full bg-base-200 shadow-xl"
					>
						<figure className="rounded-xl">
							<img
								src={instructor.image}
								alt="Shoes"
								className="rounded-xl w-full h-96"
							/>
						</figure>
						<div className="card-body items-center text-center">
							<h2 className=" text-black font-bold text-2xl">
								{instructor.name}
							</h2>

							<div className="badge border-black text-black badge-outline text-xl font-bold p-3">
								Email : {instructor.email}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Instructors;
