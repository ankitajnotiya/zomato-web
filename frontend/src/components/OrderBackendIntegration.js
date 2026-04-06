// Order Backend Integration Component

const API_BASE_URL = 'http://localhost:8000/api';

export const placeOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/place-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        order: data.order,
        message: data.message
      };
    } else {
      return {
        success: false,
        message: data.message
      };
    }
  } catch (error) {
    console.error('Order API Error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection.'
    };
  }
};

// Function to be called from your payment modal
export const handleOrderSubmission = async (
  deliveryDetails, 
  paymentMethod, 
  paymentDetails, 
  cart, 
  totalAmount
) => {
  // Prepare order data for backend
  const orderData = {
    customer_name: deliveryDetails.name,
    customer_phone: deliveryDetails.phone,
    delivery_address: deliveryDetails.address,
    delivery_city: deliveryDetails.city,
    delivery_pincode: deliveryDetails.pincode,
    delivery_landmark: deliveryDetails.landmark || '',
    payment_method: paymentMethod,
    total_amount: totalAmount,
    cart_items: cart.map(item => ({
      name: item.name,
      price: parseFloat(item.price.replace('₹', '')),
      quantity: item.quantity,
      image: item.image || ''
    }))
  };

  // Add payment method specific details
  if (paymentMethod === 'upi') {
    orderData.upi_id = paymentDetails.upiId;
  } else if (paymentMethod === 'card') {
    orderData.card_number = paymentDetails.number;
    orderData.card_expiry = paymentDetails.expiry;
    orderData.card_cvv = paymentDetails.cvv;
    orderData.cardholder_name = paymentDetails.name;
  }

  // Send order to backend
  const result = await placeOrder(orderData);
  
  return result;
};

// Usage in your payment modal:
/*
const handlePaymentSubmit = async (e) => {
  e.preventDefault();
  
  // Show processing state
  setProcessing(true);
  
  try {
    const result = await handleOrderSubmission(
      deliveryDetails,
      paymentMethod,
      paymentMethod === 'upi' ? { upiId } : 
      paymentMethod === 'card' ? cardDetails : {},
      cart,
      getCartTotal()
    );
    
    if (result.success) {
      // Move to confirmation step
      setPaymentStep(3);
      setOrderId(result.order.order_id);
      setOrderPlaced(true);
      
      // Clear cart
      setCart([]);
      setShowCart(false);
      
      console.log('Order placed:', result.order);
    } else {
      // Show error message
      alert(result.message);
    }
  } catch (error) {
    alert('Failed to place order. Please try again.');
  } finally {
    setProcessing(false);
  }
};
*/
