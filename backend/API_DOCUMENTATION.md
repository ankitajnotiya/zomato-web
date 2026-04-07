# Zomato Clone API Documentation

## Authentication Endpoints

### 1. Register (Signup)
**POST** `/api/register`

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123",
    "phone": "9876543210",
    "address": "123 Main Street, Delhi"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Registration successful! Please login to continue.",
    "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```

### 2. Login
**POST** `/api/login`

**Request Body:**
```json
{
    "email": "john@example.com",
    "password": "password123"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Login successful!",
    "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "9876543210",
        "address": "123 Main Street, Delhi"
    },
    "token": "1|abc123token..."
}
```

### 3. Forgot Password
**POST** `/api/forgot-password`

**Request Body:**
```json
{
    "email": "john@example.com"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Password reset link sent to your email",
    "reset_token": "abc123token..." // Only for demo, remove in production
}
```

### 4. Reset Password
**POST** `/api/reset-password`

**Request Body:**
```json
{
    "email": "john@example.com",
    "token": "abc123token...",
    "password": "newpassword123",
    "password_confirmation": "newpassword123"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Password reset successful! Please login with your new password."
}
```

### 5. Logout (Protected)
**POST** `/api/logout`

**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
    "message": "Logged out successfully"
}
```

## Restaurant Endpoints

### 1. Get All Restaurants
**GET** `/api/restaurants`

**Response:**
```json
[
    {
        "id": 1,
        "name": "Burger Palace",
        "description": "Best burgers in town",
        "address": "123 Main Street, Delhi",
        "phone": "9876543210",
        "cuisine_type": "American",
        "price_range": "$$",
        "rating": 4.5,
        "delivery_time": 30,
        "delivery_fee": 40.00,
        "is_active": true,
        "menu_items": [...]
    }
]
```

### 2. Get Single Restaurant
**GET** `/api/restaurants/{id}`

### 3. Get Restaurant Menu
**GET** `/api/restaurants/{id}/menu`

**Response:**
```json
{
    "restaurant": {...},
    "menu_items": [
        {
            "id": 1,
            "name": "Classic Burger",
            "description": "Juicy beef patty",
            "price": 250.00,
            "is_available": true
        }
    ]
}
```

## Order Endpoints (Protected)

### 1. Get User Orders
**GET** `/api/orders`

**Headers:** `Authorization: Bearer {token}`

### 2. Create Order
**POST** `/api/orders`

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
    "restaurant_id": 1,
    "items": [
        {
            "menu_item_id": 1,
            "quantity": 2
        }
    ],
    "delivery_address": "123 Main Street, Delhi"
}
```

### 3. Get Order Details
**GET** `/api/orders/{id}`

## Contact Form Endpoints

### 1. Submit Contact Form
**POST** `/contact.php`

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "subject": "Order Issue",
    "message": "I have a problem with my recent order..."
}
```

**Response:**
```json
{
    "success": true,
    "message": "Contact form submitted successfully",
    "submission_id": 123
}
```

## Error Responses

All endpoints return consistent error format:

```json
{
    "success": false,
    "message": "Error description",
    "errors": {...} // Validation errors if any
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `204` - No Content
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Frontend Integration

### Authentication Flow:
1. User goes to `/register` page → signup form
2. After successful registration → redirect to `/login`
3. User logs in → get token → store in localStorage
4. Use token in all protected requests
5. User can logout → clear token → redirect to `/login`

### Password Reset Flow:
1. User goes to `/forgot-password` → enter email
2. Receive reset token (demo: shown in response)
3. Go to `/reset-password/{token}` → enter new password
4. After reset → redirect to `/login`
