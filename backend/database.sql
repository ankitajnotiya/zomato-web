-- Zomato Clone Complete Database Schema
-- MySQL Database - Single Database with All Tables

CREATE DATABASE IF NOT EXISTS zomato;
USE zomato;

-- Login table (for user login authentication)
CREATE TABLE login (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    email_verified_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample login users
INSERT INTO login (name, email, password, phone, address) VALUES
('Admin User', 'admin@zomato.com', 'admin123', '9876543210', '123 Admin Street, Delhi'),
('Test User', 'test@example.com', 'password123', '9876543211', '456 Test Road, Mumbai'),
('John Doe', 'john@example.com', 'password123', '9876543212', '789 John Lane, Bangalore');

-- Signup table (for new user registrations)
CREATE TABLE signup (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    email_verified_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample signup users
INSERT INTO signup (name, email, password, phone, address) VALUES
('New User 1', 'newuser1@example.com', 'password123', '9876543213', '111 New Street, Delhi'),
('New User 2', 'newuser2@example.com', 'password123', '9876543214', '222 New Road, Mumbai');

-- Forgot password table (for password reset functionality)
CREATE TABLE forgot_password (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    INDEX idx_email (email),
    INDEX idx_token (token)
);

-- Insert sample forgot password tokens
INSERT INTO forgot_password (email, token, expires_at) VALUES
('test@example.com', 'abc123token', DATE_ADD(NOW(), INTERVAL 1 HOUR)),
('admin@zomato.com', 'xyz456token', DATE_ADD(NOW(), INTERVAL 1 HOUR));

-- Email verification table
CREATE TABLE email_verifications (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    verified_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_token (token)
);

-- User addresses table
CREATE TABLE user_addresses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    type ENUM('home', 'work', 'other') DEFAULT 'home',
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id)
);

-- Insert sample addresses
INSERT INTO user_addresses (user_id, type, address_line1, city, state, postal_code, is_default) VALUES
(1, 'home', '123 Admin Street', 'Delhi', 'Delhi', '110001', TRUE),
(2, 'home', '456 Test Road', 'Mumbai', 'Maharashtra', '400001', TRUE),
(3, 'home', '789 John Lane', 'Bangalore', 'Karnataka', '560001', TRUE);

-- Restaurants table
CREATE TABLE restaurants (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    phone VARCHAR(20),
    cuisine_type VARCHAR(100),
    price_range ENUM('$', '$$', '$$$', '$$$$') DEFAULT '$$',
    rating DECIMAL(3,2) DEFAULT 0.00,
    delivery_time INT DEFAULT 30,
    delivery_fee DECIMAL(8,2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (is_active),
    INDEX idx_cuisine (cuisine_type)
);

-- Insert sample restaurants
INSERT INTO restaurants (name, description, address, phone, cuisine_type, price_range, rating, delivery_time, delivery_fee) VALUES
('Burger Palace', 'Best burgers in town with fresh ingredients', '123 Main Street, Delhi', '9876543210', 'American', '$$', 4.5, 30, 40.00),
('Pizza Heaven', 'Authentic Italian pizza with wood-fired oven', '456 Park Avenue, Mumbai', '9876543211', 'Italian', '$$$', 4.3, 35, 50.00),
('Spice Garden', 'Traditional Indian cuisine with modern twist', '789 Market Road, Bangalore', '9876543212', 'Indian', '$$', 4.7, 25, 30.00),
('Chinese Wok', 'Authentic Chinese food with modern flavors', '321 Food Street, Delhi', '9876543213', 'Chinese', '$$', 4.2, 40, 35.00),
('Sweets Corner', 'Traditional Indian sweets and desserts', '654 Sweet Lane, Mumbai', '9876543214', 'Desserts', '$', 4.8, 20, 25.00);

-- Menu categories table
CREATE TABLE menu_categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    restaurant_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_restaurant (restaurant_id)
);

-- Insert sample menu categories
INSERT INTO menu_categories (restaurant_id, name) VALUES
(1, 'Burgers'), (1, 'Sides'), (1, 'Beverages'),
(2, 'Pizza'), (2, 'Pasta'), (2, 'Salads'),
(3, 'Starters'), (3, 'Main Course'), (3, 'Desserts'),
(4, 'Noodles'), (4, 'Rice'), (4, 'Appetizers'),
(5, 'Sweets'), (5, 'Beverages');

-- Menu items table
CREATE TABLE menu_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    restaurant_id BIGINT UNSIGNED NOT NULL,
    category_id BIGINT UNSIGNED NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(8,2) NOT NULL,
    image_url VARCHAR(255),
    is_vegetarian BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    preparation_time INT DEFAULT 15,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_restaurant (restaurant_id),
    INDEX idx_category (category_id),
    INDEX idx_available (is_available)
);

-- Insert sample menu items
INSERT INTO menu_items (restaurant_id, category_id, name, description, price, is_vegetarian, preparation_time) VALUES
(1, 1, 'Classic Burger', 'Juicy beef patty with lettuce, tomato, and special sauce', 250.00, FALSE, 15),
(1, 1, 'Veggie Burger', 'Plant-based patty with fresh vegetables', 200.00, TRUE, 12),
(1, 1, 'Cheese Burger', 'Classic burger with extra cheese', 280.00, FALSE, 15),
(1, 2, 'French Fries', 'Crispy golden fries with sea salt', 120.00, TRUE, 8),
(1, 2, 'Onion Rings', 'Crispy battered onion rings', 140.00, TRUE, 10),
(1, 3, 'Coca Cola', 'Refreshing cola drink', 60.00, TRUE, 2),
(2, 4, 'Margherita Pizza', 'Fresh mozzarella, tomato sauce, and basil', 350.00, TRUE, 20),
(2, 4, 'Pepperoni Pizza', 'Classic pepperoni with mozzarella', 400.00, FALSE, 22),
(2, 4, 'Veggie Pizza', 'Bell peppers, mushrooms, olives, and onions', 380.00, TRUE, 20),
(2, 5, 'Spaghetti Carbonara', 'Creamy pasta with bacon and parmesan', 320.00, FALSE, 18),
(3, 6, 'Samosa', 'Crispy pastry filled with spiced potatoes', 80.00, TRUE, 10),
(3, 6, 'Paneer Tikka', 'Grilled cottage cheese with spices', 380.00, TRUE, 15),
(3, 7, 'Butter Chicken', 'Tender chicken in rich buttery tomato gravy', 450.00, FALSE, 25),
(3, 7, 'Dal Makhani', 'Creamy black lentils with butter', 320.00, TRUE, 20),
(4, 8, 'Hakka Noodles', 'Stir-fried noodles with vegetables', 280.00, TRUE, 15),
(4, 9, 'Fried Rice', 'Steamed rice with vegetables and soy sauce', 260.00, TRUE, 12),
(5, 10, 'Gulab Jamun', 'Soft milk dumplings in sugar syrup', 120.00, TRUE, 5),
(5, 10, 'Rasgulla', 'Soft spongy cheese balls in sugar syrup', 100.00, TRUE, 5);

-- Orders table (myorder)
CREATE TABLE orders (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    restaurant_id BIGINT UNSIGNED NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    delivery_fee DECIMAL(8,2) DEFAULT 0.00,
    final_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled') DEFAULT 'pending',
    payment_method ENUM('cash', 'card', 'upi', 'wallet') DEFAULT 'cash',
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    delivery_address TEXT NOT NULL,
    special_instructions TEXT,
    estimated_delivery_time TIMESTAMP NULL,
    delivered_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user (user_id),
    INDEX idx_restaurant (restaurant_id),
    INDEX idx_status (status),
    INDEX idx_order_number (order_number)
);

-- Order items table
CREATE TABLE order_items (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT UNSIGNED NOT NULL,
    menu_item_id BIGINT UNSIGNED NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(8,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_order (order_id),
    INDEX idx_menu_item (menu_item_id)
);

-- Cart table
CREATE TABLE cart (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    restaurant_id BIGINT UNSIGNED NOT NULL,
    menu_item_id BIGINT UNSIGNED NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_cart_item (user_id, restaurant_id, menu_item_id),
    INDEX idx_user (user_id),
    INDEX idx_restaurant (restaurant_id)
);

-- Users table (for real user data from signup)
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    email_verified_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample users with plain passwords
INSERT INTO users (name, email, password, phone, address) VALUES
('Ankit Malviya', 'ankit@example.com', 'password123', '7470540178', 'Ashta, Ashta'),
('Test User', 'test@example.com', 'password123', '9876543211', '456 Test Road, Mumbai'),
('John Doe', 'john@example.com', 'password123', '9876543212', '789 John Lane, Bangalore');

-- Reviews table
CREATE TABLE reviews (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    restaurant_id BIGINT UNSIGNED NOT NULL,
    order_id BIGINT UNSIGNED,
    rating DECIMAL(2,1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_restaurant (restaurant_id),
    INDEX idx_user (user_id)
);

-- User favorites table
CREATE TABLE user_favorites (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    restaurant_id BIGINT UNSIGNED NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_favorite (user_id, restaurant_id),
    INDEX idx_user (user_id),
    INDEX idx_restaurant (restaurant_id)
);

-- Authentication tokens table (for API authentication)
CREATE TABLE personal_access_tokens (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tokenable_type VARCHAR(255) NOT NULL,
    tokenable_id BIGINT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    token VARCHAR(64) UNIQUE NOT NULL,
    abilities TEXT,
    last_used_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_token (token),
    INDEX idx_tokenable (tokenable_type, tokenable_id)
);

-- Contacts table (for contact form submissions)
CREATE TABLE contacts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('pending', 'read', 'resolved') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Password reset tokens table (Laravel 11 compatible)
CREATE TABLE password_reset_tokens (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_token (token),
    INDEX idx_expires (expires_at)
);

-- Create performance indexes
CREATE INDEX idx_login_email ON login(email);
CREATE INDEX idx_signup_email ON signup(email);
CREATE INDEX idx_restaurants_active ON restaurants(is_active);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_cart_user ON cart(user_id);
CREATE INDEX idx_reviews_restaurant ON reviews(restaurant_id);
CREATE INDEX idx_contact_email ON contacts(email);
CREATE INDEX idx_contact_status ON contacts(status);
