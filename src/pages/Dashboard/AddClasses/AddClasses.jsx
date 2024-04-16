import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AddClasses = () => {
	const { user } = useContext(AuthContext);
	const [axiosSecure] = useAxiosSecure();
	const { register, handleSubmit, reset } = useForm();

	const onSubmit = (data) => {
		console.log(data);
		const image = data.image[0];
		const formData = new FormData();
		formData.append('image', image);
		const url = `https://api.imgbb.com/1/upload?key=${
			import.meta.env.VITE_IMGBB_KEY
		}`;
		fetch(url, {
			method: 'POST',
			body: formData,
		})
			.then((res) => res.json())
			.then((imageData) => {
				if (imageData.success) {
					const imgURL = imageData.data.display_url;
					const {
						className,
						instructorName,
						instructorEmail,
						availableSeats,
						price,
					} = data;
					const newClass = {
						className,
						instructorName,
						instructorEmail,
						availableSeats: parseInt(availableSeats),
						price: parseFloat(price),
						image: imgURL,
						enrolledStudents: 0,
						status: 'pending',
					};
					axiosSecure.post('/classes', newClass).then((data) => {
						if (data.data.insertedId) {
							reset();
						}
					});
				}
			});
	};

	return (
		<div className="w-4/5">
			<h2 className="text-3xl text-center mb-5">Add A Class</h2>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="border-2 border-black p-3 rounded-lg"
			>
				<div className="form-control w-full">
					<label className="label">
						<span className="label-text font-semibold text-black">
							Class name
						</span>
					</label>
					<input
						type="text"
						placeholder="Class Name"
						{...register('className', {
							required: true,
						})}
						className="input input-bordered w-full"
					/>
				</div>

				<div className="flex items-center space-x-5">
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text font-semibold text-black">
								Instructor name
							</span>
						</label>
						<input
							type="text"
							value={user?.displayName}
							{...register('instructorName', {
								defaultValue: user?.displayName,
							})}
							className="input input-bordered w-full"
						/>
					</div>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text font-semibold text-black">
								Instructor Email
							</span>
						</label>
						<input
							type="text"
							value={user?.email}
							{...register('instructorEmail', {
								defaultValue: user?.email,
							})}
							className="input input-bordered w-full"
						/>
					</div>
				</div>
				<div className="flex items-center space-x-5">
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text font-semibold text-black">
								Price
							</span>
						</label>
						<input
							type="number"
							placeholder="Price"
							{...register('price', {
								required: true,
							})}
							className="input input-bordered w-full"
						/>
					</div>
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text font-semibold text-black">
								Available Seats
							</span>
						</label>
						<input
							type="number"
							placeholder="How many seats are available?"
							{...register('availableSeats', {
								required: true,
							})}
							className="input input-bordered w-full"
						/>
					</div>
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text font-semibold text-black">
							Class Image
						</span>
					</label>
					<input
						type="file"
						name="image"
						{...register('image', { required: true })}
						className="file-input file-input-bordered file-input-sm w-full max-w-sm"
					/>
				</div>
				<div className="flex justify-end">
					<input
						className="btn btn-outline btn-sm text-center mt-5 hover:bg-black"
						type="submit"
						value="Add Class"
					/>
				</div>
			</form>
		</div>
	);
};

export default AddClasses;
