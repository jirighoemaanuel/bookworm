-- book table
CREATE TABLE book (
	id SERIAL PRIMARY KEY,
	author VARCHAR(50),
	title VARCHAR(100),
	description TEXT,
	note TEXT,
	isbn TEXT,
	rating INT,
	date_read VARCHAR(20),
	amazon_link TEXT
);

-- insert data
INSERT INTO book (author, title, description, note, isbn, rating, date_read, amazon_link)
VALUES ('Chinua Achebe', 'Things Fall Apart', 'A classic novel about the impact of colonialism on traditional African society', 'Powerful storytelling and insightful commentary', '9780385474546', 4.5, '2024-01-20', 'https://www.amazon.com/Things-Fall-Apart-Chinua-Achebe/dp/0385474547');
