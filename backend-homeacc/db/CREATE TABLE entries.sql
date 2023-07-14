-- 1.
sudo - u postgres createdb - e entriesdb 

-- 2.
psql - d entriesdb - U suvadmin 

-- 3.
GRANT ALL PRIVILEGES ON DATABASE entriesdb TO suvadmin 

-- 4.
CREATE TABLE categories (
    CATEGORY_ID SERIAL PRIMARY KEY,
    CATEGORY_NAME VARCHAR(255),
    CATEGORY_DESCRIPTION TEXT,
    START timestamp without time zone NOT NULL DEFAULT (current_timestamp AT TIME ZONE 'UTC'),
    STOP timestamp,
    DELETED BOOL NOT NULL DEFAULT FALSE,
    MODIFIED timestamp without time zone NOT NULL DEFAULT (current_timestamp AT TIME ZONE 'UTC'),
    MODIFIED_BY VARCHAR(30)
);
-- 5. Insert into categories
INSERT INTO categories (
        CATEGORY_NAME,
        CATEGORY_DESCRIPTION,
        START,
        STOP,
        DELETED,
        MODIFIED,
        MODIFIED_BY
    )
VALUES (
        'Ravintola',
        'Ravintolassa/Noutoruoka',
        current_timestamp AT TIME ZONE 'UTC',
        NULL,
        FALSE,
        current_timestamp AT TIME ZONE 'UTC',
        current_user
    );

-- 6.
    CREATE TABLE entries (
        ENTRY_ID SERIAL PRIMARY KEY,
        ENTRY_NAME VARCHAR(255),
        ENTRY_DESCRIPTION TEXT,
        ENTRY_CATEGORY_ID INTEGER,
        START timestamp without time zone NOT NULL DEFAULT (current_timestamp AT TIME ZONE 'UTC'),
        STOP timestamp,
        DELETED BOOL NOT NULL DEFAULT FALSE,
        MODIFIED timestamp without time zone NOT NULL DEFAULT (current_timestamp AT TIME ZONE 'UTC'),
        MODIFIED_BY VARCHAR(30),
        CONSTRAINT FK_CATEGORY_ID FOREIGN KEY (ENTRY_CATEGORY_ID) REFERENCES categories(CATEGORY_ID)
    );

-- 7. 
INSERT INTO entries (
        ENTRY_NAME,
        ENTRY_DESCRIPTION,
        ENTRY_CATEGORY_ID,
        START,
        STOP,
        DELETED,
        MODIFIED,
        MODIFIED_BY
    )
VALUES (
        'Aaamiainen testi',
        'Käytiin hakee aamupalaa trub',
        1,
        '2023-07-06 12:00:00',
        null,
        false,
        '2023-07-06 12:00:00',
        current_user
    );


