import { MongoClient, ServerApiVersion } from "mongodb"
import { UserRepository } from "../../domain/repository/UserRepository.js"
import { User } from "../../domain/models/User.js"

export class UserRepositoryMongo extends UserRepository {
  constructor() {
    super()

    const uri = "mongodb://admin:password@localhost:27017"
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    })
    const db = this.client.db("users")
    this.collection = db.collection("users")
  }

  async connect() {
    await this.client.connect()
  }

  async disconnect() {
    await this.client.close()
  }

  async reset() {
    await this.collection.deleteMany({})
  }

  async save(user) {
    await this.collection.insertOne({ ...user })
  }

  async findById(id) {
    const document = await this.collection.findOne({ id })

    if (!document) {
      return null
    }

    return new User(document.id, document.name, document.email.email, document.password, document.age.age)
  }

  async existsByEmail(email) {
    const document = await this.collection.findOne({ "email.email": email }, { projection: { _id: 1 } })

    return Boolean(document)
  }
}
