import React, { useState, useRef, useEffect } from 'react';
import '../styles/home.css';
import '../styles/contact.css';
import '../styles/chat-arrow.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import Chat from '../components/Chat';
import Arrow, { ScrollToTopArrow } from '../components/Arrow';
import '../styles/termspolicy.css';
import '../header/header.css';
import '../footer/footer.css';
import '../styles/myorder.css';
import { handleOrderSubmission } from '../components/OrderBackendIntegration';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [rotating, setRotating] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCity, setSelectedCity] = useState('indore');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showMoreDishes, setShowMoreDishes] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1); // 1: Delivery, 2: Payment, 3: Confirmation
  const navigate = useNavigate();
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    phone: '',
    address: '',
    landmark: '',
    city: 'Indore',
    pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderHistory, setOrderHistory] = useState([]);
  const videoRef = useRef(null);

  const openLoginModal = () => setShowModal(true);
  const closeLoginModal = () => setShowModal(false);

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Login functionality would be implemented here!');
    closeLoginModal();
  };

  const handleRotate = () => {
    setRotating(true);
    setTimeout(() => setRotating(false), 1000);
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000);
    }
  };

  const handleSearchClick = () => {
    handleSearch(searchQuery);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleAddToCart = (dish) => {
    const existingItem = cart.find(item => item.name === dish.name);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.name === dish.name 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...dish, quantity: 1 }]);
    }
    
    // Show toast notification
    showToast(`${dish.name} added to cart!`);
  };

  const removeFromCart = (dishName) => {
    setCart(cart.filter(item => item.name !== dishName));
    showToast('Item removed from cart');
  };

  const updateQuantity = (dishName, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(dishName);
    } else {
      setCart(cart.map(item => 
        item.name === dishName 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace('₹', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const showToast = (message) => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };

  const handleSubmitOrder = () => {
    if (fullName && address && paymentMethod) {
      setOrderSuccess(true);
      setSelectedDish(null);
      setPaymentDetails('');
    } else {
      alert('Please fill all fields');
    }
  };

  const categories = [
    { name: 'Poha', image: '/assets/poha.jpg' },
    { name: 'Jalebi', image: '/assets/jalebi.jpg' },
    { name: 'Samosa', image: '/assets/samosa.jpg' },
    { name: 'Sandwich', image: '/assets/sandwitch.jpg' },
    { name: 'Kachori', image: '/assets/kachori.jpg' },
    { name: 'Pizza', image: '/assets/piza.jpg' },
    { name: 'Pasta', image: '/assets/pasta.jpg' },
  ];

  const collections = [
    { 
      title: 'Most Romantic Restaurants', 
      image: 'https://picsum.photos/seed/luxury-restaurant-candlelight-dinner-romance/400/250.jpg', 
      count: '25 Places',
      description: 'Perfect for date nights'
    },
    { 
      title: 'Best Biryani Places', 
      image: 'https://picsum.photos/seed/delicious-biryani-indian-cuisine-food/400/250.jpg', 
      count: '18 Places',
      description: 'Authentic dum biryani'
    },
    { 
      title: 'Street Food Special', 
      image: 'https://picsum.photos/seed/colorful-street-food-indian-chaat-market/400/250.jpg', 
      count: '32 Places',
      description: 'Local favorites'
    },
    { 
      title: 'Family Dining', 
      image: 'https://picsum.photos/seed/happy-family-restaurant-dinner-celebration/400/250.jpg', 
      count: '21 Places',
      description: 'Kid-friendly restaurants'
    },
    { 
      title: 'Late Night Cravings', 
      image: 'https://picsum.photos/seed/delicious-pizza-night-food-delivery-hot/400/250.jpg', 
      count: '15 Places',
      description: 'Open till midnight'
    },
    { 
      title: 'Healthy Options', 
      image: 'https://picsum.photos/seed/fresh-healthy-salad-organic-vegetables-colorful/400/250.jpg', 
      count: '28 Places',
      description: 'Nutritious meals'
    }
  ];

  const cities = [
    { name: 'Indore', id: 'indore' },
    { name: 'Bhopal', id: 'bhopal' },
    { name: 'Delhi', id: 'delhi' },
    { name: 'Mumbai', id: 'mumbai' },
    { name: 'Pune', id: 'pune' }
  ];

  const allLocalities = {
    indore: [
      { name: 'Rajwada', restaurantCount: 156, popularFor: 'Traditional Food' },
      { name: 'Vijay Nagar', restaurantCount: 234, popularFor: 'Modern Cafes' },
      { name: 'Bhawarkuan', restaurantCount: 189, popularFor: 'Street Food' },
      { name: 'Palasia', restaurantCount: 145, popularFor: 'Fine Dining' },
      { name: 'Geeta Bhawan', restaurantCount: 98, popularFor: 'Budget Meals' },
      { name: 'Sapna Sangeeta', restaurantCount: 76, popularFor: 'Quick Bites' }
    ],
    bhopal: [
      { name: 'Old City', restaurantCount: 167, popularFor: 'Traditional Cuisine' },
      { name: 'MP Nagar', restaurantCount: 198, popularFor: 'Corporate Cafes' },
      { name: 'New Market', restaurantCount: 143, popularFor: 'Shopping & Food' },
      { name: 'Arera Colony', restaurantCount: 89, popularFor: 'Family Restaurants' },
      { name: 'Shahpura', restaurantCount: 76, popularFor: 'Scenic Dining' }
    ],
    delhi: [
      { name: 'Connaught Place', restaurantCount: 312, popularFor: 'Fine Dining' },
      { name: 'Khan Market', restaurantCount: 145, popularFor: 'Trendy Cafes' },
      { name: 'Hauz Khas', restaurantCount: 198, popularFor: 'Hipster Vibes' },
      { name: 'Chandni Chowk', restaurantCount: 267, popularFor: 'Street Food' },
      { name: 'Dilli Haat', restaurantCount: 89, popularFor: 'Regional Cuisine' }
    ],
    mumbai: [
      { name: 'Bandra', restaurantCount: 234, popularFor: 'Trendy Restaurants' },
      { name: 'Colaba', restaurantCount: 189, popularFor: 'Seafood Special' },
      { name: 'Juhu', restaurantCount: 156, popularFor: 'Beachside Dining' },
      { name: 'Worli', restaurantCount: 145, popularFor: 'Corporate Eateries' },
      { name: 'Marine Drive', restaurantCount: 98, popularFor: 'Romantic Spots' }
    ],
    pune: [
      { name: 'Koregaon Park', restaurantCount: 198, popularFor: 'Party Places' },
      { name: 'Camp', restaurantCount: 167, popularFor: 'Irani Cafes' },
      { name: 'Viman Nagar', restaurantCount: 134, popularFor: 'Modern Restaurants' },
      { name: 'FC Road', restaurantCount: 189, popularFor: 'Student Hangouts' },
      { name: 'Kalyani Nagar', restaurantCount: 112, popularFor: 'Upscale Dining' }
    ]
  };

  const testimonials = [
    {
      name: 'Gaurav Chandelkar',
      rating: 5,
      comment: 'Amazing food delivery service! Always on time and food is fresh.',
      avatar: '👩‍💼'
    },
    {
      name: 'Ankit Malviya ',
      rating: 5,
      comment: 'Best food delivery app in Indore. Great variety and quick service.',
      avatar: '👨‍💻'
    },
    {
      name: ' Dhanraj Mewada',
      rating: 4,
      comment: 'Love the interface and the discounts. Makes ordering so easy!',
      avatar: '👩‍🎨'
    },
    {
      name: 'Jitendra Singh ',
      rating: 5,
      comment: 'Excellent customer support and food quality. Highly recommended!',
      avatar: '👨‍🔧'
    }
  ];

  const offers = [
    { text: '50% OFF on first order', code: 'FIRST50', color: '#e23744' },
    { text: 'Free delivery on orders above ₹299', code: 'FREEDEL', color: '#27ae60' },
    { text: 'Buy 1 Get 1 on selected items', code: 'BOGO', color: '#3498db' },
    { text: '₹100 off on minimum order ₹499', code: 'SAVE100', color: '#f39c12' }
  ];

const topDishes = [
  {
    name: 'Dal Bati',
    price: '₹120',
    image: '/assets/dalbati.jpg',
    desc: 'Traditional Rajasthani dish made of baked dough balls soaked in ghee.',
    category: 'Indian',
    rating: 4.5,
    time: '30-40 min',
    restaurant: 'Rajasthani Royal'
  },
  {
    name: 'Paneer Sabji',
    price: '₹110',
    image: '/assets/panir.jpg',
    desc: 'Paneer cubes in tomato-onion gravy with Indian spices.',
    category: 'Indian',
    rating: 4.3,
    time: '25-30 min',
    restaurant: 'Punjab Da Dhaba'
  },
  {
    name: 'Gulab Jamun',
    price: '₹60',
    image: '/assets/gulabjamun.jpg',
    desc: 'Soft and syrupy Indian sweet dumplings made from milk solids.',
    category: 'Sweets',
    rating: 4.8,
    time: '15-20 min',
    restaurant: 'Sweet Corner'
  },
  {
    name: 'Jalebi',
    price: '₹50',
    image: '/assets/jalebi.jpg',
    desc: 'Crispy and sweet Indian dessert in spiral shape.',
    category: 'Sweets',
    rating: 4.7,
    time: '20-25 min',
    restaurant: 'Halwai Shop'
  },
  {
    name: 'Samosa',
    price: '₹40',
    image: '/assets/samosa.jpg',
    desc: 'Crispy triangular pastry filled with spiced potatoes and peas.',
    category: 'Snacks',
    rating: 4.4,
    time: '15-20 min',
    restaurant: 'Samosa Point'
  },
  {
    name: 'Chole Bhature',
    price: '₹90',
    image: '/assets/bojan.jpg',
    desc: 'Spicy chickpeas curry with fluffy fried bread.',
    category: 'Indian',
    rating: 4.6,
    time: '25-30 min',
    restaurant: 'Delhi Chaat'
  },
  {
    name: 'Masala Dosa',
    price: '₹80',
    image: '/assets/puri.jpg',
    desc: 'Crispy rice crepe filled with spiced potato filling.',
    category: 'South Indian',
    rating: 4.5,
    time: '20-25 min',
    restaurant: 'Dosa Plaza'
  },
  {
    name: 'Idli Sambar',
    price: '₹60',
    image: '/assets/nasta.jpg',
    desc: 'Soft steamed rice cakes with lentil soup.',
    category: 'South Indian',
    rating: 4.6,
    time: '20-25 min',
    restaurant: 'South Indian Kitchen'
  },
  {
    name: 'Vegetable Biryani',
    price: '₹130',
    image: '/assets/rice-zucchini.png',
    desc: 'Fragrant rice with mixed vegetables and aromatic spices.',
    category: 'Rice',
    rating: 4.5,
    time: '35-40 min',
    restaurant: 'Biryani House'
  },
  {
    name: 'Fried Rice',
    price: '₹90',
    image: '/assets/noodels.jpg',
    desc: 'Indo-Chinese fried rice with mixed vegetables.',
    category: 'Chinese',
    rating: 4.0,
    time: '25-30 min',
    restaurant: 'Chinese Wok'
  },
  {
    name: 'Pav Bhaji',
    price: '₹70',
    image: '/assets/panipuri.jpg',
    desc: 'Spicy vegetable curry served with soft bread rolls.',
    category: 'Street Food',
    rating: 4.5,
    time: '20-25 min',
    restaurant: 'Mumbai Street'
  },
  {
    name: 'Vada Pav',
    price: '₹35',
    image: '/assets/burger.jpg',
    desc: 'Spicy potato fritter sandwiched in bread.',
    category: 'Street Food',
    rating: 4.3,
    time: '15-20 min',
    restaurant: 'Mumbai Special'
  }
];
  // Search functionality with loading and error handling
  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchError('');
    
    if (query.trim() === '') {
      setShowSearchResults(false);
      setFilteredDishes([]);
      return;
    }
    
    // Add to recent searches
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
    
    setIsSearching(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      try {
        const searchLower = query.toLowerCase();
        const filtered = topDishes.filter(dish => {
          const nameMatch = dish.name.toLowerCase().includes(searchLower);
          const categoryMatch = dish.category.toLowerCase().includes(searchLower);
          const descMatch = dish.desc.toLowerCase().includes(searchLower);
          const restaurantMatch = dish.restaurant.toLowerCase().includes(searchLower);
          
          return nameMatch || categoryMatch || descMatch || restaurantMatch;
        });
        
        setFilteredDishes(filtered);
        setShowSearchResults(true);
        setIsSearching(false);
        
        if (filtered.length === 0) {
          setSearchError(`No dishes found for "${query}"`);
        }
      } catch (error) {
        setSearchError('Search failed. Please try again.');
        setIsSearching(false);
        setShowSearchResults(false);
      }
    }, 300); // Simulate network delay
  };

  // Payment Modal Functions
  const openPaymentModal = () => {
    setShowPaymentModal(true);
    setPaymentStep(1);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setPaymentStep(1);
    setPaymentMethod('');
    setUpiId('');
    setCardDetails({ number: '', expiry: '', cvv: '', name: '' });
  };

  const handleDeliverySubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Add payment_method and total_amount to delivery data
      const deliveryData = {
        ...deliveryDetails,
        payment_method: paymentMethod || 'cod', // Default to COD if not selected
        total_amount: getCartTotal() // Add cart total
      };
      
      const response = await fetch('http://127.0.0.1:8000/api/delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deliveryData)
      });

      const data = await response.json();

      if (data.success) {
        setPaymentStep(2);
      } else {
        alert('Failed to submit delivery details. Please try again.');
        console.error('Delivery Error:', data);
      }
    } catch (error) {
      alert('Network error. Please try again.');
      console.error('Delivery error:', error);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'upi' && !upiId) {
      showToast('Please enter UPI ID');
      return;
    }
    
    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name)) {
      showToast('Please fill all card details');
      return;
    }
    
    if (!paymentMethod) {
      showToast('Please select payment method');
      return;
    }
    
    // Show processing state
    setPaymentStep(3);
    setOrderPlaced(false);
    
    try {
      // Prepare payment details based on method
      const paymentDetails = paymentMethod === 'upi' ? { upiId } : 
                           paymentMethod === 'card' ? cardDetails : {};
      
      // Send order to backend
      const result = await handleOrderSubmission(
        deliveryDetails,
        paymentMethod,
        paymentDetails,
        cart,
        getCartTotal()
      );
      
      if (result.success) {
        // Set order details from backend
        setOrderId(result.order.order_id);
        
        // Create order object for history
        const newOrder = {
          id: result.order.order_id,
          items: [...cart],
          deliveryDetails: {...deliveryDetails},
          paymentMethod: paymentMethod,
          totalAmount: result.order.grand_total,
          status: result.order.status,
          orderDate: result.order.created_at,
          estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000).toISOString() // 45 minutes from now
        };
        
        // Add to order history
        setOrderHistory(prev => [newOrder, ...prev]);
        
        // Show success after processing
        setTimeout(() => {
          setOrderPlaced(true);
          
          // Clear cart after successful order
          setTimeout(() => {
            setCart([]);
            closePaymentModal();
            showToast('Order placed successfully! 🎉');
            showToast('Check My Orders for order tracking');
          }, 3000);
        }, 2000);
      } else {
        // Show error message and go back to payment step
        showToast(result.message || 'Failed to place order');
        setPaymentStep(2);
      }
    } catch (error) {
      console.error('Order submission error:', error);
      showToast('Failed to place order. Please try again.');
      setPaymentStep(2);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  return (
    <div className="home-page">
      <Header />

      {/* Hero Section */}
<section className="hero-section">
  <div className="container hero-flex">
    
    {/* LEFT SIDE: Text & Search */}
    <div className="hero-text-content">
      <h1 className="hero-title">
        Order Food & <span className="highlight">Groceries</span>
      </h1>
      <p className="home-hero-subtitle">
        Discover the best food & groceries from 1000+ top-rated restaurants near you.
      </p>

      <div className="search-container">
        <div className="search-inner">
          <span className="loc-icon"></span>
          <input 
            type="text" 
            placeholder="Search for dishes like Biryani, Pizza..." 
            className="main-search-input"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
          />
          <button className="main-search-btn" onClick={handleSearchClick}>Search</button>
        </div>
        
        {/* Recent Searches */}
        {recentSearches.length > 0 && searchQuery === '' && (
          <div className="recent-searches">
            <div className="recent-header">
              <span>Recent Searches</span>
              <button onClick={() => setRecentSearches([])}>Clear</button>
            </div>
            <div className="recent-list">
              {recentSearches.map((search, i) => (
                <div key={i} className="recent-item" onClick={() => handleSearch(search)}>
                  <span className="recent-icon">🕐</span>
                  <span>{search}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="quick-badges">
        <span className="badge">Mumbai</span>
        <span className="badge">Delhi</span>
        <span className="badge">Bangalore</span>
        <span className="badge">Indore</span>
        <span className="badge">Bhopal</span>
      </div>

      <div className="hero-trust-badges">
        <div className="trust-item">
          <span className="trust-icon">⚡</span>
          <span>Lightning Fast Delivery</span>
        </div>
        <div className="trust-item">
          <span className="trust-icon">🎁</span>
          <span>First Order Free</span>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE: Circle Design */}
    <div className="hero-visual-content">
      <div className="hero-circle-design">
        <div className="circle-content">
          <div className="food-icons-grid">
            <div className="food-icon-item">🍕</div>
            <div className="food-icon-item">🍔</div>
            <div className="food-icon-item">🥗</div>
            <div className="food-icon-item">🍜</div>
            <div className="food-icon-item">🍱</div>
            <div className="food-icon-item">🍰</div>
          </div>
          <div className="center-text">
            <h3>Delicious Food</h3>
            <p>Fast Delivery</p>
          </div>
        </div>
      </div>
      
      {/* Floating Food Images */}
      <div className="floating-food-images">
        <div className="floating-food-item food-1" onClick={() => handleAddToCart(topDishes[4])}>
          <img src="/assets/samosa.jpg" alt="Samosa" />
          <span className="food-label">Samosa</span>
        </div>
        <div className="floating-food-item food-2" onClick={() => handleAddToCart(topDishes[5])}>
          <img src="/assets/bojan.jpg" alt="Chole Bhature" />
          <span className="food-label">Chole</span>
        </div>
        <div className="floating-food-item food-3" onClick={() => handleAddToCart(topDishes[6])}>
          <img src="/assets/puri.jpg" alt="Masala Dosa" />
          <span className="food-label">Dosa</span>
        </div>
        <div className="floating-food-item food-4" onClick={() => handleAddToCart(topDishes[7])}>
          <img src="/assets/nasta.jpg" alt="Idli Sambar" />
          <span className="food-label">Idli</span>
        </div>
      </div>
    </div>

  </div>
</section>

      {/* Mobile Location Boxes */}
      <section className="mobile-location-section">
        <div className="container">
          <div className="mobile-location-grid">
            <div className="mobile-location-box" onClick={() => setSelectedCity('indore')}>
              <div className="location-icon">🏙️</div>
              <h3>Indore</h3>
              <p>156+ Restaurants</p>
            </div>
            <div className="mobile-location-box" onClick={() => setSelectedCity('bhopal')}>
              <div className="location-icon">🌆</div>
              <h3>Bhopal</h3>
              <p>142+ Restaurants</p>
            </div>
            <div className="mobile-location-box" onClick={() => setSelectedCity('delhi')}>
              <div className="location-icon">🏛️</div>
              <h3>Delhi</h3>
              <p>312+ Restaurants</p>
            </div>
            <div className="mobile-location-box" onClick={() => setSelectedCity('mumbai')}>
              <div className="location-icon">🌊</div>
              <h3>Mumbai</h3>
              <p>234+ Restaurants</p>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Ticker */}
      <section className="offers-ticker">
        <div className="ticker-content">
          <div className="ticker-scroll">
            {offers.map((offer, i) => (
              <div key={i} className="offer-item" style={{ backgroundColor: offer.color }}>
                <span className="offer-text">{offer.text}</span>
                <span className="offer-code">Code: {offer.code}</span>
              </div>
            ))}
            {offers.map((offer, i) => (
              <div key={`duplicate-${i}`} className="offer-item" style={{ backgroundColor: offer.color }}>
                <span className="offer-text">{offer.text}</span>
                <span className="offer-code">Code: {offer.code}</span>
              </div>
            ))}
          </div>
        </div>
        <button 
          className="dark-mode-toggle" 
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </section>

      {/* Search Results Section */}
      {isSearching && (
        <section className="search-results-section">
          <div className="container">
            <div className="loading-state">
              <div className="search-loader">
                <div className="spinner"></div>
                <p>Searching for delicious dishes...</p>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {showSearchResults && !isSearching && (
        <section className="search-results-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Search Results for "{searchQuery}"</h2>
              <p className="section-subtitle">Found {filteredDishes.length} dishes</p>
            </div>
            
            {searchError && (
              <div className="search-error">
                <div className="error-icon">⚠️</div>
                <p>{searchError}</p>
                <button onClick={() => handleSearch('')} className="clear-search-btn">Clear Search</button>
              </div>
            )}
            
            <div className="dishes-carousel">
              <div className="dishes-grid">
                {filteredDishes.map((dish, i) => (
                  <div className="dish-card-modern" key={i}>
                    <div className="dish-image-container">
                      <img src={dish.image} alt={dish.name} className="dish-image-modern" />
                      <div className="dish-badge">Bestseller</div>
                      <button className="add-to-cart-btn" onClick={() => handleAddToCart(dish)}>
                        <span className="add-icon">+</span>
                        <span className="add-text">Add</span>
                      </button>
                    </div>
                    <div className="dish-content">
                      <div className="dish-header">
                        <h3 className="dish-name">{dish.name}</h3>
                        <div className="dish-rating">
                          <span className="stars">⭐</span>
                          <span className="rating-count">{dish.rating}</span>
                        </div>
                      </div>
                      <p className="dish-description">{dish.desc}</p>
                      <div className="dish-footer">
                        <div className="dish-price">
                          <span className="price-symbol">₹</span>
                          {dish.price}
                        </div>
                        <div className="delivery-time">
                          <span className="time-icon">⏱️</span>
                          {dish.time}
                        </div>
                      </div>
                      <div className="restaurant-info">
                        <span className="restaurant-name">{dish.restaurant}</span>
                        <span className="category-tag">{dish.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {filteredDishes.length === 0 && !searchError && (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No dishes found</h3>
                <p>Try searching for something else like "Chawal", "Biryani", or "Paneer"</p>
                <div className="search-suggestions">
                  <p>Popular searches:</p>
                  <div className="suggestion-tags">
                    <span onClick={() => handleSearch('Pizza')}>Pizza</span>
                    <span onClick={() => handleSearch('Biryani')}>Biryani</span>
                    <span onClick={() => handleSearch('Paneer')}>Paneer</span>
                    <span onClick={() => handleSearch('Samosa')}>Samosa</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Stats Section */}
<section className="stats-section">
  <div className="container">

  </div>
</section>
      {/* About Us Section */}
      <section className="about-us-section">
        <div className="about-us-content">
          <div className="about-us-video-container">
            <video
              autoPlay
              muted
              playsInline
              loop
              poster="https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141351.jpg?w=826"
              className="about-us-video"
            >
              <source src="/assets/vedio.mp4" type="video/mp4" />
              Your browser does not support video tag.
            </video>
          </div>
          <div className="about-us-text">
            <h2 className="section-title">About <span className="brand-color">Zomato</span></h2>
            <p className="about-us-description">
Zomato is India's most loved food delivery and restaurant discovery platform. We connect millions of users with restaurants every day, offering seamless food ordering, dine-in reservations, and a rich user experience. Founded in 2008, Zomato has transformed how people discover food and where they dine. With features like reviews, menus, photos, and hygiene ratings, we ensure customers make informed choices. Whether you're craving street food or gourmet meals, Zomato brings it to your doorstep fast and fresh. Our partners are trained and optimized for efficiency and safety. We support local businesses, promote cloud kitchens, and integrate advanced technology to streamline operations. From food delivery to nutrition tracking, loyalty programs to sustainability drives — Zomato is more than just food. It's a lifestyle! Join over 100 million users who trust Zomato for their meals, moments, and memories.

            </p>
          </div>
        </div>
      </section>

      {/* Food Categories */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What's on your mind?</h2>
            <p className="section-subtitle">From local favorites to international cuisines</p>
          </div>
          <div className="categories-carousel">
            <div className="categories-grid">
              {categories.map((cat, i) => (
                <div key={i} className="category-card">
                  <div className="category-image-container">
                    <img src={cat.image} alt={cat.name} className="category-image" />
                    <div className="category-overlay">
                      <span className="category-name">{cat.name}</span>
                    </div>
                    <div className="cooking-effect">
                      <div className="steam-animation">💨</div>
                      <div className="steam-animation steam-delay-1">💨</div>
                      <div className="steam-animation steam-delay-2">💨</div>
                    </div>
                  </div>
                  <div className="category-hover-info">
                    <div className="cooking-animation">
                      <span className="cooking-icon">🔥</span>
                      <span className="cooking-text">Freshly Prepared</span>
                    </div>
                  </div>
                  <div className="category-description">
                    <p>Delicious {cat.name.toLowerCase()} options</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="collections-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Collections</h2>
            <p className="section-subtitle">Explore curated lists of top restaurants</p>
          </div>
          <div className="collections-grid">
            {collections.map((collection, i) => {
              // Map collection titles to route IDs
              const collectionIds = {
                'Most Romantic Restaurants': 'most-romantic',
                'Best Biryani Places': 'best-biryani',
                'Street Food Special': 'street-food',
                'Family Dining': 'family-dining',
                'Late Night Cravings': 'late-night',
                'Healthy Options': 'healthy-options'
              };
              
              const collectionId = collectionIds[collection.title] || 'most-romantic';
              
              return (
                <Link 
                  key={i} 
                  to={`/collection/${collectionId}`} 
                  className="collection-card-link"
                >
                  <div className="collection-card">
                    <div className="collection-image-container">
                      <img src={collection.image} alt={collection.title} className="collection-image" />
                      <div className="collection-overlay">
                        <div className="collection-info">
                          <h3 className="collection-title">{collection.title}</h3>
                          <p className="collection-description">{collection.description}</p>
                          <div className="collection-count">{collection.count}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Localities Section */}
      <section className="localities-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Localities</h2>
            <p className="section-subtitle">Find restaurants in your area</p>
          </div>
          
          {/* City Selection */}
          <div className="city-selector">
            <div className="city-tabs">
              {cities.map((city) => (
                <button
                  key={city.id}
                  className={`city-tab ${selectedCity === city.id ? 'active' : ''}`}
                  onClick={() => setSelectedCity(city.id)}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>

          {/* Localities Grid */}
          <div className="localities-grid">
            {allLocalities[selectedCity].map((locality, i) => (
              <div 
                key={i} 
                className={`locality-card ${selectedArea === locality.name ? 'selected' : ''}`}
                onClick={() => setSelectedArea(locality.name)}
              >
                <div className="locality-content">
                  <h3 className="locality-name">{locality.name}</h3>
                  <div className="locality-stats">
                    <span className="restaurant-count">{locality.restaurantCount} restaurants</span>
                    <span className="popular-for">Popular for: {locality.popularFor}</span>
                  </div>
                </div>
                <div className="locality-arrow">→</div>
              </div>
            ))}
          </div>
          
          {selectedArea && (
            <div className="selected-area-info">
              <p>Showing restaurants in <strong>{selectedArea}, {cities.find(c => c.id === selectedCity)?.name}</strong></p>
              <button onClick={() => setSelectedArea('')} className="clear-selection">Clear</button>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real reviews from happy customers</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="customer-avatar">{testimonial.avatar}</div>
                  <div className="customer-info">
                    <h4 className="customer-name">{testimonial.name}</h4>
                    <div className="customer-rating">
                      {[...Array(testimonial.rating)].map((_, starIndex) => (
                        <span key={starIndex} className="star">⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="testimonial-comment">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="popular-dishes-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Popular Dishes</h2>
            <p className="section-subtitle">Most ordered dishes near you</p>
          </div>
          <div className="dishes-carousel">
            <div className="dishes-grid">
              {topDishes.slice(0, showMoreDishes ? topDishes.length : 4).map((dish, i) => (
                <div className="dish-card-modern" key={i}>
                  <div className="dish-image-container">
                    <img src={dish.image} alt={dish.name} className="dish-image-modern" />
                    <div className="dish-badge">Bestseller</div>
                    <button className="add-to-cart-btn" onClick={() => handleAddToCart(dish)}>
                      <span className="add-icon">+</span>
                      <span className="add-text">Add</span>
                    </button>
                  </div>
                  <div className="dish-content">
                    <div className="dish-header">
                      <h3 className="dish-name">{dish.name}</h3>
                      <div className="dish-rating">
                        <span className="stars">⭐ {dish.rating}</span>
                        <span className="rating-count">(2.3k)</span>
                      </div>
                    </div>
                    <p className="dish-description">{dish.desc}</p>
                    <div className="dish-footer">
                      <div className="dish-price">
                        <span className="price-symbol">₹</span>
                        {dish.price.replace('₹', '')}
                      </div>
                      <div className="delivery-time">
                        <span className="time-icon">⏱️</span>
                        <span>{dish.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {topDishes.length > 4 && (
              <div className="show-more-container">
                <button 
                  className="show-more-btn" 
                  onClick={() => setShowMoreDishes(!showMoreDishes)}
                >
                  {showMoreDishes ? 'Show Less' : `Show More (${topDishes.length - 4} more)`}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Download App Section */}
<div className="support-extra-content">
  
  {/* STATS SECTION - Modern White Cards */}
  <section className="stats-section">
    {/* <div className="container">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏪</div>
          <div className="stat-number">10K+</div>
          <p className="stat-label">Restaurants</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-number">50K+</div>
          <p className="stat-label">Daily Orders</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-number">100K+</div>
          <p className="stat-label">Happy Customers</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎧</div>
          <div className="stat-number">24/7</div>
          <p className="stat-label">Support</p>
        </div>
      </div>
    </div> */}
  </section>

  {/* DOWNLOAD APP SECTION - Split Layout (Left Text, Right QR) */}
  <section className="download-app-section">
    <div className="container">
      <div className="app-flex-container">
        
        {/* Left Side: Information */}
        <div className="app-info-left">
          <h2 className="app-title">Get the Zomato App</h2>
          <p className="app-description">
            Experience the fastest food delivery. We will send you a link, open it on your phone to download the app.
          </p>
          
          <div className="app-features-list">
            <div className="feature-item">
              <span className="feature-dot"></span>
              <span>Faster ordering & Live order tracking</span>
            </div>
            <div className="feature-item">
              <span className="feature-dot"></span>
              <span>Exclusive app-only offers and discounts</span>
            </div>
            <div className="feature-item">
              <span className="feature-dot"></span>
              <span>Easy payments & 24/7 Priority Support</span>
            </div>
          </div>

          <div className="download-label">Available on</div>
          <div className="app-badges-row">
            <a href="https://play.google.com/store/apps/details?id=com.application.zomato" className="store-badge" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" />
            </a>
            <a href="https://apps.apple.com/app/zomato-food-delivery-dining/id434615311" className="store-badge" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" />
            </a>
          </div>
        </div>

        {/* Right Side: QR Code Card */}
        <div className="app-qr-right">
          <div className="qr-card">
            <div className="qr-wrapper">
              <a href="https://play.google.com/store/apps/details?id=com.application.zomato" target="_blank" rel="noopener noreferrer">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://play.google.com/store/apps/details?id=com.application.zomato" 
                  alt="Zomato Play Store QR Code" 
                  className="qr-img"
                />
              </a>
            </div>
            <p className="qr-text">Scan to <br /><strong>Download Zomato App</strong></p>
          </div>
        </div>

      </div>
    </div>
  </section>
</div>

        {/* Order Popup */}
        {selectedDish && (
          <div className="popup-overlay">
            <div className="popup-box">
              <div className="popup-header">
                <h3>Order: {selectedDish.name}</h3>
                <button className="popup-close-btn" onClick={() => setSelectedDish(null)}>✕</button>
              </div>
              <p className="popup-price">
                Price: ${isNaN(parseInt(selectedDish.price.replace('₹', '')) * quantity) ? 'NaN' : parseInt(selectedDish.price.replace('₹', '')) * quantity}
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
                value={paymentMethod}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setPaymentDetails('');
                }}
              >
                <option value="">Select Payment Method</option>
                <option value="upi">UPI</option>
                <option value="atm">ATM Card</option>
                <option value="qr">QR Code</option>
                <option value="cod">Cash on Delivery</option>
              </select>

              {(paymentMethod === 'upi' || paymentMethod === 'atm') && (
                <input
                  type="text"
                  placeholder={paymentMethod === 'upi' ? 'Enter UPI ID' : 'Enter ATM Card Number'}
                  value={paymentDetails}
                  onChange={(e) => setPaymentDetails(e.target.value)}
                  className="popup-input"
                />
              )}

              {paymentMethod === 'qr' && (
                <div className="qr-code-box">
                  <img src="/assets/qr-code.png" alt="QR Code" className="qr-code-image" />
                  <p>Scan this QR to pay</p>
                </div>
              )}

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
              <img src="/assets/success-icon.jpg" alt="Success" className="success-image" />
              <button className="submit-order-btn" onClick={() => setOrderSuccess(false)}>Close</button>
            </div>
          </div>
        )}

      {/* Login Modal */}
      {showModal && (
        <div className="modal" onClick={(e) => e.target.className === 'modal' && closeLoginModal()}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Login</h2>
              <button className="close-btn" onClick={closeLoginModal}>×</button>
            </div>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input type="email" placeholder="Your email" required />
              </div>
              <div className="form-group">
                <input type="password" placeholder="Password" required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
              <div className="checkbox-group">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms">I agree to the terms & privacy policy.</label>
              </div>
              <div className="signup-link">
                Create a new account? <Link to="#">Click here</Link>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <Footer />
      <Chat />
      <ScrollToTopArrow />
      
      {/* Cart Sidebar - Only show when has items */}
      {cart.length > 0 && (
        <div className={`cart-sidebar ${showCart ? 'open' : ''}`}>
          <div className="cart-header">
            <h3>Your Cart ({cart.length})</h3>
            <button onClick={() => setShowCart(false)}>×</button>
          </div>
          <div className="cart-items">
            {cart.map((item, i) => (
              <div key={i} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>{item.price}</p>
                </div>
                <div className="cart-item-quantity">
                  <button onClick={() => updateQuantity(item.name, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.name, item.quantity + 1)}>+</button>
                </div>
                <button onClick={() => removeFromCart(item.name)} className="remove-item">🗑️</button>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total: ₹{getCartTotal()}</span>
            </div>
            <button className="checkout-btn" onClick={openPaymentModal}>Proceed to Checkout</button>
          </div>
        </div>
      )}
      
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <div className="payment-header">
              <div className="payment-steps">
                <div className={`step ${paymentStep >= 1 ? 'active' : ''}`}>
                  <span className="step-number">1</span>
                  <span>Delivery</span>
                </div>
                <div className={`step ${paymentStep >= 2 ? 'active' : ''}`}>
                  <span className="step-number">2</span>
                  <span>Payment</span>
                </div>
                <div className={`step ${paymentStep >= 3 ? 'active' : ''}`}>
                  <span className="step-number">3</span>
                  <span>Confirm</span>
                </div>
              </div>
              <button onClick={closePaymentModal} className="close-payment">×</button>
            </div>

            {/* Step 1: Delivery Details */}
            {paymentStep === 1 && (
              <div className="payment-content">
                <h3>Delivery Details</h3>
                <form onSubmit={handleDeliverySubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        value={deliveryDetails.name}
                        onChange={(e) => setDeliveryDetails({...deliveryDetails, name: e.target.value})}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        value={deliveryDetails.phone}
                        onChange={(e) => setDeliveryDetails({...deliveryDetails, phone: e.target.value})}
                        placeholder="10-digit mobile number"
                        pattern="[0-9]{10}"
                        maxLength="10"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Delivery Address *</label>
                    <textarea
                      value={deliveryDetails.address}
                      onChange={(e) => setDeliveryDetails({...deliveryDetails, address: e.target.value})}
                      placeholder="Street address, area, landmark"
                      rows="3"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Landmark</label>
                      <input
                        type="text"
                        value={deliveryDetails.landmark}
                        onChange={(e) => setDeliveryDetails({...deliveryDetails, landmark: e.target.value})}
                        placeholder="Nearby landmark"
                      />
                    </div>
                    <div className="form-group">
                      <label>City *</label>
                      <select
                        value={deliveryDetails.city}
                        onChange={(e) => setDeliveryDetails({...deliveryDetails, city: e.target.value})}
                        required
                      >
                        <option value="Indore">Indore</option>
                        <option value="Bhopal">Bhopal</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Mumbai">Mumbai</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Pincode *</label>
                    <input
                      type="text"
                      value={deliveryDetails.pincode}
                      onChange={(e) => setDeliveryDetails({...deliveryDetails, pincode: e.target.value})}
                      placeholder="6-digit pincode"
                      pattern="[0-9]{6}"
                      maxLength="6"
                      required
                    />
                  </div>
                  <button type="submit" className="proceed-btn">Proceed to Payment</button>
                </form>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {paymentStep === 2 && (
              <div className="payment-content">
                <h3>Payment Method</h3>
                <form onSubmit={handlePaymentSubmit}>
                  <div className="payment-methods">
                    <label className="payment-option">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="payment-card">
                        <div className="payment-icon">📱</div>
                        <div className="payment-info">
                          <h4>UPI Payment</h4>
                          <p>Pay using UPI apps</p>
                        </div>
                      </div>
                    </label>

                    <label className="payment-option">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="payment-card">
                        <div className="payment-icon">💳</div>
                        <div className="payment-info">
                          <h4>Credit/Debit Card</h4>
                          <p>Visa, Mastercard, Rupay</p>
                        </div>
                      </div>
                    </label>

                    <label className="payment-option">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="payment-card">
                        <div className="payment-icon">💰</div>
                        <div className="payment-info">
                          <h4>Cash on Delivery</h4>
                          <p>Pay when you receive</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* UPI Payment Form */}
                  {paymentMethod === 'upi' && (
                    <div className="payment-form">
                      <h4>Enter UPI ID</h4>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        pattern="[\\w.-]+@[\\w.-]+"
                        required
                      />
                    </div>
                  )}

                  {/* Card Payment Form */}
                  {paymentMethod === 'card' && (
                    <div className="payment-form">
                      <h4>Card Details</h4>
                      <div className="form-group">
                        <label>Card Number</label>
                        <input
                          type="text"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({...cardDetails, number: formatCardNumber(e.target.value)})}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          required
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Expiry Date</label>
                          <input
                            type="text"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({...cardDetails, expiry: formatExpiry(e.target.value)})}
                            placeholder="MM/YY"
                            maxLength="5"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>CVV</label>
                          <input
                            type="password"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                            placeholder="123"
                            maxLength="3"
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Cardholder Name</label>
                        <input
                          type="text"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                          placeholder="Name on card"
                          required
                        />
                      </div>
                    </div>
                  )}

                  <div className="order-summary">
                    <h4>Order Summary</h4>
                    <div className="summary-item">
                      <span>Items ({cart.length})</span>
                      <span>₹{getCartTotal()}</span>
                    </div>
                    <div className="summary-item">
                      <span>Delivery Fee</span>
                      <span>₹40</span>
                    </div>
                    <div className="summary-total">
                      <span>Total</span>
                      <span>₹{getCartTotal() + 40}</span>
                    </div>
                  </div>

                  <button type="submit" className="pay-btn">
                    Pay ₹{getCartTotal() + 40}
                  </button>
                </form>
              </div>
            )}

            {/* Step 3: Order Confirmation */}
            {paymentStep === 3 && (
              <div className="payment-content">
                <div className="confirmation-content">
                  {!orderPlaced ? (
                    <>
                      <div className="processing-animation">
                        <div className="spinner"></div>
                        <h3>Processing your order...</h3>
                        <p>Please wait while we confirm your payment</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="success-animation">
                        <div className="success-icon">✓</div>
                        <h3>Order Placed Successfully!</h3>
                        <p>Your order has been confirmed</p>
                        <div className="order-details">
                          <div className="detail-item">
                            <span>Order ID:</span>
                            <span>{orderId}</span>
                          </div>
                          <div className="detail-item">
                            <span>Total Amount:</span>
                            <span>₹{getCartTotal() + 40}</span>
                          </div>
                          <div className="detail-item">
                            <span>Delivery Address:</span>
                            <span>{deliveryDetails.address}, {deliveryDetails.city}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <Chat />
      <ScrollToTopArrow />
      
      {/* Floating Action Buttons */}
      <div className="floating-actions">
        <button className={`cart-fab ${cart.length > 0 ? 'show-with-items' : ''}`} onClick={() => setShowCart(true)}>
          <span className="cart-icon">🛒</span>
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </button>
        {orderHistory.length > 0 && (
          <button className="orders-fab" onClick={() => navigate('/myorder')}>
            <span className="orders-icon">📋</span>
            <span className="orders-badge">{orderHistory.length}</span>
          </button>
        )}
      </div>
    </div>
  );
}
