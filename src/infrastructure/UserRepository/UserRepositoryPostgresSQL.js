import { Client } from "pg"
import { UserRepository } from "../../domain/repository/UserRepository.js"
import { User } from "../../domain/models/User.js"

export class UserRepositoryPostgresSQL extends UserRepository {
  constructor() {
    super()

    this.client = new Client({
      host: "localhost",
      port: 5432,
      database: "my-project",
      user: "admin",
      password: "password",
    })
  }

  async connect() {
    await this.client.connect()
  }

  async disconnect() {
    await this.client.end()
  }

  async reset() {
    await this.client.query("DELETE FROM users")
  }

  async save(user) {
    await this.client.query("INSERT INTO users (id, name, email, password, age) VALUES ($1, $2, $3, $4, $5)", [
      user.id,
      user.name,
      user.email.email,
      user.password,
      user.age.age,
    ])
  }

  async findById(id) {
    const res = await this.client.query("SELECT * FROM users WHERE id = $1", [id])
    const document = res.rows[0]

    if (!document) {
      return null
    }

    return new User(document.id, document.name, document.email, document.password, document.age)
  }

  async existsByEmail(email) {
    const res = await this.client.query("SELECT id FROM users WHERE email = $1", [email])
    const document = res.rows[0]

    return Boolean(document)
  }
}
