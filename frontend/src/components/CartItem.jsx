import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	return (
		<div className="rounded-lg border p-4 shadow-sm border-slate-200 bg-slate-50 md:p-6">
			<div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
				<div className="shrink-0 md:order-1">
					<img className="h-20 md:h-32 rounded object-cover" src={item.image} alt={item.name} />
				</div>
				<label className="sr-only">Choose quantity:</label>

				<div className="flex items-center justify-between md:order-3 md:justify-end">
					<div className="flex items-center gap-2">
						<button
							className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border
							 border-slate-300 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2
							  focus:ring-blue-500"
							onClick={() => updateQuantity(item._id, item.quantity - 1)}
						>
							<Minus className="text-gray-600" size={14} />
						</button>
						<p className="text-gray-800 font-medium">{item.quantity}</p>
						<button
							className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border
							 border-slate-300 bg-slate-100 hover:bg-slate-200 focus:outline-none 
						focus:ring-2 focus:ring-blue-500"
							onClick={() => updateQuantity(item._id, item.quantity + 1)}
						>
							<Plus className="text-gray-600" size={14} />
						</button>
					</div>

					<div className="text-end md:order-4 md:w-32">
						<p className="text-base font-bold text-blue-600">${item.price}</p>
					</div>
				</div>

				<div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
					<p className="text-base font-medium text-gray-900 hover:text-blue-600 hover:underline">
						{item.name}
					</p>
					<p className="text-sm text-gray-500">{item.description}</p>

					<div className="flex items-center gap-4">
						<button
							className="inline-flex items-center text-sm font-medium text-red-600
							 hover:text-red-500 hover:underline"
							onClick={() => removeFromCart(item._id)}
						>
							<Trash size={16} />
							<span className="ml-1">Remove</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default CartItem;
