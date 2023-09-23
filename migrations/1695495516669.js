export async function up(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      password VARCHAR(255),
      age INT
    );
  `)
  console.log("1695495516669 Up")
}

export async function down(client) {
  await client.query(`
    DROP TABLE IF EXISTS users;
  `)
  console.log("1695495516669 Down")
}
