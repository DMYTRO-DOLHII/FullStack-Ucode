-- Insert data into races table
INSERT INTO races (name) VALUES
('Human'),
('Kree');

-- Insert data into powers table
INSERT INTO powers (name, type) VALUES
('bloody fist', 'attack'),
('iron shield', 'defense'),
('super strength', 'attack'),
('invulnerability', 'defense');

-- Insert data into teams table
INSERT INTO teams (name) VALUES
('Avengers'),
('Hydra'),
('Guardians of the Galaxy');

-- Update heroes table with race_id
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Human') WHERE name IN ('Iron Man', 'Captain America', 'Black Widow', 'Wolverine', 'Rocket Raccoon', 'Groot');
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Kree') WHERE name IN ('Thor');

-- Insert data into heroes_powers table
INSERT INTO heroes_powers (hero_id, power_id, power_points) VALUES
((SELECT id FROM heroes WHERE name = 'Iron Man'), (SELECT id FROM powers WHERE name = 'iron shield'), 200),
((SELECT id FROM heroes WHERE name = 'Thor'), (SELECT id FROM powers WHERE name = 'super strength'), 300);

-- Insert data into heroes_teams table
INSERT INTO heroes_teams (hero_id, team_id) VALUES
((SELECT id FROM heroes WHERE name = 'Iron Man'), (SELECT id FROM teams WHERE name = 'Avengers')),
((SELECT id FROM heroes WHERE name = 'Thor'), (SELECT id FROM teams WHERE name = 'Avengers')),
((SELECT id FROM heroes WHERE name = 'Wolverine'), (SELECT id FROM teams WHERE name = 'Hydra')),
((SELECT id FROM heroes WHERE name = 'Rocket Raccoon'), (SELECT id FROM teams WHERE name = 'Guardians of the Galaxy'));

