import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PK);
const Payment = () => {
	const location = useLocation();
	const selectedClass = location.state;
	return (
		<div className="w-3/4 mx-auto">
			<h2 className="text-center text-4xl my-5">Payment</h2>
			<div className="border-2 border-black rounded-xl">
				<Elements stripe={stripePromise}>
					<CheckoutForm selectedClass={selectedClass}></CheckoutForm>
				</Elements>
			</div>
		</div>
	);
};

export default Payment;
