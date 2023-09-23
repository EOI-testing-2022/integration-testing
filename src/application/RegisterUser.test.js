import { describe, it, expect, vi } from "vitest"
import { UserRepositoryMock } from "../infrastructure/UserRepositoryMock.js"
import { RegisterUser } from "./RegisterUser.js"
import { User } from "../domain/User.js"
import { IdGeneratorMock } from "../infrastructure/IdGeneratorMock.js"

describe("RegisterUser", () => {
  it("must save the user in the repository", async () => {
    const userRepository = new UserRepositoryMock()
    vi.spyOn(userRepository, "save")
    const idGenerator = new IdGeneratorMock()
    const registerUser = new RegisterUser(userRepository, idGenerator)
    const notImportantName = "John Doe"
    const notImportantEmail = "john@email.com"
    const notImportantAge = 18
    const notImportantPassword = "password"

    await registerUser.execute(notImportantName, notImportantEmail, notImportantPassword, notImportantAge)

    expect(userRepository.save).toHaveBeenCalled()
  })

  it("must save the user with the correct data", async () => {
    const userRepository = new UserRepositoryMock()
    vi.spyOn(userRepository, "save")
    const idGenerator = new IdGeneratorMock()
    const registerUser = new RegisterUser(userRepository, idGenerator)
    const name = "John Doe"
    const email = "john@email.com"
    const age = 18
    const password = "password"

    await registerUser.execute(name, email, password, age)

    const user = new User(IdGeneratorMock.MOCK_ID, name, email, password, age)
    expect(userRepository.save).toHaveBeenCalledWith(user)
  })

  it("must throw an error if the user already exists", async () => {
    const userRepository = new UserRepositoryMock()
    vi.spyOn(userRepository, "existsByEmail").mockReturnValue(true)
    const idGenerator = new IdGeneratorMock()
    const registerUser = new RegisterUser(userRepository, idGenerator)
    const notImportantName = "John Doe"
    const notImportantEmail = "john@email.com"
    const notImportantAge = 18
    const notImportantPassword = "password"

    const result = registerUser.execute(notImportantName, notImportantEmail, notImportantPassword, notImportantAge)

    expect(result).rejects.toThrow("User already exists")
  })
})
