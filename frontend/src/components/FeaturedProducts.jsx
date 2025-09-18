import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(4);

	const { addToCart } = useCartStore();

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 640) setItemsPerPage(1);
			else if (window.innerWidth < 1024) setItemsPerPage(2);
			else if (window.innerWidth < 1280) setItemsPerPage(3);
			else setItemsPerPage(4);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex + itemsPerPage >= featuredProducts.length ? 0 : prevIndex + itemsPerPage
		);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex - itemsPerPage < 0 ? Math.max(featuredProducts.length - itemsPerPage, 0) : prevIndex - itemsPerPage
		);
	};

	const slideWidth = 100 / itemsPerPage;

	return (
		<div className='py-12'>
			<div className='container mx-auto px-4'>
				<h2 className='text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4'>Featured</h2>
				<div className='relative'>
					<div className='overflow-hidden'>
						<div
							className='flex transition-transform duration-500 ease-in-out'
							style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
						>
							{featuredProducts?.map((product) => (
								<div
									key={product._id}
									className='flex-shrink-0 px-2'
									style={{ width: `${slideWidth}%` }}
								>
									<div className='bg-white bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-emerald-500/30'>
										<div className='overflow-hidden'>
											<img
												src={product.image}
												alt={product.name}
												className='w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110'
											/>
										</div>
										<div className='p-4'>
											<h3 className='text-lg font-semibold mb-2 text-white'>{product.name}</h3>
											<p className='text-emerald-300 font-medium mb-4'>${product.price.toFixed(2)}</p>
											<button
												onClick={() => addToCart(product)}
												className='w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center'
											>
												<ShoppingCart className='w-5 h-5 mr-2' />
												Add to Cart
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Navigation */}
					<button
						onClick={prevSlide}
						className='absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-colors duration-300'
					>
						<ChevronLeft className='w-6 h-6' />
					</button>
					<button
						onClick={nextSlide}
						className='absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white transition-colors duration-300'
					>
						<ChevronRight className='w-6 h-6' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default FeaturedProducts;
