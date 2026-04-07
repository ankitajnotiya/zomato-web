import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaStar, FaFilter, FaChevronRight, FaTimes } from 'react-icons/fa';
import '../styles/collectionDetails.css';
import Footer from '../footer/footer';
import Chat from '../components/Chat';
import Header from '../header/header';

export default function CollectionDetails() {
  const { collectionId } = useParams();
  const [activeFilters, setActiveFilters] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Quick Filter Options
  const quickFilters = ["Rating 4.0+", "Pure Veg", "Fast Delivery", "Outdoor Seating"];

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const handleOrderClick = (restaurant) => {
    setSelectedDish(restaurant);
    setShowModal(true);
    setQuantity(1);
  };

  const handleSubmitOrder = () => {
    if (fullName && address && paymentDetails) {
      setOrderSuccess(true);
      setShowModal(false);
      setSelectedDish(null);
      setFullName('');
      setAddress('');
      setPaymentDetails('');
      setQuantity(1);
    } else {
      alert('Please fill all fields');
    }
  };

  const collections = {
    'most-romantic': { 
      title: 'Most Romantic', 
      subtitle: 'Perfect for date nights in Indore', 
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200' 
    },
    'best-biryani': { 
      title: 'Best Biryani', 
      subtitle: 'Authentic dum biryani places', 
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=1200' 
    },
    'street-food': { 
      title: 'Street Food Special', 
      subtitle: 'Local street food favorites', 
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200' 
    },
    'family-dining': { 
      title: 'Family Dining', 
      subtitle: 'Kid-friendly restaurants', 
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200' 
    },
    'late-night': { 
      title: 'Late Night Cravings', 
      subtitle: 'Open till midnight', 
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200' 
    },
    'healthy-options': { 
      title: 'Healthy Options', 
      subtitle: 'Nutritious meals', 
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200' 
    }
  };

  const collection = collections[collectionId] || collections['street-food'];

const restaurants = [
  { 
    id: 1, 
    name: 'The Royal Romance', 
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', // Fine Dining Restaurant
    rating: 4.8, 
    cuisines: 'Continental, Italian', 
    cost: 1200, 
    time: '25 min', 
    offer: 'Free Delivery', 
    veg: false, 
    outdoor: true 
  },
  { 
    id: 2, 
    name: 'Biryani Paradise', 
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400', // Biryani Dish
    rating: 4.6, 
    cuisines: 'Biryani, Mughlai', 
    cost: 800, 
    time: '30 min', 
    offer: 'Flat ₹100 OFF', 
    veg: false, 
    outdoor: false 
  },
  { 
    id: 3, 
    name: 'Green Leaf', 
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', // Fresh Salad
    rating: 4.2, 
    cuisines: 'Healthy, North Indian', 
    cost: 400, 
    time: '20 min', 
    offer: '20% OFF', 
    veg: true, 
    outdoor: true 
  },
  { 
    id: 4, 
    name: 'Pizza Palace', 
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', // Pizza
    rating: 4.5, 
    cuisines: 'Pizza, Italian', 
    cost: 600, 
    time: '25 min', 
    offer: 'Free Delivery', 
    veg: false, 
    outdoor: false 
  },
  { 
    id: 5, 
    name: 'Midnight Special', 
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', // Late Night Food
    rating: 4.3, 
    cuisines: 'Fast Food, Chinese', 
    cost: 450, 
    time: '35 min', 
    offer: 'Free Delivery', 
    veg: false, 
    outdoor: true 
  },
  { 
    id: 6, 
    name: 'Chinese Wok', 
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400', // Chinese Food
    rating: 4.3, 
    cuisines: 'Chinese, Thai', 
    cost: 500, 
    time: '30 min', 
    offer: 'Order Now', 
    veg: false, 
    outdoor: false 
  },
  { 
    id: 7, 
    name: 'Burger House', 
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400', // Burger
    rating: 4.4, 
    cuisines: 'Burgers, Fast Food', 
    cost: 350, 
    time: '20 min', 
    offer: '15% OFF', 
    veg: false, 
    outdoor: true 
  },
  { 
    id: 8, 
    name: 'Salad Bar', 
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', // Green Salad
    rating: 4.7, 
    cuisines: 'Healthy, Salads', 
    cost: 450, 
    time: '18 min', 
    offer: '🟢 Veg', 
    veg: true, 
    outdoor: false 
  }
];
  // Filter restaurants based on active filters
  const filteredRestaurants = restaurants.filter(restaurant => {
    if (activeFilters.length === 0) return true;
    
    return activeFilters.every(filter => {
      switch(filter) {
        case "Rating 4.0+":
          return restaurant.rating >= 4.0;
        case "Pure Veg":
          return restaurant.veg === true;
        case "Fast Delivery":
          return parseInt(restaurant.time) <= 25;
        case "Outdoor Seating":
          return restaurant.outdoor === true;
        default:
          return true;
      }
    });
  });

  return (
    <>
      <Header />
      <div className="coll-page">
        {/* Hero */}
        <section className="coll-hero-section">
          <div className="coll-hero-overlay">
            <div className="coll-container">
              <h1>{collection.title}</h1>
              <p>{collection.subtitle}</p>
            </div>
          </div>
          <img src={collection.image} alt="Banner" className="coll-main-img" />
        </section>

        {/* Quick Filter Pills */}
        <div className="coll-filter-bar">
          <div className="coll-container flex-gap">
            <Link to="/" className="back-arrow-btn">
              <FaArrowLeft />
            </Link>
            <button className="main-filter"><FaFilter /> Filters</button>
            {quickFilters.map(f => (
              <button 
                key={f} 
                className={`filter-pill ${activeFilters.includes(f) ? 'active' : ''}`}
                onClick={() => toggleFilter(f)}
              >
                {f} {activeFilters.includes(f) && <FaTimes className="close-pill" />}
              </button>
            ))}
            <div className="collection-nav-arrows">
              <Link to="/collections/most-romantic" className="nav-arrow-btn">
                <FaChevronRight />
              </Link>
              <Link to="/collections/best-biryani" className="nav-arrow-btn">
                <FaChevronRight />
              </Link>
              <Link to="/collections/family-dining" className="nav-arrow-btn">
                <FaChevronRight />
              </Link>
              <Link to="/collections/late-night" className="nav-arrow-btn">
                <FaChevronRight />
              </Link>
              <Link to="/collections/healthy-options" className="nav-arrow-btn">
                <FaChevronRight />
              </Link>
            </div>
          </div>
        </div>

        <div className="coll-container">
          <div className="coll-grid-system">
            {filteredRestaurants.map((res) => (
              <div key={res.id} className="coll-card-link">
                <div className="mini-res-card">
                  <div className="img-holder">
                    <img src={res.image} alt={res.name} />
                    <div className="card-badges">
                      {res.offer && <span className="off-badge">{res.offer}</span>}
                      {res.veg && <span className="veg-badge">🟢 Veg</span>}
                    </div>
                  </div>
                  <div className="text-holder">
                    <div className="name-rating">
                      <h4>{res.name}</h4>
                      <span className="rate-box">{res.rating} <FaStar /></span>
                    </div>
                    <p className="cuisines-text">{res.cuisines}</p>
                    <div className="price-time">
                      <span className="price">₹{res.cost} for two</span>
                      <span className="time">{res.time}</span>
                    </div>
                    <div className="card-actions">
                      <button className="order-now-btn" onClick={() => handleOrderClick(res)}>
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Sections */}
        <section className="coll-features-section">
          <div className="coll-container">
            <h2 className="section-title">Why Choose {collection.title}?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🌟</div>
                <h3>Top Rated</h3>
                <p>Handpicked restaurants with 4.0+ ratings</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Fast Delivery</h3>
                <p>Quick delivery within 30 minutes</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎉</div>
                <h3>Great Offers</h3>
                <p>Exclusive discounts and deals</p>
              </div>
            </div>
          </div>
        </section>

        <section className="coll-info-section">
          <div className="coll-container">
            <div className="info-grid">
              <div className="info-card">
                <h3>Delivery Information</h3>
                <ul>
                  <li>Delivery available 24/7 for late night orders</li>
                  <li>Minimum order: ₹200</li>
                  <li>Delivery fee: ₹30 (free above ₹500)</li>
                  <li>Contactless delivery available</li>
                </ul>
              </div>
              <div className="info-card">
                <h3>Popular Cuisines</h3>
                <ul>
                  <li>Fast Food & Snacks</li>
                  <li>Chinese & Thai</li>
                  <li>Pizza & Burgers</li>
                  <li>Healthy Options</li>
                </ul>
              </div>
              <div className="info-card">
                <h3>Payment Options</h3>
                <ul>
                  <li>Cash on Delivery</li>
                  <li>UPI & Wallets</li>
                  <li>Credit/Debit Cards</li>
                  <li>Net Banking</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Order Modal */}
        {selectedDish && (
          <div className="popup-overlay">
            <div className="popup-box">
              <div className="popup-header">
                <h3>Order: {selectedDish.name}</h3>
                <button className="popup-close-btn" onClick={() => {setShowModal(false); setSelectedDish(null);}}>✕</button>
              </div>
              <p className="popup-price">
                Price: ₹{selectedDish.cost}
              </p>
              <input
                type="text"
                placeholder="Your Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="popup-input"
              />
              <input
                type="text"
                placeholder="Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="popup-input"
              />
              <select
                className="popup-input"
                value={paymentDetails}
                onChange={(e) => setPaymentDetails(e.target.value)}
              >
                <option value="">Select Payment Method</option>
                <option value="upi">UPI</option>
                <option value="cod">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
              </select>

              <div className="quantity-control">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>Less</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>More</button>
              </div>
              <button className="submit-order-btn" onClick={handleSubmitOrder}>Submit Order</button>
            </div>
          </div>
        )}

        {/* Order Confirmation */}
        {orderSuccess && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h2>🎉 Order Confirmed!</h2>
              <p>Thank you <strong>{fullName}</strong>!</p>
              <p>Your order will be delivered to <strong>{address}</strong>.</p>
              <button className="submit-order-btn" onClick={() => setOrderSuccess(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <Chat />
      {/* <ScrollToTopArrow showBelow={200} /> */}
    </>
  );
}