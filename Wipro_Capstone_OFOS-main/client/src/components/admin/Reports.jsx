import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const Reports = () => {
    const [counts, setCounts] = useState({ restaurants: 0, users: 0, orders: 0, totalPayments: 0, });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const resRestaurants = await axios.get('http://localhost:5000/restaurants');
            const resUsers = await axios.get('http://localhost:5000/users');
            const resOrders = await axios.get('http://localhost:5000/orders');

            const totalPayments = resOrders.data.reduce((acc, curr) => acc + curr.amount, 0);

            setCounts({
                restaurants: resRestaurants.data.length || 0,
                users: resUsers.data.length || 0,
                orders: resOrders.data.length || 0,
                totalPayments,
            });
        } catch (err) {
            console.error('Error fetching reports:', err);
        }
    };

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-3">
                    <div className="card text-white bg-primary mb-3">
                        <div className="card-body text-center">
                            <h5 className="card-title">Total Restaurants</h5>
                            <p className="display-6">{counts.restaurants}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-white bg-success mb-3">
                        <div className="card-body text-center">
                            <h5 className="card-title">Total Users</h5>
                            <p className="display-6">{counts.users}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-white bg-warning mb-3">
                        <div className="card-body text-center">
                            <h5 className="card-title">Total Orders</h5>
                            <p className="display-6">{counts.orders}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="card text-white bg-danger mb-3">
                        <div className="card-body text-center">
                            <h5 className="card-title">Total Payments</h5>
                            <p className="display-6">₹{counts.totalPayments}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reports
