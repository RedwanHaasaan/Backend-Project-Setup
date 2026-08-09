-- Select specific columns
SELECT id, name, email FROM users;

-- Column aliases
SELECT id AS user_id, name AS full_name, email AS user_email FROM users;

-- Arithmetic operations and functions
SELECT 
  id, 
  count, 
  count * 10 AS estimated_reach 
FROM post_views;

-- Extract year from date
SELECT 
  id, 
  created_at, 
  EXTRACT(YEAR FROM created_at) AS year_created 
FROM posts;

-- Concatenation
SELECT 
  name, 
  'User: ' || name AS display_name 
FROM users;

-- Handle null values
SELECT 
  name, 
  COALESCE(bio, 'No bio provided') AS bio_summary 
FROM users;

--filter by name
SELECT * FROM users WHERE name = 'John Doe';

SELECT * FROM users WHERE role = 'admin' AND dob > '1990-01-01';

-- Count total posts by author
SELECT author_id, COUNT(*) AS total_posts
FROM posts
GROUP BY author_id;

-- Only show posts with more than 2 posts
SELECT author_id, COUNT(*) AS total_posts
FROM posts
GROUP BY author_id
HAVING COUNT(*) > 2;

-- Find users who have at least 3 posts, and only show their ID, name, and post count

SELECT u.id, u.name, COUNT(p.id) AS post_count
FROM users AS u
JOIN posts AS p ON u.id = p.author_id
GROUP BY u.id, u.name
HAVING COUNT(p.id) >= 1
ORDER BY post_count DESC
LIMIT 5;


-- Inner Join
SELECT 
  posts.id AS post_id, 
  posts.title, 
  users.name AS author_name
FROM posts
INNER JOIN users ON posts.author_id = users.id;
-- LEFT JOIN
SELECT 
  users.id, 
  users.name, 
  posts.title
FROM users
LEFT JOIN posts ON users.id = posts.author_id;