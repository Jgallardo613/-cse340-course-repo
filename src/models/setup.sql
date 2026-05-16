DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS service_projects;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS organization;

CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename) VALUES
    ('Community Outreach', 'Helping local communities through various service projects.', 'info@communityoutreach.org', 'organizations1.jpg'),
    ('Volunteer Network', 'Connecting volunteers with meaningful opportunities.', 'info@volunteernetwork.org', 'organizations3.jpg'),
    ('Service Alliance', 'Building partnerships for community development.', 'info@servicealliance.org', 'organizations2.jpg');

CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organization(organization_id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    project_date DATE NOT NULL
);

INSERT INTO service_projects (organization_id, title, description, location, project_date) VALUES
    (1, 'Food Drive', 'Collecting food for local families', 'Rexburg, ID', '2026-06-01'),
    (1, 'Park Cleanup', 'Cleaning up local parks', 'Rexburg, ID', '2026-06-08'),
    (1, 'Clothing Donation', 'Gathering clothes for those in need', 'Idaho Falls, ID', '2026-06-15'),
    (1, 'Senior Visit', 'Visiting elderly residents', 'Rexburg, ID', '2026-06-22'),
    (1, 'School Supply Drive', 'Collecting supplies for students', 'Rexburg, ID', '2026-06-29'),
    (2, 'Habitat Build', 'Building homes for families', 'Idaho Falls, ID', '2026-07-01'),
    (2, 'Mentorship Day', 'Pairing volunteers with youth', 'Rexburg, ID', '2026-07-08'),
    (2, 'Garden Project', 'Community garden maintenance', 'Rexburg, ID', '2026-07-15'),
    (2, 'Blood Drive', 'Organizing a community blood drive', 'Idaho Falls, ID', '2026-07-22'),
    (2, 'Tech Workshop', 'Teaching tech skills to seniors', 'Rexburg, ID', '2026-07-29'),
    (3, 'River Cleanup', 'Cleaning the Snake River banks', 'Idaho Falls, ID', '2026-08-01'),
    (3, 'Literacy Program', 'Reading assistance for children', 'Rexburg, ID', '2026-08-08'),
    (3, 'Job Fair', 'Connecting community with employers', 'Rexburg, ID', '2026-08-15'),
    (3, 'Health Screening', 'Free health checkups for residents', 'Idaho Falls, ID', '2026-08-22'),
    (3, 'Youth Sports Day', 'Free sports activities for kids', 'Rexburg, ID', '2026-08-29');

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE project_categories (
    project_id INTEGER NOT NULL REFERENCES service_projects(project_id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO categories (name) VALUES 
    ('Education'),
    ('Environment'),
    ('Community Help');

INSERT INTO project_categories (project_id, category_id) VALUES
    (5, 1), (7, 1), (10, 1), (12, 1),
    (2, 2), (8, 2), (11, 2),
    (1, 3), (3, 3), (4, 3), (6, 3), (9, 3), (13, 3), (14, 3), (15, 3);