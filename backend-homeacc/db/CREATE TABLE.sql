-- 1.
sudo - u postgres createdb - e entriesdb -- 2.
psql - d entriesdb - U suvadmin -- 3.
GRANT ALL PRIVILEGES ON DATABASE entriesdb TO suvadmin -- 4.

SET TIME ZONE 'UTC'; --4.5 oma käsky aja vaan tämä rivi

-- 4.7
    CREATE TABLE categories (
        CATEGORY_ID SERIAL PRIMARY KEY,
        CATEGORY_NAME VARCHAR(255),
        CATEGORY_DESCRIPTION TEXT,
        START timestamp without time zone NOT NULL DEFAULT DEFAULT now();, -- this is UTC
        STOP timestamp,
        DELETED BOOL NOT NULL DEFAULT FALSE,
        MODIFIED timestamp without time zone NOT NULL DEFAULT DEFAULT now();, -- this is UTC
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
        'Testi Autoilu',
        'Testi autoilu kategoria',
        current_timestamp AT TIME ZONE 'UTC',
        NULL,
        FALSE,
        current_timestamp AT TIME ZONE 'UTC',
        current_user
    );
-- 6.
-- now()::timestamp(0) - remove milliseconds to round nearest second
-- amount decimal 10 = how many numbers in total and 2 = two of them is decimal
ALTER TABLE entries (
    ENTRY_ID SERIAL PRIMARY KEY,
    ENTRY_NAME VARCHAR(255),
    ENTRY_DESCRIPTION TEXT,
    ENTRY_CATEGORY_ID INTEGER,
    START TIMESTAMP WITH TIME ZONE; NOT NULL DEFAULT now(),
    STOP TIMESTAMP WITH TIME ZONE,
    DELETED BOOL NOT NULL DEFAULT FALSE,
    MODIFIED TIMESTAMP WITH TIME ZONE; NOT NULL DEFAULT now(),
    MODIFIED_BY VARCHAR(30),
    AMOUNT DECIMAL(10,2) NOT NULL DEFAULT 0.0,
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


SELECT ENTRY_ID,
    ENTRY_NAME,
    ENTRY_DESCRIPTION,
    ENTRY_CATEGORY_ID,
    START,
    STOP,
    DELETED,
    MODIFIED,
    MODIFIED_BY
FROM entries AS Entry;


INSERT INTO entries(ENTRY_NAME, ENTRY_DESCRIPTION, ENTRY_CATEGORY_ID, MODIFIED_BY)VALUES('lidl testi sql','lidl testi sql on testi',2,'juho sql testi');
INSERT INTO entries(ENTRY_NAME, ENTRY_DESCRIPTION, ENTRY_CATEGORY_ID, MODIFIED_BY) VALUES(?,?,?,?);


ALTER TABLE entries
   ALTER COLUMN START SET DEFAULT (now() at time zone 'utc'),
   ALTER COLUMN MODIFIED SET DEFAULT (now() at time zone 'utc')

ALTER TABLE categories
    ALTER COLUMN STOP TYPE TIMESTAMP WITH TIME ZONE,
    ALTER COLUMN MODIFIED TYPE TIMESTAMP WITH TIME ZONE,
    ALTER COLUMN START TYPE TIMESTAMP WITH TIME ZONE ;