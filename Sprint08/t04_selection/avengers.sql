-- 1. Select the most powerful hero based on total power (attack + defense)
SELECT h.name, SUM(hp.power_points) AS total_power
FROM heroes h
JOIN heroes_powers hp ON h.id = hp.hero_id
GROUP BY h.id
ORDER BY total_power DESC, h.id ASC
LIMIT 1;

-- 2. Select the weakest hero based on the smallest defense points
SELECT h.name, SUM(hp.power_points) AS total_defense
FROM heroes h
JOIN heroes_powers hp ON h.id = hp.hero_id
JOIN powers p ON p.id = hp.power_id
WHERE p.type = 'defense'
GROUP BY h.id
ORDER BY total_defense ASC
LIMIT 1;

-- 3. Select all Avengers (excluding double-agent) sorted by total power in descending order
SELECT h.name, SUM(hp.power_points) AS total_power
FROM heroes h
JOIN heroes_teams ht ON h.id = ht.hero_id
JOIN teams t ON ht.team_id = t.id
JOIN heroes_powers hp ON h.id = hp.hero_id
WHERE t.name = 'Avengers'
AND h.name != 'Double-Agent' -- Заменить на реальное имя двойного агента
GROUP BY h.id
ORDER BY total_power DESC;

-- 4. Get total power of both Avengers and Hydra teams
SELECT t.name, SUM(hp.power_points) AS total_power
FROM heroes h
JOIN heroes_teams ht ON h.id = ht.hero_id
JOIN teams t ON ht.team_id = t.id
JOIN heroes_powers hp ON h.id = hp.hero_id
GROUP BY t.name
HAVING t.name IN ('Avengers', 'Hydra')
ORDER BY total_power ASC;
