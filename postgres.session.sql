SELECT avg(user_book.rating), book_id, book.title, book.book_picture, count(user_book.rating)
FROM user_book INNER JOIN book ON book.id = user_book.book_id 
GROUP BY user_book.reading_status,book_id, book.title, book.book_picture 
having count(user_book.rating) > 50
order by avg(user_book.rating) desc Limit 5

SELECT count(user_book.reading_status) as most_viewed, book_id, book.title, book.book_picture, user_book.reading_status
FROM user_book INNER JOIN book ON book.id = user_book.book_id where user_book.reading_status = 'read' 
GROUP BY user_book.reading_status,book_id, book.title, book.book_picture
order by count(user_book.reading_status) desc Limit 5


SELECT count(user_book.reading_status), book_id, book.title, book.book_picture, user_book.reading_status
FROM user_book INNER JOIN book ON book.id = user_book.book_id where user_book.reading_status = 'want to read' 
GROUP BY user_book.reading_status,book_id, book.title, book.book_picture
order by count(user_book.reading_status) desc Limit 5


SELECT * FROM users; 
INNER JOIN user_book ON user.id = user_book.user_id
INNER JOIN book ON user_book.book_id = book.id

select date_trunc('year', publish_date), count(book.id) from users inner join user_book on users.id = user_book.user_id 
inner join book on user_book.book_id = book.id where users.id = 2 and reading_status = 'read' group by date_trunc('year', publish_date); 

SELECT avg(user_book.rating) as average_score, book_id, book.title, book.book_picture, count(user_book.rating)
FROM user_book INNER JOIN book ON user_book.book_id = book.id WHERE book.id = 5
GROUP BY user_book.reading_status,book_id, book.title, book.book_picture;

select * from book where ISBN = '9780439926225'
select count (*) from book

select title, book_picture from book where name 

INSERT INTO book_review (user_id, book_id,content, private, spoiler, active) VALUES(1,1,'i like it', false,true,false)
SELECT * FROM book_review WHERE book_Id=6803 AND user_id=1;
DELETE FROM book_review WHERE book_Id=6803 AND user_id=1;

SELECT * FROM user_book WHERE book_Id=6803 AND user_id=1;

select * from book 
inner join author_book on book.id = author_book.book_Id 
inner join author on author.id = author_book.author_id
where author_name = 'Rowling, J. K.'