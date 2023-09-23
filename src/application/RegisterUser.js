import { User } from "../domain/User.js"

export class RegisterUser {
  constructor(userRepository, idGenerator, emailSender) {
    this.userRepository = userRepository
    this.idGenerator = idGenerator
    this.emailSender = emailSender
  }

  async execute(name, email, password, age) {
    const alreadyExists = await this.userRepository.existsByEmail(email)

    if (alreadyExists) {
      throw new Error("User already exists")
    }

    const user = new User(this.idGenerator.generate(), name, email, password, age)

    await this.emailSender.send(email, "Welcome to our platform!")

    await this.userRepository.save(user)
  }
}
