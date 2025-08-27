import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('restaurants');

  const [restaurantData, setRestaurantData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  const [counts, setCounts] = useState({ restaurants: 0, users: 0, orders: 0, totalPayments: 0, });

  useEffect(() => {
    fetchRestaurants();
    fetchUsers();
    fetchOrders();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await axios.get('http://localhost:5000/restaurants');
      setRestaurantData(res.data);
      setCounts(prev => ({ ...prev, restaurants: res.data.length }));
    } catch (err) {
      console.error('Failed to fetch restaurants:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users');
      setUserData(res.data);
      setCounts(prev => ({ ...prev, users: res.data.length }));
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/orders');
      const orders = res.data;
      const totalPayments = orders.reduce((acc, curr) => acc + curr.amount, 0);
      setOrdersData(orders);
      setCounts(prev => ({ ...prev, orders: orders.length, totalPayments, }));
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    }
  };

  const renderTable = () => {
    switch (activeTab) {
      case 'restaurants':
        return (
          <table className="table table-bordered table-striped mt-3">
            <thead className="table-dark">
              <tr align="center">
                <th>S.No</th>
                <th>ID</th>
                <th>Restaurant Name</th>
                <th>Address</th>
                <th>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {restaurantData.length === 0 ? <h3 className="mt-4">No restaurants yet.</h3> : restaurantData.map((res, index) => (
                <tr key={res.id}>
                  <td>{index + 1}</td>
                  <td>{res.id}</td>
                  <td>{res.name}</td>
                  <td>{res.address}</td>
                  <td>{res.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'users':
        return (
          <table className="table table-bordered table-striped mt-3">
            <thead className="table-dark">
              <tr align="center">
                <th>S.No</th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                {/* <th>Mobile Number</th>
                <th>Address</th> */}
              </tr>
            </thead>
            <tbody>
              {userData.length === 0 ? <h3 className="mt-4">No users yet.</h3> : userData.map((user, index) => (
                <tr key={user.id} align="center">
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  {/* <td>{user.mobile}</td> */}
                  {/* <td>{user.address}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        );

      case 'orders':
        return (
          <table className="table table-bordered table-striped mt-3">
            <thead className="table-dark">
              <tr align="center">
                <th>S.No</th>
                <th>Restaurant (ID)</th>
                <th>User (ID)</th>
                <th>Items Ordered</th>
                <th>Amount</th>
                <th>Delivery Status</th>
              </tr>
            </thead>
            <tbody>
              {ordersData.length === 0 ? <h3 className="mt-4">No orders yet.</h3> : ordersData.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.restaurantName} ({order.restaurantId})</td>
                  <td>{order.userName} ({order.userId})</td>
                  <td>{order.items.join(', ')}</td>
                  <td>₹{order.amount}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid">
      <AdminNavbar /><br />
      <div className="row mb-4">
        <div className="col-md-4">
          <div className={`card text-white ${activeTab === 'restaurants' ? 'bg-primary' : 'bg-secondary'}`}
            onClick={() => setActiveTab('restaurants')}
            style={{ cursor: 'pointer' }}>
            <div className="card-body text-center">
              <h5 className="card-title">Restaurants</h5>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className={`card text-white ${activeTab === 'users' ? 'bg-primary' : 'bg-secondary'}`}
            onClick={() => setActiveTab('users')}
            style={{ cursor: 'pointer' }}>
            <div className="card-body text-center">
              <h5 className="card-title">Users</h5>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className={`card text-white ${activeTab === 'orders' ? 'bg-primary' : 'bg-secondary'}`}
            onClick={() => setActiveTab('orders')}
            style={{ cursor: 'pointer' }}>
            <div className="card-body text-center">
              <h5 className="card-title">Orders & Payments</h5>
            </div>
          </div>
        </div>
      </div>

      <div>{renderTable()}</div>
    </div>
  );
};

export default AdminDashboard;
