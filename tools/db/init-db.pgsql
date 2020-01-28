DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
    , name varchar(50) NOT NULL
    , username varchar(50) NOT NULL
    , password varchar(250) NOT NULL
);

TRUNCATE TABLE users;

INSERT INTO users 
    (name, username, password) VALUES
    ('Ricardo Roman', 'admin', '123456');
