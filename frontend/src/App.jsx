import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import Navbar from "./components/Navbar";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

import { useUserStore } from "./stores/useUserStore";
import { useCartStore } from "./stores/useCartStore";

function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();
	const { getCartItems } = useCartStore();

	// check authentication on mount
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	// load cart items if user exists
	useEffect(() => {
		if (user) getCartItems();
	}, [getCartItems, user]);

	if (checkingAuth) return <LoadingSpinner />;

	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
			{/* Background gradient (blue theme) */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute inset-0">
					<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full 
						bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.3)_0%,rgba(30,58,138,0.25)_45%,rgba(0,0,0,0.1)_100%)]" 
					/>
				</div>
			</div>

			{/* Main Content */}
			<div className="relative z-50 pt-20">
				<Navbar />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
					<Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
					<Route
						path="/secret-dashboard"
						element={user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />}
					/>
					<Route path="/category/:category" element={<CategoryPage />} />
					<Route path="/cart" element={user ? <CartPage /> : <Navigate to="/login" />} />
					<Route
						path="/purchase-success"
						element={user ? <PurchaseSuccessPage /> : <Navigate to="/login" />}
					/>
					<Route
						path="/purchase-cancel"
						element={user ? <PurchaseCancelPage /> : <Navigate to="/login" />}
					/>
				</Routes>
			</div>

			{/* Toast notifications */}
			<Toaster
				position="top-right"
				toastOptions={{
					style: {
						background: "#1e293b",
						color: "#f8fafc",
					},
				}}
			/>
		</div>
	);
}

export default App;
