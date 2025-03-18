CREATE TABLE judgement (
    judgement_id TEXT,
    judgement_date DATE,
    PRIMARY KEY (judgement_id)
);

CREATE TABLE prisoner (
    prisoner_id SERIAL,
    prisoner_name TEXT,
    dob DATE,
    pob TEXT,
    PRIMARY KEY (prisoner_id),
    UNIQUE(prisoner_name, dob, pob),
    UNIQUE(prisoner_name, dob)
);


CREATE TABLE legal_case (
    case_id SERIAL,
    judgement_id TEXT NOT NULL,
    prisoner_id INT NOT NULL,
    PRIMARY KEY (case_id),
    FOREIGN KEY (judgement_id) REFERENCES judgement(judgement_id),
    FOREIGN KEY (prisoner_id) REFERENCES prisoner(prisoner_id),
    UNIQUE (judgement_id, prisoner_id)
);

CREATE TABLE penalty_type (
    penalty_type_id SERIAL PRIMARY KEY,
    penalty_name TEXT UNIQUE NOT NULL
);

CREATE TABLE penalty (
    penalty_id SERIAL PRIMARY KEY,
    case_id INT NOT NULL,
    penalty_type_id INT NOT NULL,
    penalty_amount NUMERIC DEFAULT 0,
    FOREIGN KEY (case_id) REFERENCES legal_case(case_id),
    FOREIGN KEY (penalty_type_id) REFERENCES penalty_type(penalty_type_id),
    UNIQUE (case_id, penalty_type_id)  -- Ensures one penalty type per case
    );

CREATE TABLE payment (
    payment_id SERIAL,
    case_id INT NOT NULL,
    penalty_type_id INT NOT NULL,
    payment_amount NUMERIC,
    payment_location TEXT,
    payment_date DATE,
    PRIMARY KEY (payment_id),
    FOREIGN KEY (case_id) REFERENCES legal_case(case_id),
    FOREIGN KEY (penalty_type_id) REFERENCES penalty_type(penalty_type_id)
);


-- Dữ liệu cho bảng judgement
INSERT INTO judgement (judgement_id, judgement_date) VALUES
('J2024001', '2024-01-15'),
('J2024002', '2024-02-10'),
('J2024003', '2024-03-05'),
('J2024004', '2024-04-20'),
('J2024005', '2024-05-10'),
('J2024006', '2024-06-15'),
('J2024007', '2024-07-01'),
('J2024008', '2024-07-20'),
('J2024009', '2024-08-05'),
('J2024010', '2024-08-25');


-- Dữ liệu cho bảng prisoner
INSERT INTO prisoner (prisoner_name, dob, pob) VALUES
('Nguyễn Văn A', '1985-07-12', 'Hà Nội'),
('Trần Thị B', '1990-11-22', 'TP. Hồ Chí Minh'),
('Lê Văn C', '1982-04-05', 'Đà Nẵng'),
('Phạm Văn D', '1995-09-18', 'Hải Phòng'),
('Hoàng Thị E', '1988-06-30', 'Cần Thơ'),
('Vũ Văn F', '1979-12-10', 'Bắc Ninh'),
('Bùi Thị G', '1993-03-25', 'Nghệ An'),
('Đặng Văn H', '1980-02-28', 'Hải Dương'),
('Phan Thị I', '1997-12-12', 'Bình Định'),
('Trịnh Văn J', '1992-08-14', 'Thanh Hóa'),
('Lương Thị K', '1985-05-05', 'Quảng Nam'),
('Đỗ Văn L', '1990-03-10', 'Kiên Giang'),
('Nguyễn Văn An', '1985-07-21', 'Hà Nội'),
('Trần Thị Bích', '1992-11-15', 'TP Hồ Chí Minh'),
('Phạm Quốc Hùng', '1978-04-30', 'Đà Nẵng');



-- Dữ liệu cho bảng legal_case (chứa nhiều tù nhân cho một bản án)
INSERT INTO legal_case (judgement_id, prisoner_id) VALUES
('J2024001', 1),
('J2024001', 2),
('J2024002', 3),
('J2024002', 4),
('J2024002', 5),
('J2024003', 6),
('J2024003', 7),
('J2024004', 1),
('J2024004', 3),
('J2024005', 8),
('J2024005', 9),
('J2024006', 10),
('J2024006', 11),
('J2024006', 12),
('J2024007', 8),
('J2024007', 13),
('J2024008', 9),
('J2024008', 14),
('J2024009', 10),
('J2024009', 15),
('J2024010', 11),
('J2024010', 12),
('J2024010', 13);


-- Dữ liệu cho bảng penalty_type
INSERT INTO penalty_type (penalty_name) VALUES
('Án phí hình sự sơ thẩm (APHSST)'),
('Án phí phúc thẩm (APPT)'),
('Án phí hình sự (APHS)'),
('Án phí dân sự (APDS)'),
('Bồi thường (BT)'),
('Phạt (P)');

-- Dữ liệu cho bảng penalty
INSERT INTO penalty (case_id, penalty_type_id, penalty_amount) VALUES
(1, 1, 500000),
(1, 3, 1500000),
(2, 5, 3000000),
(2, 6, 1000000),
(3, 4, 700000),
(4, 1, 500000),
(5, 2, 900000),
(5, 5, 1200000),
(6, 3, 2000000),
(6, 6, 500000),
(7, 5, 1500000),
(8, 1, 600000),
(9, 2, 800000),
(10, 3, 1800000),
(10, 5, 2500000),
(11, 1, 600000),
(11, 4, 1200000),
(12, 6, 500000),
(13, 2, 900000),
(13, 5, 1600000),
(14, 1, 700000),
(14, 3, 1500000),
(15, 4, 900000),
(16, 6, 550000),
(17, 2, 850000),
(18, 3, 2000000),
(19, 5, 1800000),
(20, 1, 750000);

-- Dữ liệu cho bảng payment
INSERT INTO payment (case_id, penalty_type_id, payment_amount, payment_location, payment_date) VALUES
(1, 1, 500000, 'Trại giam số 1', '2024-02-01'),
(1, 3, 1000000, 'Trại giam số 1', '2024-02-15'),
(2, 5, 2000000, 'Trại giam số 2', '2024-03-10'),
(3, 4, 700000, 'Trại giam số 3', '2024-03-25'),
(4, 1, 500000, 'Trại giam số 4', '2024-04-05'),
(5, 2, 600000, 'Trại giam số 5', '2024-04-15'),
(6, 3, 1500000, 'Trại giam số 1', '2024-05-10'),
(7, 5, 1000000, 'Trại giam số 2', '2024-05-20'),
(8, 1, 500000, 'Trại giam số 3', '2024-06-01'),
(9, 2, 700000, 'Trại giam số 4', '2024-06-15'),
(10, 3, 1200000, 'Trại giam số 6', '2024-05-15'),
(10, 5, 2000000, 'Trại giam số 6', '2024-05-25'),
(11, 1, 600000, 'Trại giam số 7', '2024-06-01'),
(12, 6, 500000, 'Trại giam số 8', '2024-06-10'),
(13, 2, 900000, 'Trại giam số 9', '2024-06-20'),
(14, 1, 700000, 'Trại giam số 10', '2024-07-01'),
(15, 4, 900000, 'Trại giam số 11', '2024-07-15'),
(16, 6, 500000, 'Trại giam số 12', '2024-08-01'),
(17, 2, 800000, 'Trại giam số 13', '2024-08-10'),
(18, 3, 1500000, 'Trại giam số 14', '2024-08-20'),
(19, 5, 1300000, 'Trại giam số 15', '2024-08-30'),
(20, 1, 700000, 'Trại giam số 16', '2024-09-05');


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
