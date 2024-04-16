import { NavLink, Outlet } from 'react-router-dom';
import { FaUsers, FaHome } from 'react-icons/fa';
import { SiGoogleclassroom } from 'react-icons/si';
import { BiAddToQueue, BiSelectMultiple } from 'react-icons/bi';
import { BsListCheck, BsWalletFill } from 'react-icons/bs';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';

const Dashboard = () => {
	// TODO: load data from the server to have dynamic isAdmin based on Data
	const [isAdmin] = useAdmin();
	const [isInstructor] = useInstructor();

	return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col items-center mt-5">
				<Outlet></Outlet>
				<label
					htmlFor="my-drawer-2"
					className="btn btn-primary drawer-button lg:hidden"
				>
					Open drawer
				</label>
			</div>
			<div className="drawer-side">
				<label htmlFor="my-drawer-2" className="drawer-overlay"></label>
				<ul className="menu p-4 w-80 h-full bg-base-200 text-black">
					{/* Sidebar content here */}
					<h2 className="text-center text-3xl font-bold bg-white mb-5">
						Talk Trove
					</h2>

					<div>
						{isAdmin ? (
							<>
								<li>
									<NavLink
										to="/"
										className={({ isActive }) =>
											isActive
												? 'pb-1 border-b-2 border-[#262A53] hover:border-[#FFA0A0]'
												: ''
										}
									>
										<FaHome />
										Home
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/dashboard/manageusers"
										className={({ isActive }) =>
											isActive
												? 'pb-1 border-b-2 border-[#262A53] hover:border-[#FFA0A0]'
												: ''
										}
									>
										<FaUsers />
										Manage Users
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/dashboard/manageclasses"
										className={({ isActive }) =>
											isActive
												? 'pb-1 border-b-2 border-black hover:border-[#FFA0A0]'
												: ''
										}
									>
										<SiGoogleclassroom />
										Manage Classes
									</NavLink>
								</li>
							</>
						) : isInstructor ? (
							<>
								<li>
									<NavLink
										to="/"
										className={({ isActive }) =>
											isActive
												? 'pb-1 border-b-2 border-[#262A53] hover:border-[#FFA0A0]'
												: ''
										}
									>
										<FaHome />
										Home
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/dashboard/addclass"
										className={({ isActive }) =>
											isActive
												? 'pb-1 border-b-2 border-[#262A53] hover:border-[#FFA0A0]'
												: ''
										}
									>
										<BiAddToQueue />
										Add a class
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/dashboard/myclasses"
										className={({ isActive }) =>
											isActive
												? 'pb-1 border-b-2 border-black hover:border-[#FFA0A0]'
												: ''
										}
									>
										<SiGoogleclassroom />
										My Classes
									</NavLink>
								</li>
							</>
						) : (
							<>
								<li>
									<NavLink
										to="/"
										className={({ isActive }) =>
											isActive
												? 'pb-1 border-b-2 border-[#262A53] hover:border-[#FFA0A0]'
												: ''
										}
									>
										<FaHome />
										Home
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/dashboard/myselectedclasses"
										className={({ isActive }) =>
											isActive
												? 'pb-1 border-b-2 border-[#262A53] hover:border-[#FFA0A0]'
												: ''
										}
									>
										<BiSelectMultiple />
										My Selected Classes
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/dashboard/myenrolledclasses"
										className={({ isActive }) =>
											isActive
												? 'pb-1 border-b-2 border-black hover:border-[#FFA0A0]'
												: ''
										}
									>
										<BsListCheck />
										My Enrolled Classes
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/dashboard/paymenthistory"
										className={({ isActive }) =>
											isActive
												? 'pb-1 border-b-2 border-black hover:border-[#FFA0A0]'
												: ''
										}
									>
										<BsWalletFill />
										Payment History
									</NavLink>
								</li>
							</>
						)}
					</div>
				</ul>
			</div>
		</div>
	);
};

export default Dashboard;
