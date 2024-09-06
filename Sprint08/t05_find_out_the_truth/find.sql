-- Find the hero who:
-- 1. Is in two or more teams at the same time
-- 2. Is not human
-- 3. Has a name containing the letter 'a'
-- 4. Has the role of either tankman or healer
-- 5. If more than one hero matches, select the one with the lowest ID

SELECT h.id, h.name, h.class_role, r.name AS race, COUNT(ht.team_id) AS team_count
FROM heroes h
JOIN races r ON h.race_id = r.id
JOIN heroes_teams ht ON h.id = ht.hero_id
WHERE r.name != 'Human'
  AND h.name LIKE '%a%'
  AND h.class_role IN ('tankman', 'healer')
GROUP BY h.id, h.name, h.class_role, r.name
HAVING team_count >= 2
ORDER BY h.id
LIMIT 1;
