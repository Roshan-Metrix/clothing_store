import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
	"pk_test_51KZYccCoOZF2UhtOwdXQl3vcizup20zqKqT9hVUIsVzsdBrhqbUI2fE0ZdEVLdZfeHjeyFXtqaNsyCJCmZWnjNZa00PzMAjlcL"
);

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handlePayment = async () => {
		const stripe = await stripePromise;
		const res = await axios.post("/payments/create-checkout-session", {
			products: cart,
			couponCode: coupon ? coupon.code : null,
		});

		const session = res.data;
		const result = await stripe.redirectToCheckout({
			sessionId: session.id,
		});

		if (result.error) console.error("Stripe error:", result.error);
	};

	return (
		<motion.div
			className="space-y-4 rounded-lg border border-slate-700 bg-slate-800 p-6 shadow-md"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className="text-xl font-semibold text-blue-500">Order Summary</p>

			<div className="space-y-4">
				<div className="space-y-2">
					<dl className="flex items-center justify-between gap-4">
						<dt className="text-base font-normal text-slate-300">Original Price</dt>
						<dd className="text-base font-medium text-slate-100">${formattedSubtotal}</dd>
					</dl>

					{savings > 0 && (
						<dl className="flex items-center justify-between gap-4">
							<dt className="text-base font-normal text-slate-300">Savings</dt>
							<dd className="text-base font-medium text-blue-500">-${formattedSavings}</dd>
						</dl>
					)}

					{coupon && isCouponApplied && (
						<dl className="flex items-center justify-between gap-4">
							<dt className="text-base font-normal text-slate-300">Coupon ({coupon.code})</dt>
							<dd className="text-base font-medium text-blue-500">-{coupon.discountPercentage}%</dd>
						</dl>
					)}

					<dl className="flex items-center justify-between gap-4 border-t border-slate-600 pt-2">
						<dt className="text-base font-bold text-slate-100">Total</dt>
						<dd className="text-base font-bold text-blue-500">${formattedTotal}</dd>
					</dl>
				</div>

				<motion.button
					className="flex w-full items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
					whileHover={{ scale: 1.03 }}
					whileTap={{ scale: 0.97 }}
					onClick={handlePayment}
				>
					Proceed to Checkout
				</motion.button>

				<div className="flex items-center justify-center gap-2">
					<span className="text-sm font-normal text-slate-400">or</span>
					<Link
						to="/"
						className="inline-flex items-center gap-2 text-sm font-medium text-blue-500 underline hover:text-blue-400 hover:no-underline"
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default OrderSummary;
