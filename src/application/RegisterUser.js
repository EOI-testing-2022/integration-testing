import { User } from "../domain/User.js"

export class RegisterUser {
  constructor(userRepository, idGenerator) {
    this.userRepository = userRepository
    this.idGenerator = idGenerator
  }

  async execute(name, email, password, age) {
    const alreadyExists = await this.userRepository.existsByEmail(email)

    if (alreadyExists) {
      throw new Error("User already exists")
    }

    const user = new User(this.idGenerator.generate(), name, email, password, age)

    await this.userRepository.save(user)
  }
}
