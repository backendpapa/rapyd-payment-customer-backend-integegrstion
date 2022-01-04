CREATE TABLE people(
    ID SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    referenceid VARCHAR(255) NOT NULL,
    type VARCHAR(55) NOT NULL,
    ewallet VARCHAR(255),
    customerid VARCHAR(255),
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);