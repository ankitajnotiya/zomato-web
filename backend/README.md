# Zomato Clone Backend

Laravel 12 backend API for the Zomato Clone application.

## Requirements

- PHP 8.2+
- MySQL 8.0+
- Composer

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   composer install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Configure database in `.env` file:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=zomato_clone
   DB_USERNAME=root
   DB_PASSWORD=
   ```

6. Import the database:
   ```bash
   mysql -u root -p zomato_clone < database.sql
   ```

7. Run migrations and seeders:
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

8. Start the development server:
   ```bash
   php artisan serve
   ```

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `POST /api/refresh` - Refresh token

### Restaurants
- `GET /api/restaurants` - List all restaurants
- `GET /api/restaurants/{id}` - Get restaurant details
- `GET /api/restaurants/{id}/menu` - Get restaurant menu
- `POST /api/restaurants` - Create restaurant (admin)
- `PUT /api/restaurants/{id}` - Update restaurant (admin)
- `DELETE /api/restaurants/{id}` - Delete restaurant (admin)

### Menu
- `GET /api/menu/{restaurant_id}` - Get restaurant menu
- `POST /api/menu` - Add menu item (admin)
- `PUT /api/menu/{id}` - Update menu item (admin)
- `DELETE /api/menu/{id}` - Delete menu item (admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/{id}` - Get order details
- `PUT /api/orders/{id}/status` - Update order status

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/{id}` - Remove item from cart

### Reviews
- `GET /api/reviews/restaurant/{id}` - Get restaurant reviews
- `POST /api/reviews` - Add review
- `PUT /api/reviews/{id}` - Update review
- `DELETE /api/reviews/{id}` - Delete review

## Database Schema

The application uses the following main tables:

- `users` - User accounts
- `restaurants` - Restaurant information
- `menu_categories` - Menu categories
- `menu_items` - Menu items
- `orders` - Customer orders
- `order_items` - Order line items
- `reviews` - Restaurant reviews
- `cart` - Shopping cart items
- `user_addresses` - User delivery addresses

## Security

- JWT authentication for API endpoints
- Password hashing using bcrypt
- Input validation and sanitization
- CORS configuration for frontend integration

## Testing

Run the test suite:

```bash
php artisan test
```

## Deployment

For production deployment:

1. Set `APP_ENV=production` in `.env`
2. Run `php artisan config:cache`
3. Run `php artisan route:cache`
4. Run `php artisan view:cache`
5. Set up proper file permissions for storage directory
6. Configure web server to point to the `public` directory
