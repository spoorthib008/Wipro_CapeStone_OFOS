import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';

const RefundAndDisputes = () => {
  const [refunds, setRefunds] = useState([]);
  const [disputes, setDisputes] = useState([]);
  const [view, setView] = useState('refunds');
  const [editingId, setEditingId] = useState(null);
  const [editedStatus, setEditedStatus] = useState('');

  useEffect(() => {
    fetchRefunds();
    fetchDisputes();
  }, []);

  const fetchRefunds = async () => {
    try {
      const response = await axios.get('http://localhost:5000/refunds');
      setRefunds(response.data);
    } catch (error) {
      console.error('Error fetching refunds:', error);
    }
  };

  const fetchDisputes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/disputes');
      setDisputes(response.data);
    } catch (error) {
      console.error('Error fetching disputes:', error);
    }
  };

  const handleEditClick = (id, currentStatus) => {
    setEditingId(id);
    setEditedStatus(currentStatus);
  };

  const handleStatusChange = (e) => {
    setEditedStatus(e.target.value);
  };

  const handleSave = async (id) => {
  try {
    const refundToUpdate = refunds.find((refund) => refund.id === id);
    if (!refundToUpdate) {
      alert('Refund not found!');
      return;
    }

    const updatedRefund = { ...refundToUpdate, status: editedStatus };

    await axios.put(`http://localhost:5000/refunds/${id}`, updatedRefund);

    alert('Status updated successfully!');

    setRefunds((prevRefunds) =>
      prevRefunds.map((refund) =>
        refund.id === id ? updatedRefund : refund
      )
    );

    setEditingId(null);
    setEditedStatus('');
  } catch (error) {
    console.error('PUT error:', error);
    alert('Something went wrong while updating the status!');
  }
};


  const renderRefunds = () => (
    <div className="mt-4" align="center">
      <h4>Refund Requests</h4>
      {refunds.length === 0 ? (
        <h5 className="text-muted mt-4">No refunds yet.</h5>
      ) : (
        <div className="table-responsive mt-3">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>User ID</th>
                <th>Restaurant ID</th>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {refunds.map((refund) => (
                <tr key={refund.id}>
                  <td>{refund.userId}</td>
                  <td>{refund.restaurantId}</td>
                  <td>{refund.orderId}</td>
                  <td>₹{refund.amount}</td>
                  <td>{refund.reason}</td>
                  <td>
                    {editingId === refund.id ? (
                      <select value={editedStatus} onChange={handleStatusChange} className="form-control"                      >
                        <option value="pending">Pending</option>
                        <option value="evaluating">Evaluating</option>
                        <option value="rejected">Rejected</option>
                        <option value="refund done">Refund Done</option>
                      </select>
                    ) : (
                      refund.status
                    )}
                  </td>
                  <td>
                    {editingId === refund.id ? (
                      <button className="btn btn-success btn-sm" onClick={() => handleSave(refund.id)}                      >
                        Save
                      </button>
                    ) : (
                      <button className="btn btn-primary btn-sm" onClick={() => handleEditClick(refund.id, refund.status)}                     >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderDisputes = () => (
    <div className="mt-4" align="center">
      <h4>Dispute (Complaints)</h4>
      {disputes.length === 0 ? (
        <h5 className="text-muted mt-4">No disputes(complaints) yet.</h5>
      ) : (
        <div className="table-responsive mt-3">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr align="center">
                <th>User ID</th>
                <th>Order ID</th>
                <th>Complaint</th>
              </tr>
            </thead>
            <tbody>
              {disputes.map((dispute) => (
                <tr key={dispute.id} align="center">
                  <td>{dispute.userId}</td>
                  <td>{dispute.orderId}</td>
                  <td>{dispute.complaint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="container-fluid">
      <br />
      <div className="row text-center">
        <div className="col-md-6 mb-3">
          <div className={`card cursor-pointer ${view === 'refunds' ? 'bg-primary text-white' : ''}`}
            onClick={() => setView('refunds')} style={{ cursor: 'pointer' }} >
            <div className="card-body">
              <h5 className="card-title">Refunds</h5>
              {(() => {
                const doneRefunds = refunds.filter(r => r.status === 'refund done');
                const doneCount = doneRefunds.length;
                const doneTotal = doneRefunds.reduce((sum, r) => sum + r.amount, 0);

                return (
                  <p className="card-text">
                    Total: {refunds.length} <b>|</b> Refunded: {doneCount} (₹{doneTotal})
                  </p>
                );
              })()}
            </div>
          </div>
        </div>


        <div className="col-md-6 mb-3">
          <div className={`card cursor-pointer ${view === 'disputes' ? 'bg-danger text-white' : ''}`}
            onClick={() => setView('disputes')} style={{ cursor: 'pointer' }} >
            <div className="card-body">
              <h5 className="card-title">Disputes</h5>
              <p className="card-text">({disputes.length})</p>
            </div>
          </div>
        </div>
      </div>

      {view === 'refunds' ? renderRefunds() : renderDisputes()}
    </div>
  );
};

export default RefundAndDisputes;
