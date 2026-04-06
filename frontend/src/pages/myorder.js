import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaEdit, FaSave, FaQrcode } from 'react-icons/fa';
import '../styles/myorder.css';
import Footer from '../footer/footer';
import '../footer/footer.css';
import Header from '../header/header';
import '../header/header.css';
import Chat from '../components/Chat';
import Arrow from '../components/Arrow';
import ScrollToTopArrow from '../components/Arrow';

export default function MyOrder() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load orders from localStorage (from home page)
    const savedOrders = localStorage.getItem('orderHistory');
    if (savedOrders) {
      const orders = JSON.parse(savedOrders);
      const formattedOrders = orders.map(order => ({
        id: order.id,
        date: new Date(order.orderDate).toLocaleDateString('en-IN'),
        customer: order.deliveryDetails.name,
        phone: order.deliveryDetails.phone,
        name: order.items.map(item => `${item.name}(${item.quantity})`).join(', '),
        price: `₹${order.totalAmount}`,
        cancelled: false,
        status: order.status,
        deliveryAddress: `${order.deliveryDetails.address}, ${order.deliveryDetails.city}`,
        paymentMethod: order.paymentMethod,
        items: order.items
      }));
      setOrders(formattedOrders);
    }
  }, []);

  const [orders, setOrders] = useState([
    { id: 'ORD123', date: '2025-06-22', customer: 'Ankit', name: 'Paneer Pizza', price: '₹350', cancelled: false },
    { id: 'ORD120', date: '2025-01-12', customer: 'Arvind', name: 'Dal Bati', price: '₹150', cancelled: false },
    { id: 'ORD122', date: '2025-06-25', customer: 'Akash', name: 'Pizza', price: '₹1150', cancelled: false },
    { id: 'ORD128', date: '2025-04-21', customer: 'Sumit', name: 'Paneer Pizza', price: '₹250', cancelled: false },
    { id: 'ORD124', date: '2025-03-18', customer: 'Vijay', name: 'Rice Zucchini', price: '₹80', cancelled: false },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editRowId, setEditRowId] = useState(null);
  const [editedOrder, setEditedOrder] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleCancel = (orderId) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, cancelled: true } : order
      )
    );
  };

  const handleEdit = (order) => {
    setEditRowId(order.id);
    setEditedOrder({ ...order });
  };

  const handleSave = () => {
    setOrders(prev =>
      prev.map(order => (order.id === editRowId ? editedOrder : order))
    );
    setEditRowId(null);
    setEditedOrder({});
  };

  const handleChange = (e, field) => {
    setEditedOrder(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handlePayment = (order) => {
    setSelectedOrder(order);
    setShowPaymentModal(true);
  };

  const filteredOrders = orders.filter(order =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      {/* Back Link */}
      <div>
        <Link to="/" className="back-link">
          <FaArrowLeft style={{ marginRight: '8px' }} />
          Back to Home
        </Link>
      </div>

      {/* My Order Section */}
      <div className="myorder-container">
        <h2>My Order</h2>

        {/* Search */}
        <div className="myorder-search">
          <input
            type="text"
            placeholder="Search Orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>Search</button>
        </div>

        {/* Order Table */}
        <table className="myorder-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Items</th>
              <th>Price</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>
                  {editRowId === order.id ? (
                    <input
                      type="date"
                      value={editedOrder.date}
                      onChange={(e) => handleChange(e, 'date')}
                    />
                  ) : (
                    order.date
                  )}
                </td>
                <td>{order.id}</td>
                <td>
                  {editRowId === order.id ? (
                    <input
                      type="text"
                      value={editedOrder.customer}
                      onChange={(e) => handleChange(e, 'customer')}
                    />
                  ) : (
                    order.customer
                  )}
                </td>
                <td>{order.phone || 'N/A'}</td>
                <td>
                  {editRowId === order.id ? (
                    <input
                      type="text"
                      value={editedOrder.name}
                      onChange={(e) => handleChange(e, 'name')}
                    />
                  ) : (
                    <div className="order-items">
                      {order.name}
                      {order.items && (
                        <div className="items-preview">
                          {order.items.slice(0, 2).map((item, i) => (
                            <img key={i} src={item.image} alt={item.name} className="item-thumb" />
                          ))}
                          {order.items.length > 2 && (
                            <div className="more-items">+{order.items.length - 2}</div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </td>
                <td>
                  {editRowId === order.id ? (
                    <input
                      type="text"
                      value={editedOrder.price}
                      onChange={(e) => handleChange(e, 'price')}
                    />
                  ) : (
                    order.price
                  )}
                </td>
                <td>
                  <span className={`status-badge ${order.status || 'confirmed'}`}>
                    {order.status === 'delivered' ? '🟢 Delivered' : 
                     order.status === 'confirmed' ? '🟡 Confirmed' : '🔵 Pending'}
                  </span>
                </td>
                <td>
                  <button className="payment-btn" onClick={() => handlePayment(order)}>
                    <FaQrcode />
                    Pay
                  </button>
                </td>
                <td style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {order.cancelled ? (
                    <span className="cancelled">
                      <FaTimesCircle style={{ marginRight: '5px' }} />
                      Cancelled
                    </span>
                  ) : (
                    <>
                      {editRowId === order.id ? (
                        <button className="edit-btn save" onClick={handleSave}>
                          <FaSave style={{ marginRight: '5px' }} />
                          Save
                        </button>
                      ) : (
                        <button className="edit-btn" onClick={() => handleEdit(order)}>
                          <FaEdit style={{ marginRight: '5px' }} />
                          Edit
                        </button>
                      )}
                      <button className="cancel-btn" onClick={() => handleCancel(order.id)}>
                        <FaTimesCircle style={{ marginRight: '5px' }} />
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedOrder && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <div className="payment-header">
              <h3>Complete Payment</h3>
              <button onClick={() => setShowPaymentModal(false)} className="close-payment">×</button>
            </div>
            <div className="payment-content">
              <div className="order-summary">
                <h4>Order Summary</h4>
                <div className="summary-item">
                  <span>Order ID:</span>
                  <span>{selectedOrder.id}</span>
                </div>
                <div className="summary-item">
                  <span>Customer:</span>
                  <span>{selectedOrder.customer}</span>
                </div>
                <div className="summary-item">
                  <span>Items:</span>
                  <span>{selectedOrder.name}</span>
                </div>
                <div className="summary-total">
                  <span>Total:</span>
                  <span>{selectedOrder.price}</span>
                </div>
              </div>
              
              <div className="payment-methods">
                <h4>Payment Methods</h4>
                <div className="payment-options">
                  <div className="payment-option">
                    <div className="qr-code-section">
                      <div className="qr-code">
                        <img src="/assets/qr-code.png" alt="QR Code" />
                      </div>
                      <p>Scan QR code to pay via UPI</p>
                    </div>
                  </div>
                  <div className="payment-option">
                    <h5>Other Payment Options:</h5>
                    <button className="payment-method-btn">📱 UPI</button>
                    <button className="payment-method-btn">💳 Credit/Debit Card</button>
                    <button className="payment-method-btn">💰 Cash on Delivery</button>
                  </div>
                </div>
              </div>
              
              <div className="delivery-info">
                <h4>Delivery Information</h4>
                <p><strong>Address:</strong> {selectedOrder.deliveryAddress || 'Will be updated soon'}</p>
                <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                <p><strong>Estimated Delivery:</strong> 30-45 minutes</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
      <Chat />
      <ScrollToTopArrow />
    </div>
  );
}
