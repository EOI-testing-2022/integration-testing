import { UserRepository } from "../domain/UserRepository.js"

export class UserRepositoryMock extends UserRepository {
  save() {}

  existsByEmail() {}
}
