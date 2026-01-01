DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    "firstName" character varying,
    "lastName" character varying,
    email character varying UNIQUE NOT NULL,
    password character varying,
    "companyName" character varying,

    "phoneNumber" character varying,
    "resetPasswordToken" character varying,
    "resetPasswordExpires" TIMESTAMP WITH TIME ZONE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_customer_email ON customers (email);