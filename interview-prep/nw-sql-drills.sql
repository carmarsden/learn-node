-- 1. Get all restaurants
-- Write a query that returns all of the restaurants, with all of the fields.

SELECT * FROM restaurants;

-- 2. Get Italian restaurants
-- Write a query that returns all of the Italian restaurants, with all of the fields

SELECT * FROM restaurants WHERE cuisine = 'Italian';

-- 3. Get 10 Italian restaurants, subset of fields
-- Write a query that gets 10 Italian restaurants, returning only the id and name fields.

SELECT (id, name) 
    FROM restaurants 
    WHERE cuisine = 'Italian'
    LIMIT 10
;

-- 4. Count of Thai restaurants
-- Write a query that returns the number of Thai restaurants.

SELECT COUNT(*) 
    FROM restaurants 
    WHERE cuisine = 'Thai'
;

-- 5. Count of restaurants
-- Write a query that returns the total number of restaurants.

SELECT COUNT(*) FROM restaurants;

-- 6. Count of Thai restaurants in zip code
-- Write a query that returns the number of Thai restaurants in the 11372 zip code.

SELECT COUNT(*) 
    FROM restaurants 
    WHERE cuisine = 'Thai'
    AND address_zipcode = '11372'
;

-- 7. Italian restaurants in one of several zip codes
-- Write a query that returns the id and name of five Italian restaurants in the 10012, 10013, or 10014 zip codes. 
-- The initial results (before limiting to five) should be alphabetically sorted.

SELECT (id, name) 
    FROM restaurants 
    WHERE cuisine = 'Italian'
    AND address_zipcode IN ('10012', '10013', '10014')
    ORDER BY name
    LIMIT 5
;


-- 8. Create a restaurant
-- Create a restaurant with the following properties:

-- name: 'Byte Cafe',
-- borough: 'Brooklyn',
-- cuisine: 'coffee',
-- address_building_number: '123',
-- address_street: 'Atlantic Avenue',
-- address_zipcode: '11231'

INSERT INTO restaurants 
    (name, borough, cuisine, address_building_number, address_street, address_zipcode)
    VALUES ('Byte Cafe', 'Brooklyn', 'coffee', '123', 'Atlantic Avenue', '11231')
;

-- 9. Create a restaurant and return id and name
-- Create a restaurant with values of your choosing, and return the id and name.

INSERT INTO restaurants 
    (name, borough, cuisine, address_building_number, address_street, address_zipcode)
    VALUES ('Caroline''s Cafe', 'Manhattan', 'American', '11', 'Marsden Manse', '11231')
    RETURNING (id, name)
;

-- 10. Create three restaurants and return id and name
-- Create three restaurants using a single command, with values of your choosing, returning the id and name of each restaurant.

INSERT INTO restaurants
    (name, borough, cuisine, address_building_number, address_street, address_zipcode)
    VALUES ('Shake Shack', 'Manhattan', 'burgers', '300', 'E 40th Street', '10016'),
    ('Bagel Boss', 'Manhattan', 'bagels', '441', '3rd Avenue', '10016'),
    ('Bare Burger', 'Manhattan', 'burgers', '232', '3rd Avenue', '10016')
    RETURNING id, name
;


-- 11. Update a record
-- Update the record whose value for nyc_restaurant_id is '30191841'. 
-- Change the name from 'Dj Reynolds Pub And Restaurant' to 'DJ Reynolds Pub and Restaurant'.

UPDATE restaurants
    SET name = 'DJ Reynolds Pub and Restaurant'
    WHERE nyc_restaurant_id = '30191841'
;

-- 12. Delete by id
-- Delete the grade whose id is 10.

DELETE FROM grades WHERE id = 10;

-- 13. A blocked delete
-- Try deleting the restaurant with id of 22. What error do you get?
-- Paste the error text for the answer. 

DELETE FROM restaurants WHERE id = 22;

`ERROR:  update or delete on table "restaurants" violates foreign key constraint "grades_restaurant_id_fkey" on table "grades"
DETAIL:  Key (id)=(22) is still referenced from table "grades".`


-- 14. Create a table
-- Create a new table called inspectors with the following properties:

-- first_name: String of inspector's first name, required
-- last_name: String of inspector's last name, required
-- borough: The borough the inspector works in, not required, one of Bronx, Brooklyn, Manhattan, Queens, Staten Island.
-- inspectors should also have a system generated primary key property, id.

-- Note that the borough property requires you to use an enumerated type, which is a list of set values you can use for a property. You can use an existing enumerated type that will already be in the table: borough_options.

CREATE TABLE inspectors (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    borough borough_options
);

-- 15. Update a table
-- Add a notes field to the grades table. notes are not required, and are text.

ALTER TABLE grades 
    ADD COLUMN notes TEXT
;

-- 16. Drop a table
-- Drop the inspectors table from the database.

DROP TABLE inspectors;