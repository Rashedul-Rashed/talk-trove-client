/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import errorImg from '../../assets/images/error.jpg';

const ErrorPage = () => {
	return (
		<>
			<section className="flex items-center h-screen p-16 bg-base-200">
				<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
					<div className="max-w-lg text-center mb-5">
						<img src={errorImg} alt="" />
					</div>
					<Link
						to="/"
						className="px-8 py-3 font-semibold rounded bg-black text-white"
					>
						Back to Home
					</Link>
				</div>
			</section>
		</>
	);
};

export default ErrorPage;
