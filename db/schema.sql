CREATE SCHEMA API_REST;

USE API_REST;

CREATE TABLE users (
    id_user INT AUTO_INCREMENT PRIMARY KEY,

    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,

    first_name VARCHAR(100),
    last_name VARCHAR(100),

    password_hash VARCHAR(255) NOT NULL,

    is_active BOOLEAN DEFAULT TRUE,

    last_login_at DATETIME NULL,

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME null,
    last_ip VARBINARY(16) NOT NULL
);

CREATE TABLE roles(
    id_role INT AUTO_INCREMENT PRIMARY KEY,
    typerole VARCHAR (50)
);

CREATE TABLE user_roles (
    id_user INT NOT NULL,
    id_role INT NOT NULL,

    PRIMARY KEY (id_user, id_role),

    FOREIGN KEY (id_role) REFERENCES users(id_user),
    FOREIGN KEY (id_role) REFERENCES roles(id_role)
);

-- Save ip optimized
-- UPDATE users SET last_ip = INET6_ATON('::ffff:127.0.0.1') WHERE id_user = 1;

-- Show ips
-- SELECT id_user, last_login_at, INET6_NTOA(last_ip) AS ip_legible FROM users;

-- Find ip
-- SELECT id_user, last_login_at FROM users WHERE last_ip = INET6_ATON('::ffff:127.0.0.1');