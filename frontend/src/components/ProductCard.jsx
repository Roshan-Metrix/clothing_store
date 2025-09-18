import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();

	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		}
		addToCart(product);
	};

	return (
		<div className="flex w-full flex-col overflow-hidden rounded-lg border border-slate-700 shadow-lg bg-slate-800">
			<div className="relative mx-3 mt-3 h-60 overflow-hidden rounded-xl">
				<img
					className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
					src={product.image}
					alt={product.name}
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900 opacity-30" />
			</div>

			<div className="mt-4 px-5 pb-5">
				<h5 className="text-xl font-semibold tracking-tight text-white">{product.name}</h5>
				<div className="mt-2 mb-5 flex items-center justify-between">
					<p className="text-3xl font-bold text-blue-500">${product.price}</p>
				</div>
				<button
					className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white 
					 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
					onClick={handleAddToCart}
				>
					<ShoppingCart size={22} className="mr-2" />
					Add to cart
				</button>
			</div>
		</div>
	);
};

export default ProductCard;
