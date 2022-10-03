SELECT count(user_book.reading_status), book_id, book.title, book.book_picture, user_book.reading_status
FROM user_book INNER JOIN book ON book.id = user_book.book_id where user_book.reading_status = 'read' 
GROUP BY user_book.reading_status,book_id, book.title, book.book_picture
order by count(user_book.reading_status) desc Limit 5


SELECT count(user_book.reading_status), book_id, book.title, book.book_picture, user_book.reading_status
FROM user_book INNER JOIN book ON book.id = user_book.book_id where user_book.reading_status = 'want to read' 
GROUP BY user_book.reading_status,book_id, book.title, book.book_picture
order by count(user_book.reading_status) desc Limit 5

SELECT avg(user_book.rating), book_id, book.title, book.book_picture, count(user_book.rating)
FROM user_book INNER JOIN book ON book.id = user_book.book_id 
GROUP BY user_book.reading_status,book_id, book.title, book.book_picture 
having count(user_book.rating) > 10
order by avg(user_book.rating) desc Limit 5

SELECT avg(user_book.rating), book_id, count(user_book.reading_status), user_book.reading_status
FROM book INNER JOIN user_book ON book.id = user_book.book_id WHERE book.id = 3
GROUP BY user_book.reading_status,book_id, book.title, book.book_picture 

select * from book where book.id = 4


SELECT 
    book.id,
    title,
    publish_date,
    book_picture,
    pages,
    isbn,
    book.info,
    author_name,
    publisher_name
FROM book
INNER JOIN author_book ON author_book.book_id = book.id
INNER JOIN author ON author_book.author_id = author.id
INNER JOIN book_publisher ON book_publisher.book_id = book.id
INNER JOIN publisher ON book_publisher.publisher_id = publisher.id
Where book.id = 4


select * from users

delete from users where id > 1041