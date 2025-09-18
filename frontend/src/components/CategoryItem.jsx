import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
	return (
		<div className="relative overflow-hidden h-96 w-full rounded-lg group shadow-md hover:shadow-xl transition-shadow duration-300">
			<Link to={"/category" + category.href}>
				<div className="w-full h-full cursor-pointer relative">
					{/* Overlay */}
					<div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/70 z-10" />

					{/* Image */}
					<img
						src={category.imageUrl}
						alt={category.name}
						className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
						loading="lazy"
					/>

					{/* Text */}
					<div className="absolute bottom-0 left-0 right-0 p-6 z-20">
						<h3 className="text-2xl font-bold text-blue-600 drop-shadow-md">{category.name}</h3>
						<p className="text-slate-200 text-sm">Explore {category.name}</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default CategoryItem;
