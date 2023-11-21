const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

const dropTables = async (client) => {
  try {
    await client.sql`DROP TABLE IF EXISTS college_users`;
    await client.sql`DROP TABLE IF EXISTS college_classes`;
    await client.sql`DROP TABLE IF EXISTS college_events_registrations`;
    console.log('Dropped Tables');
  } catch (error) {
    console.log('Error dropping tables', error);
  }
};

const feedClasses = async (client) => {
  try {
    await client.sql`DROP TABLE IF EXISTS college_classes`;
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
        DROP TYPE IF EXISTS college_department;
        CREATE TYPE college_department AS ENUM ('CSE', 'ME', 'ECE');

        DROP TABLE IF EXISTS college_classes;
        CREATE TABLE college_classes (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            department college_department NOT NULL,
            createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `;

    console.log('Classes table created');

    await client.sql`
        INSERT INTO college_classes (id, name, department) VALUES ('9eaffcbf-1e16-4fa8-955a-06b429fa4fa7', 'B.tech', 'CSE');
        INSERT INTO college_classes (id, name, department) VALUES ('9eaffcbf-1e16-4fa8-955a-06b429fa4fa8', 'B.tech', 'ME');
        INSERT INTO college_classes (id, name, department) VALUES ('9eaffcbf-1e16-4fa8-955a-06b429fa4fa9', 'B.tech', 'ECE');
    `;
    console.log('Feeded classes');
  } catch (error) {
    console.error('Error seeding classes:', error);
    throw error;
  }
};

const feedCollegeUsers = async (client) => {
  try {
    await client.sql`DROP TABLE IF EXISTS college_users`;
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    await client.sql`
            DROP TYPE IF EXISTS college_user_role;
            DROP TYPE IF EXISTS college_user_permission;
            DROP TYPE IF EXISTS college_user_approval_status;
            CREATE TYPE college_user_role AS ENUM ('student', 'teacher', 'admin');
            CREATE TYPE college_user_permission AS ENUM ('scan-qr');
            CREATE TYPE college_user_approval_status AS ENUM ('pending', 'approved', 'rejected');
              
              DROP TABLE IF EXISTS college_users;
              CREATE TABLE IF NOT EXISTS college_users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                roll_no INTEGER NOT NULL UNIQUE,
                password TEXT NOT NULL,
                class_id UUID NOT NULL,
                role college_user_role NOT NULL,
                permissions college_user_permission[],
                approval_status college_user_approval_status,
                createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (class_id) REFERENCES college_classes(id) ON DELETE CASCADE
              );
            `;

    console.log(`Created "college_users" table`);

    const hashedPassword = await bcrypt.hash('12345678', 10);

    await client.sql`
                INSERT INTO college_users (name, roll_no, password, class_id, role, approval_status) 
                VALUES ('Veerbal Singh', 21701401, ${hashedPassword}, '9eaffcbf-1e16-4fa8-955a-06b429fa4fa7', 'admin', 'approved');
    `;
    return;
  } catch (error) {
    console.error('Error seeding college_users:', error);
    throw error;
  }
};

const feedEvents = async (client) => {
  try {
    await client.sql`DROP TABLE IF EXISTS college_events`;
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
        DROP TYPE IF EXISTS college_event_status;
        CREATE TYPE college_event_status AS ENUM ('Open', 'Closed');

        DROP TABLE IF EXISTS college_events;
        CREATE TABLE college_events (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,
            description TEXT,
            event_date VARCHAR(255),
            location VARCHAR(255),
            registration_status college_event_status NOT NULL,
            created_by UUID NOT NULL,
            createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `;
    console.log('college_events table created');

    await client.sql`
    INSERT INTO college_events (name, description, event_date, location, registration_status, created_by) 
    VALUES ('Spring Music Festival', 'An annual music festival featuring local bands and artists.', '2023-05-15', 'Central Park', 'Open', '9eaffcbf-1e16-4fa8-955a-06b429fa4fa7');
    
    INSERT INTO college_events (name, description, event_date, location, registration_status, created_by) 
    VALUES ('Tech Talk Series', 'A series of talks on emerging technologies by industry experts.', '2023-06-10', 'Auditorium B', 'Open', '9eaffcbf-1e16-4fa8-955a-06b429fa4fa7');
    
    INSERT INTO college_events (name, description, event_date, location, registration_status, created_by) 
    VALUES ('Career Fair', 'Opportunity for students to meet potential employers and learn about job opportunities.', '2023-09-20', 'Main Hall', 'Open', '9eaffcbf-1e16-4fa8-955a-06b429fa4fa7');
    
    INSERT INTO college_events (name, description, event_date, location, registration_status, created_by) 
    VALUES ('Alumni Meetup', 'Annual gathering for alumni to reconnect and network.', '2023-11-05', 'Conference Room 101', 'Closed', '123e4567-e89b-12d3-a456-426614174003');
    
    INSERT INTO college_events (name, description, event_date, location, registration_status, created_by) 
    VALUES ('Art Exhibition', 'Exhibit showcasing student artwork.', '2023-04-22', 'Art Gallery', 'Closed', '123e4567-e89b-12d3-a456-426614174004');   
    
    INSERT INTO college_events (name, description, event_date, location, registration_status, created_by) 
    VALUES ('A Morning Farewell: Celebrating Our Final Year Journey',
        'Join us for a memorable morning as we bid farewell to our cherished final year moments. This isn''t just a goodbye; it''s a celebration of friendships, memories, and the bright future that awaits each one of us. The morning will be filled with laughter, music, heartwarming speeches, and a reflection on our shared journey. Let''s gather one last time in the place that witnessed our growth and dreams. Dress comfortably and bring your brightest smiles!', 
        '22nd November 2023, in the fresh morning light.', 
        'The serene park beside the girl''s hostel – our favorite spot for timepass.', 
        'Open', 
        'b57e67fa-1f3d-4839-8856-e483f086d8e9');
    `;
    console.log('Feeded college_events');
  } catch (error) {
    console.error('Error seeding college_events:', error);
    throw error;
  }
};

const feedEventRegistrations = async (client) => {
  try {
    await client.sql`DROP TABLE IF EXISTS college_events_registrations`;
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await client.sql`
        DROP TYPE IF EXISTS college_events_registrations_status;
        CREATE TYPE college_events_registrations_status AS ENUM ('pending', 'approved', 'rejected');

        DROP TABLE IF EXISTS college_events_registrations;
        CREATE TABLE college_events_registrations (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            student_id UUID NOT NULL,
            event_id UUID NOT NULL,
            registration_status college_events_registrations_status NOT NULL,
            qr_code TEXT NOT NULL,
            qr_scanned BOOLEAN NOT NULL,
            entry_time TIMESTAMP,
            createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `;
    console.log('college_events_registrations table created');

    await client.sql`
    INSERT INTO college_events_registrations (
      student_id, 
      event_id, 
      registration_status, 
      qr_code, 
      qr_scanned,
      entry_time
  ) VALUES (
      '2b971e75-4ab7-4942-8867-88fa77ce60d4', -- Generates a unique UUID for student_id
      'd13c1074-35d2-480a-8c92-184e1a6ee9c4', -- Generates a unique UUID for event_id
      'pending',       -- Assuming 'registered' is a valid status in your enum
      '',   -- Example QR code text
      false,
      CURRENT_TIMESTAMP
    );
    INSERT INTO college_events_registrations (
      student_id,
      event_id, 
      registration_status, 
      qr_code,
      qr_scanned,
      entry_time
  ) VALUES (
      '37a780b2-9d9e-4b10-86df-d26841f086bf', -- Generates a unique UUID for student_id
      'd13c1074-35d2-480a-8c92-184e1a6ee9c4', -- Generates a unique UUID for event_id
      'approved',       -- Assuming 'registered' is a valid status in your enum
      'event://kdlsdl24223432',   -- Example QR code text
      false,
      CURRENT_TIMESTAMP
    );
    `;
    console.log('Feeded college_events_registrations');
    return;
  } catch (error) {
    console.error('Error seeding college_events:', error);
    throw error;
  }
};

async function main() {
  const client = await db.connect();

  // await dropTables(client);
  // await feedClasses(client);
  // await feedCollegeUsers(client);
  // await feedEvents(client);
  await feedEventRegistrations(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err
  );
});
