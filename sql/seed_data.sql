use keysmanager;

-- Insert sample data into tokens table
INSERT INTO tokens (token_number, token_type, token_description) VALUES
(1, 'RFID', 'RFID Token für den Übungsplatz'),
(2, 'Schlüssel', 'Schlüssel für die Werkstatt'),
(3, 'RFID', 'RFID Token für den Schulungsraum'),
(4, 'RFID', 'RFID Token für den Pausenraum'),
(5, 'RFID', 'RFID Token für den Parkplatz');

-- Insert sample data into mitarbeiter table
INSERT INTO mitarbeiter (vorname, nachname, email, position, status) VALUES
    ('Max', 'Mustermann', 'max.mustermann@company.at', 'Fahrlehrer', 1),
    ('Anna', 'Schmidt', 'anna.schmidt@company.at', 'Sekretärin', 0),
    ('Peter', 'Müller', 'peter.mueller@company.at', 'Manager', 0),
    ('Sabine', 'Klein', 'sabine.klein@company.at', 'Reinigungsfachkraft', 1),
    ('Tom', 'Bauer', 'tom.bauer@company.at', 'Techniker', 0),
    ('Lisa', 'Weber', 'lisa.weber@company.at', 'Programmiererin', 1),
    ('Michael', 'Fischer', 'michael.fischer@company.at', 'Buchhalter', 0);

-- Insert sample data into keysmitarbeiter table
INSERT INTO keyassignments (token_id, mitarbeiter_id, ausgabedatum) VALUES
    (1, 1, '2023-01-01'),
    (2, 2, '2023-02-01'),
    (3, 3, '2023-03-01'),
    (4, 4, '2023-04-01'),
    (5, 5, '2023-05-01'),
    (1, 6, '2023-06-01'),
    (2, 7, '2023-07-01');