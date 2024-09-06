-- 1. Get all heroes with their team name. NULL if the hero has no team.
SELECT h.id AS hero_id, h.name AS hero_name, t.name AS team_name
FROM heroes h
LEFT JOIN heroes_teams ht ON h.id = ht.hero_id
LEFT JOIN teams t ON ht.team_id = t.id;

-- 2. Get all heroes with their powers. All powers should be listed, even if nobody has them.
SELECT h.id AS hero_id, h.name AS hero_name, p.name AS power_name
FROM heroes h
LEFT JOIN heroes_powers hp ON h.id = hp.hero_id
LEFT JOIN powers p ON hp.power_id = p.id;

-- 3. Get heroes with their powers and teams. Only heroes with both power and team are displayed.
SELECT DISTINCT h.id AS hero_id, h.name AS hero_name, p.name AS power_name, t.name AS team_name
FROM heroes h
INNER JOIN heroes_powers hp ON h.id = hp.hero_id
INNER JOIN powers p ON hp.power_id = p.id
INNER JOIN heroes_teams ht ON h.id = ht.hero_id
INNER JOIN teams t ON ht.team_id = t.id;
