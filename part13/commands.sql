CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('Owner of the Blog', 'www.google.com', 'testing with likes', 12);
insert into blogs (author, url, title) values ('Second owner of the Blog', 'www.facebook.com', 'testing with default likes');
