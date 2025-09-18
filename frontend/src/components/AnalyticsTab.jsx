import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import LoadingSpinner from "./LoadingSpinner";

const AnalyticsTab = () => {
	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [dailySalesData, setDailySalesData] = useState([]);

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const response = await axios.get("/analytics");
				setAnalyticsData(response.data.analyticsData);
				setDailySalesData(response.data.dailySalesData);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnalyticsData();
	}, []);

	if (isLoading) return <LoadingSpinner />;

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			{/* Summary Cards */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8'>
				<AnalyticsCard title='Total Users' value={analyticsData.users.toLocaleString()} icon={Users} color='from-emerald-500 to-teal-700' />
				<AnalyticsCard title='Total Products' value={analyticsData.products.toLocaleString()} icon={Package} color='from-emerald-500 to-green-700' />
				<AnalyticsCard title='Total Sales' value={analyticsData.totalSales.toLocaleString()} icon={ShoppingCart} color='from-emerald-500 to-cyan-700' />
				<AnalyticsCard title='Total Revenue' value={`$${analyticsData.totalRevenue.toLocaleString()}`} icon={DollarSign} color='from-emerald-500 to-lime-700' />
			</div>

			{/* Daily Sales Chart */}
			<motion.div
				className='bg-gray-800 rounded-lg p-6 shadow-lg'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.25 }}
			>
				<ResponsiveContainer width='100%' height={400}>
					<LineChart data={dailySalesData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='name' stroke='#D1D5DB' />
						<YAxis yAxisId='left' stroke='#10B981' label={{ value: 'Sales', angle: -90, position: 'insideLeft', fill: '#10B981' }} />
						<YAxis yAxisId='right' orientation='right' stroke='#3B82F6' label={{ value: 'Revenue', angle: 90, position: 'insideRight', fill: '#3B82F6' }} />
						<Tooltip />
						<Legend />
						<Line yAxisId='left' type='monotone' dataKey='sales' stroke='#10B981' activeDot={{ r: 8 }} name='Sales' />
						<Line yAxisId='right' type='monotone' dataKey='revenue' stroke='#3B82F6' activeDot={{ r: 8 }} name='Revenue' />
					</LineChart>
				</ResponsiveContainer>
			</motion.div>
		</div>
	);
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
	<motion.div
		className={`relative overflow-hidden rounded-lg p-6 shadow-lg bg-gradient-to-r ${color}`}
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<div className='relative z-10'>
			<p className='text-sm font-semibold text-emerald-200 mb-1'>{title}</p>
			<h3 className='text-white text-3xl font-bold'>{value}</h3>
		</div>
		<div className='absolute -bottom-4 -right-4 text-white opacity-20'>
			<Icon className='h-32 w-32' />
		</div>
	</motion.div>
);
