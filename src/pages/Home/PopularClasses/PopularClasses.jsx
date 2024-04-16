import { useQuery } from '@tanstack/react-query';

const PopularClasses = () => {
	const { data: popularClasses = [] } = useQuery({
		queryKey: ['popularClasses'],
		queryFn: async () => {
			const res = await fetch(
				'https://assignment-12-server-rashed1879.vercel.app/popularclasses'
			);
			return res.json();
		},
	});
	return (
		<div className="mt-28">
			<h2 className="text-3xl font-bold text-black text-center">
				Popular Classes
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-5">
				{popularClasses.map((popularClass) => (
					<div
						key={popularClass._id}
						className="card w-full bg-orange-200 shadow-xl"
					>
						<figure className="rounded-xl">
							<img
								src={popularClass.image}
								alt="Shoes"
								className="rounded-xl w-full h-96"
							/>
						</figure>
						<div className="card-body items-center text-center">
							<h2 className=" text-black font-bold text-2xl">
								{popularClass.className}
							</h2>
							<h3 className=" text-black font-bold text-xl">
								Instructor: {popularClass.instructorName}
							</h3>

							<div className="flex items-center space-x-3">
								<p className=" text-black font-bold">
									Students: {popularClass.enrolledStudents}
								</p>
								<p className=" text-black font-bold ">
									Price: ${popularClass.price}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default PopularClasses;
