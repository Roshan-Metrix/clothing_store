import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className="relative min-h-screen text-slate-100 overflow-hidden">
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				{/* Title */}
				<h1 className="text-center text-5xl sm:text-6xl font-extrabold text-blue-400 mb-4 drop-shadow-lg">
					Explore Our Categories
				</h1>

				{/* Subtitle */}
				<p className="text-center text-lg sm:text-xl text-slate-300 mb-12">
					Discover the latest trends in modern and sustainable fashion
				</p>

				{/* Categories grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{/* Featured Products */}
				{!isLoading && products.length > 0 && (
					<div className="mt-16">
						<h2 className="text-3xl font-semibold text-blue-300 mb-8 text-center">
							Featured Products
						</h2>
						<FeaturedProducts featuredProducts={products} />
					</div>
				)}
			</div>

			{/* Background gradient */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.2)_0%,rgba(30,58,138,0.25)_45%,rgba(2,6,23,0.9)_100%)]"></div>
		</div>
	);
};

export default HomePage;
