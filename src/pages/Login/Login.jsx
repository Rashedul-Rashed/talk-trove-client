/* eslint-disable no-unused-vars */
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import loginbg from '../../assets/images/login.jpg';
import { useContext, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { AuthContext } from '../../providers/AuthProvider';

const Login = () => {
	const { signIn, signInWithGoogle, updateUserProfile } =
		useContext(AuthContext);
	const { register, handleSubmit } = useForm();
	const [showPassword, setShowPassword] = useState(true);
	const location = useLocation();
	const from = location.state?.from?.pathname || '/';
	const navigate = useNavigate();

	const onSubmit = (data) => {
		signIn(data.email, data.password)
			.then((result) => {
				const loggedUser = result.user;
				navigate(from, { replace: true });
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleGoogleSignIn = () => {
		signInWithGoogle()
			.then((result) => {
				const user = result.user;
				console.log(user);
				navigate(from, { replace: true });
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<>
			<div className="bg-base-200">
				<h2 className="text-center py-5 text-5xl font-bold text-black">
					Sign In
				</h2>
				<div className="flex items-center justify-center m-16">
					<div className="card w-[500px] mx-auto mb-8 shadow-2xl bg-white border-2 border-black">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="card-body"
						>
							<div className="form-control font-bold text-2xl text-black flex flex-col items-center justify-center text-center">
								Sign In
								<div
									onClick={handleGoogleSignIn}
									className="font-bold flex items-center border-2 border-black p-2 mt-2 rounded-lg cursor-pointer"
								>
									<FcGoogle className="text-5xl mx-auto cursor-pointer mr-2" />
									<p>Continue With Google</p>
								</div>
							</div>
							<div className="divider font-bold text-black">
								OR
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
								/>
							</div>
							<div className="form-control">
								<label className="label">
									<span className="label-text text-xl font-bold text-black">
										Password
									</span>
								</label>
								<div className="relative">
									<input
										type={
											showPassword ? 'password' : 'text'
										}
										placeholder="password"
										name="password"
										{...register('password', {
											required: true,
										})}
										className="input border-2 border-black w-full"
									/>
									<div
										className="absolute inset-y-0 right-3 flex items-center cursor-pointer "
										onClick={() =>
											setShowPassword(!showPassword)
										}
									>
										{showPassword ? (
											<FaRegEye />
										) : (
											<FaRegEyeSlash />
										)}
									</div>
								</div>
								<p className="mt-2 text-orange-600">
									New to this Website?{' '}
									<Link
										className="link link-hover font-bold text-blue-700"
										to="/signup"
									>
										Please Register
									</Link>
								</p>
							</div>

							<p className="text-error"></p>
							<div className="form-control mt-6">
								<button className="btn bg-black text-white hover:bg-white hover:text-black rounded-full">
									Sign In
								</button>
							</div>
						</form>
					</div>
					<div className="w-[500px]">
						<img className="w-full" src={loginbg} alt="" />
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
