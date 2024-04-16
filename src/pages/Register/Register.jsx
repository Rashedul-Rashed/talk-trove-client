/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import registerbg from '../../assets/images/register.jpg';
import { FcGoogle } from 'react-icons/fc';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const Register = () => {
	const { createUser, updateUserProfile, signInWithGoogle } =
		useContext(AuthContext);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		if (data.password !== data.confirmPassword) {
			return alert("Password didn't matched!");
		}
		const image = data.photo[0];
		const formData = new FormData();
		formData.append('image', image);
		const url = `https://api.imgbb.com/1/upload?key=${
			import.meta.env.VITE_IMGBB_KEY
		}`;

		try {
			const res = await fetch(url, {
				method: 'POST',
				body: formData,
			});

			const imgData = await res.json();
			const imageUrl = imgData.data.display_url;

			try {
				const result = await createUser(data.email, data.password);
				const createdUser = result.user;

				// Update the user's profile with the image URL
				try {
					await updateUserProfile(data.name, imageUrl);
					const saveUser = {
						name: data.name,
						email: data.email,
						image: imageUrl,
						role: 'student',
					};
					fetch(
						'https://assignment-12-server-rashed1879.vercel.app/users',
						{
							method: 'POST',
							headers: {
								'content-type': 'application/json',
							},
							body: JSON.stringify(saveUser),
						}
					)
						.then((res) => res.json())
						.then((data) => {
							if (data.insertedId) {
								navigate('/login');
							}
						});
				} catch (error) {
					console.log(error);
				}
			} catch (error) {
				console.log(error);
			}

			reset();
		} catch (error) {
			console.log(error);
		}
	};

	const handleGoogleSignIn = () => {
		signInWithGoogle()
			.then((result) => {
				const user = result.user;

				const saveUser = {
					name: user.displayName,
					email: user.email,
					image: user.photoURL,
					role: 'student',
				};
				fetch(
					'https://assignment-12-server-rashed1879.vercel.app/users',
					{
						method: 'POST',
						headers: {
							'content-type': 'application/json',
						},
						body: JSON.stringify(saveUser),
					}
				)
					.then((res) => res.json())
					.then(() => {
						navigate('/');
					});
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<>
			<div className="bg-base-200">
				<h2 className="text-center py-5 text-5xl font-bold text-black">
					Sign Up
				</h2>
				<div className="flex items-center flex-row-reverse m-16">
					<div className="card w-[500px] mx-auto mb-8 shadow-2xl bg-white border-2 border-black">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="card-body"
						>
							<div className="form-control font-bold text-2xl text-black flex flex-col items-center justify-center text-center">
								Sign Up
								<div
									onClick={handleGoogleSignIn}
									className="font-bold flex items-center border-2 border-black p-2 mt-2 rounded-lg cursor-pointer"
								>
									<FcGoogle className="text-5xl mx-auto cursor-pointer mr-2" />
									<p>Continue With Google</p>
								</div>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text text-xl font-bold text-black">
										Name
									</span>
								</label>
								<input
									type="text"
									name="name"
									placeholder="Your Name"
									{...register('name', { required: true })}
									className="input border-2 border-black"
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text text-xl font-bold text-black">
										Photo
									</span>
								</label>
								<input
									type="file"
									name="photo"
									{...register('photo', { required: true })}
									className="file-input file-input-bordered file-input-sm w-full max-w-xs"
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text text-xl font-bold text-black">
										Email
									</span>
								</label>
								<input
									type="email"
									placeholder="email"
									name="email"
									{...register('email', { required: true })}
									className="input border-2 border-black"
									required
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text text-xl font-bold text-black">
										Password
									</span>
								</label>
								<input
									type="password"
									placeholder="password"
									name="password"
									{...register('password', {
										required: true,
										minLength: 6,
										pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
									})}
									className="input border-2 border-black"
								/>
								{errors.password?.type === 'minLength' && (
									<p className="text-red-600">
										Password must be 6 characters
									</p>
								)}
								{errors.password?.type === 'pattern' && (
									<p className="text-red-600">
										Password must have one Uppercase and one
										special character.
									</p>
								)}
								<label className="label"></label>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text text-xl font-bold text-black">
										Confirm Password
									</span>
								</label>
								<input
									type="password"
									placeholder="re-type your password"
									name="confirmPassword"
									{...register('confirmPassword', {
										required: true,
									})}
									className="input border-2 border-black"
									required
								/>
								<p className="mt-2 text-orange-600">
									Already have an account?{' '}
									<Link
										className="link link-hover font-bold text-blue-700"
										to="/login"
									>
										Please Login
									</Link>
								</p>
								<p className="text-error"></p>
							</div>
							<div className="form-control mt-6">
								<button className="btn bg-black text-white hover:text-black hover:bg-white rounded-full">
									Sign Up
								</button>
							</div>
						</form>
					</div>
					<div>
						<img className="w-[500px]" src={registerbg} alt="" />
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
