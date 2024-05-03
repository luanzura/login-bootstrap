CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(45),
  second_name VARCHAR(45),
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  token TEXT
);