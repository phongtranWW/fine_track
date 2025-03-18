CREATE MATERIALIZED VIEW mv_remaining_fine AS
SELECT
    lc.judgement_id,
    pr.prisoner_id,
    pr.prisoner_name,
    pr.dob,
    pr.pob,
    pt.penalty_name,
    p.penalty_amount AS total_fine,
    COALESCE(SUM(pm.payment_amount), 0) AS paid_amount,
    (p.penalty_amount - COALESCE(SUM(pm.payment_amount), 0)) AS remaining_amount,
    CASE
        WHEN (p.penalty_amount - COALESCE(SUM(pm.payment_amount), 0)) > 0 THEN 'Nợ'
        ELSE 'Đã đóng đủ'
        END AS status
FROM legal_case lc
         JOIN prisoner pr ON lc.prisoner_id = pr.prisoner_id  -- Thêm kết nối với bảng prisoner
         JOIN penalty p ON lc.case_id = p.case_id
         JOIN penalty_type pt ON p.penalty_type_id = pt.penalty_type_id
         LEFT JOIN payment pm ON p.case_id = pm.case_id AND p.penalty_type_id = pm.penalty_type_id
GROUP BY lc.judgement_id, pr.prisoner_id, pr.prisoner_name, pr.dob, pr.pob, pt.penalty_name, p.penalty_amount;

-- Cập nhật lại Materialized View khi cần
REFRESH MATERIALIZED VIEW mv_remaining_fine;
SELECT * FROM mv_remaining_fine;


CREATE VIEW v_prisoner_with_judgements AS
SELECT
    p.prisoner_id,
    p.prisoner_name,
    p.dob,
    p.pob,
    lc.judgement_id,
    j.judgement_date
FROM prisoner p
         JOIN legal_case lc ON p.prisoner_id = lc.prisoner_id
         JOIN judgement j ON lc.judgement_id = j.judgement_id
ORDER BY p.prisoner_id, j.judgement_date DESC;


CREATE VIEW v_judgement_with_prisoners AS
SELECT
    j.judgement_id,
    j.judgement_date,
    p.prisoner_id,
    p.prisoner_name,
    p.dob,
    p.pob
FROM judgement j
         JOIN legal_case lc ON j.judgement_id = lc.judgement_id
         JOIN prisoner p ON lc.prisoner_id = p.prisoner_id
ORDER BY j.judgement_date DESC, j.judgement_id;



CREATE VIEW v_prisoner_total_cases AS
SELECT
    p.prisoner_id,
    p.prisoner_name,
    p.dob,
    p.pob,
    COUNT(lc.case_id) AS total_cases
FROM prisoner p
         JOIN legal_case lc ON p.prisoner_id = lc.prisoner_id
GROUP BY p.prisoner_id, p.prisoner_name, p.dob, p.pob
ORDER BY total_cases DESC;