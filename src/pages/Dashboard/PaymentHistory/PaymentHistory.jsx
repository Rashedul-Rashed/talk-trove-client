import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
	const { user } = useContext(AuthContext);
	const [axiosSecure] = useAxiosSecure();
	const { data: paymentHistory = [] } = useQuery({
		queryKey: ['paymentHistory', user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(
				`/payments/paymenthistory/${user?.email}`
			);
			return res.data;
		},
	});
	return (
		<div>
			<h2 className="text-center mb-5 text-3xl">Payment History</h2>
			<div className="overflow-x-auto">
				<table className="table border-2 border-black">
					{/* head */}
					<thead className="bg-base-200 text-black">
						<tr>
							<th>#</th>
							<th>Class Name</th>
							<th>Transaction Id</th>
							<th>Price</th>
							<th>Date</th>
						</tr>
					</thead>
					<tbody>
						{paymentHistory.map((payment, index) => (
							<tr key={payment._id}>
								<th>{index + 1}</th>
								<td>
									<div className="flex items-center space-x-3">
										<div className="avatar">
											<div className="mask mask-squircle w-12 h-12">
												<img
													src={payment.image}
													alt="Avatar Tailwind CSS Component"
												/>
											</div>
										</div>
										<div>
											<div className="font-bold">
												{payment.className}
											</div>
										</div>
									</div>
								</td>
								<td>
									<div>{payment.transactionId}</div>
								</td>
								<td>${payment.price}</td>
								<td>{payment.date}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PaymentHistory;
