/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './CheckoutForm.css';
import { useContext } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useEffect } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';

const CheckoutForm = ({ selectedClass }) => {
	const { user } = useContext(AuthContext);
	const [axiosSecure] = useAxiosSecure();
	const stripe = useStripe();
	const elements = useElements();
	const [clientSecret, setClientSecret] = useState('');
	const [cardError, setCardError] = useState('');

	useEffect(() => {
		if (selectedClass?.price) {
			axiosSecure
				.post('/create-payment-intent', {
					price: selectedClass?.price,
				})
				.then((res) => {
					setClientSecret(res.data.clientSecret);
				});
		}
	}, [selectedClass, axiosSecure]);

	const handleSubmit = async (event) => {
		// Block native form submission.
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}

		// Get a reference to a mounted CardElement. Elements knows how
		// to find your CardElement because there can only ever be one of
		// each type of element.
		const card = elements.getElement(CardElement);

		if (card == null) {
			return;
		}

		// Use your card Element with other Stripe.js APIs
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card,
		});

		if (error) {
			console.log('[error]', error);
			setCardError(error.message);
		} else {
			console.log('[PaymentMethod]', paymentMethod);
		}

		const { paymentIntent, error: confirmError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						name: user?.displayName || 'anonymous',
						email: user?.email || 'unknown',
					},
				},
			});

		if (confirmError) {
			console.log('[error]', confirmError);
			setCardError(confirmError.message);
		} else {
			if (paymentIntent.status === 'succeeded') {
				const paymentInfo = {
					...selectedClass,
					transactionId: paymentIntent.id,
					date: new Date(),
				};

				axiosSecure.post('/payments', paymentInfo).then((res) => {
					if (res.data.result.insertedId) {
						alert('payment successfull');
						event.target.reset();
					}
				});
			}
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: '16px',
								color: '#424770',
								'::placeholder': {
									color: '#aab7c4',
								},
							},
							invalid: {
								color: '#9e2146',
							},
						},
					}}
				/>
				<button
					className="btn btn-sm mt-5 bg-gray-700 text-white hover:bg-black "
					type="submit"
					disabled={!stripe}
				>
					Pay
				</button>
			</form>
			{cardError && <p className="text-red-600 ml-8">{cardError}</p>}
		</>
	);
};

export default CheckoutForm;
