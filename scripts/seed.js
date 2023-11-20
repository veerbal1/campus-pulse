const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

const dropTables = async (client) => {
  try {
    await client.sql`DROP TABLE IF EXISTS college_users`;
    await client.sql`DROP TABLE IF EXISTS college_classes`;
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
            department college_department NOT NULL
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

async function main() {
  const client = await db.connect();

  await dropTables(client);
  await feedClasses(client);
  await feedCollegeUsers(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err
  );
});
