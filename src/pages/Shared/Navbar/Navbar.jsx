import { Link } from 'react-router-dom';
import logoWhite from '../../../assets/logoWhite.png';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { IoMdLogOut } from 'react-icons/io';

const Navbar = () => {
	const { user, logOut } = useContext(AuthContext);

	const navOptions = (
		<>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/instructors">Instructors</Link>
			</li>
			<li>
				<Link to="/classes">Classes</Link>
			</li>
			{user && (
				<li>
					<Link to="/dashboard">Dashboard</Link>
				</li>
			)}
		</>
	);

	const handleLogOut = () => {
		logOut()
			.then()
			.catch((error) => console.log(error));
	};

	return (
		<div className="navbar fixed z-10 max-w-screen-xl bg-black text-white">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-black rounded-box w-52"
					>
						{navOptions}
					</ul>
				</div>
				<Link to="/">
					<img className="w-[150px]" src={logoWhite} alt="" />
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">{navOptions}</ul>
			</div>
			<div className="navbar-end">
				{user ? (
					<>
						<div className="avatar">
							<div className="w-12 rounded-full ring ring-white">
								<img src={user?.photoURL} />
							</div>
						</div>
						<div
							className="tooltip tooltip-bottom tooltip-error"
							data-tip="Log out"
						>
							<IoMdLogOut
								onClick={handleLogOut}
								className="w-8 h-8 ml-5"
							/>
						</div>
					</>
				) : (
					<>
						<Link to="/login">
							<button className="btn btn-sm btn-outline bg-white text-black border-0 hover:bg-orange-600 hover:text-white mr-2">
								Login
							</button>
						</Link>
						<Link to="/signup">
							<button className="btn btn-sm btn-outline bg-white text-black border-0 hover:bg-orange-600 hover:text-white">
								Sign Up
							</button>
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default Navbar;
