CREATE TABLE IF NOT EXISTS organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

INSERT INTO organization (name, description) VALUES
    ('Community Outreach', 'Helping local communities through various service projects.'),
    ('Volunteer Network', 'Connecting volunteers with meaningful opportunities.'),
    ('Service Alliance', 'Building partnerships for community development.');

CREATE TABLE IF NOT EXISTS service_projects (
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