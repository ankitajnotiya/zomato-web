<?php
// Simple API for Laravel - Direct Database Connection
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection
$host = '127.0.0.1';
$dbname = 'zomato';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $request_uri = $_SERVER['REQUEST_URI'];
    $method = $_SERVER['REQUEST_METHOD'];
    
    // Remove query string from URI
    $path = parse_url($request_uri, PHP_URL_PATH);
    
    // Login endpoint - Check from signup table with plain password
    if ($method === 'POST' && $path === '/api/login') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Check in signup table (real user data from signup)
        $stmt = $pdo->prepare("SELECT * FROM signup WHERE email = ?");
        $stmt->execute([$input['email']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Check plain password (no hashing)
        if ($user && $input['password'] === $user['password']) {
            $token = 'token_' . uniqid() . '_' . time();
            
            echo json_encode([
                'success' => true,
                'message' => 'Login successful!',
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'phone' => $user['phone'],
                    'address' => $user['address']
                ],
                'token' => $token
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Invalid email or password'
            ]);
        }
    }
    
    // Signup endpoint - Save in signup table with plain password
    elseif ($method === 'POST' && $path === '/api/signup') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Save plain password (no hashing)
        $plainPassword = $input['password'];
        
        // Insert into signup table (not users table)
        $stmt = $pdo->prepare("INSERT INTO signup (name, email, password, phone, address, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())");
        $stmt->execute([$input['name'], $input['email'], $plainPassword, $input['phone'] ?? null, $input['address'] ?? null]);
        
        // Get the inserted user ID
        $userId = $pdo->lastInsertId();
        
        echo json_encode([
            'success' => true,
            'message' => 'Registration successful!',
            'data' => [
                'user' => [
                    'id' => $userId,
                    'name' => $input['name'],
                    'email' => $input['email'],
                    'phone' => $input['phone'] ?? null,
                    'address' => $input['address'] ?? null
                ]
            ]
        ]);
    }
    
    // Forgot password endpoint
    elseif ($method === 'POST' && $path === '/api/forgot-password') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Check if email exists in users table
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$input['email']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            echo json_encode([
                'success' => false,
                'message' => 'No account found with this email address'
            ]);
            exit;
        }
        
        $token = 'reset_' . uniqid() . '_' . time();
        $stmt = $pdo->prepare("INSERT INTO password_reset_tokens (email, token, expires_at, used, created_at, updated_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR), 0, NOW(), NOW())");
        $stmt->execute([$input['email'], $token]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Password reset link has been sent to your email address',
            'token' => $token
        ]);
    }
    
    // Contact form endpoint
    elseif ($method === 'POST' && $path === '/api/contact') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $stmt = $pdo->prepare("INSERT INTO contact_submissions (name, email, phone, subject, message, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())");
        $stmt->execute([$input['name'], $input['email'], $input['phone'] ?? null, $input['subject'], $input['message']]);
        
        $submissionId = $pdo->lastInsertId();
        
        echo json_encode([
            'success' => true,
            'message' => 'Contact form submitted successfully',
            'submission_id' => $submissionId
        ]);
    }
    
    else {
        echo json_encode([
            'success' => false,
            'message' => 'Endpoint not found'
        ]);
    }
    
} catch(PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>
