DROP TABLE IF EXISTS customers; 

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    "firstName" character varying NOT NULL,
    "lastName" character varying,
    email character varying UNIQUE NOT NULL,
    password character varying NOT NULL, 
    "companyName" character varying,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT now()
);

CREATE UNIQUE INDEX idx_customer_email ON customers (email);

