import { useQuery } from '@tanstack/react-query';

const PopularInstructors = () => {
	const { data: popularInstructors = [] } = useQuery({
		queryKey: ['popularInstructors'],
		queryFn: async () => {
			const res = await fetch(
				'https://assignment-12-server-rashed1879.vercel.app/popularinstructors'
			);
			return res.json();
		},
	});

	return (
		<div className="my-24">
			<h2 className="text-3xl font-bold text-black text-center">
				Popular Instructors
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-5">
					{popularInstructors.map((popularInstructor) => (
						<div
							key={popularInstructor._id}
							className="card w-full bg-orange-200 shadow-xl"
						>
							<figure className="rounded-xl">
								<img
									src={popularInstructor.image}
									alt="Shoes"
									className="rounded-xl w-full h-96"
								/>
							</figure>
							<div className="card-body items-center text-center">
								<h2 className=" text-black font-bold text-2xl">
									{popularInstructor.name}
								</h2>
							</div>
						</div>
					))}
				</div>
			</h2>
		</div>
	);
};

export default PopularInstructors;
