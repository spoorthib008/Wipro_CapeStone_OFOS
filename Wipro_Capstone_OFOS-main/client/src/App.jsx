import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import PublicNavbar from "./components/PublicNavbar";
import Footer from "./components/Footer";
import AdminDashboard from "./components/admin/AdminDashboard";
import Reports from "./components/admin/Reports";
import RefundAndDisputes from "./components/admin/RefundAndDisputes";
import Restaurant from "./components/customer/customerdashboard/pages/Restaurant";
import Restaurants from "./components/customer/customerdashboard/pages/Restaurants";
import Cart from "./components/customer/customerdashboard/pages/Cart";
import Checkout from "./components/customer/customerdashboard/pages/Checkout";
import Orders from "./components/customer/customerdashboard/pages/Orders";
import Profile from "./components/customer/customerdashboard/pages/Profile";
import NotFound from "./components/customer/customerdashboard/pages/NotFound";
import { AuthProvider } from "./components/customer/customerdashboard/context/AuthContext";
import { CartProvider } from "./components/customer/customerdashboard/context/CartContext";
import TopNav from "./components/customer/customerdashboard/components/TopNav";
import ProtectedRoute from "./components/customer/customerdashboard/components/ProtectedRoute"
import AdminNavbar from "./components/admin/AdminNavbar";

const App = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwtToken'));

  const handleLoginSuccess = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userRole');
    setUserRole(null);
    setIsLoggedIn(false);
  };

  const renderNavbar = () => {
    if (!isLoggedIn) {
      return <PublicNavbar />;
    }
    switch (userRole) {
      case 'admin':
        return <AdminNavbar onLogout={handleLogout} />;
      case 'owner':
        return <RestaurantNavbar onLogout={handleLogout} />;
      case 'customer':
        return <CustomerNavbar onLogout={handleLogout} />;
      default:
        return <PublicNavbar />;
    }
  };

  return (
      <div className="flex flex-col min-h-screen">
        {renderNavbar()} <br/>
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Registration />} />
            
            {isLoggedIn ? (
              <>
                {userRole === 'customer' && (
                  <>
                    <Route path="/" element={<div>Customer Dashboard: Restaurant Listing, Search & Filters</div>} />
                    <Route path="/orders" element={<div>Customer Orders History</div>} />
                    <Route path="/profile" element={<div>Customer Profile</div>} />
                  </>
                )}
                {userRole === 'owner' && (
                  <>
                    <Route path="/" element={<div>Restaurant Owner Dashboard: Active Orders</div>} />
                    <Route path="/owner/menu" element={<div>Menu Editor</div>} />
                    <Route path="/owner/orders" element={<div>Order Management</div>} />
                    <Route path="/owner/profile" element={<div>Restaurant Owner Profile</div>} />
                  </>
                )}
                {userRole === 'admin' && (
                  <>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/reports" element={<Reports />} />
                    <Route path="/admin/refund" element={<RefundAndDisputes />} />
                  </>
                )}
              </>
            ) : (
              <Route path="*" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            )}
          </Routes>

          <AuthProvider>
                <CartProvider>
                  <TopNav />
                  <div className="container py-3">
                    <Routes>
                      <Route path="/" element={<Navigate to="/restaurants" replace />} />
                     
                      
          
                      <Route element={<ProtectedRoute />}>
                        <Route path="/restaurants" element={<Restaurants />} />
                        <Route path="/restaurants/:id" element={<Restaurant />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/profile" element={<Profile />} />
                      </Route>
          
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </CartProvider>
              </AuthProvider>
        </main>
        <Footer />
      </div>
  );
};

export default App;