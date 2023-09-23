import { describe, it, expect, beforeEach, afterEach } from "vitest"
import { User } from "../../domain/models/User.js"
import { UserRepositoryMongo } from "./UserRepositoryMongo.js"

describe("UserRepositoryMongo", () => {
  let userRepository

  beforeEach(async () => {
    userRepository = new UserRepositoryMongo()

    await userRepository.connect()
    await userRepository.reset()
  })

  afterEach(async () => {
    await userRepository.disconnect()
  })

  it("saves the user", async () => {
    const id = "f969af7f-bc05-46ed-8a82-62a9f49f4927"
    const name = "John Doe"
    const email = "john@email.com"
    const age = 18
    const password = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
    const user = new User(id, name, email, password, age)

    await userRepository.save(user)

    const foundUser = await userRepository.findById(id)
    expect(foundUser).toEqual(user)
  })

  it("find returns an instance of the user", async () => {
    const id = "f969af7f-bc05-46ed-8a82-62a9f49f4927"
    const name = "John Doe"
    const email = "john@email.com"
    const age = 18
    const password = "password"
    const user = new User(id, name, email, password, age)
    await userRepository.save(user)

    const foundUser = await userRepository.findById(id)

    expect(foundUser).toBeInstanceOf(User)
  })

  it("checks if exists by email", async () => {
    const id = "f969af7f-bc05-46ed-8a82-62a9f49f4927"
    const name = "John Doe"
    const email = "john@email.com"
    const age = 18
    const password = "password"
    const user = new User(id, name, email, password, age)
    await userRepository.save(user)

    const exists = await userRepository.existsByEmail(email)

    expect(exists).toBe(true)
  })

  it("checks if does not exists by email", async () => {
    const nonExisting = "john@email.com"

    const exists = await userRepository.existsByEmail(nonExisting)

    expect(exists).toBe(false)
  })
})
