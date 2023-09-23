export class UserRepository {
  save(user) {
    throw new Error("This is an abstract class. You should implement the save method")
  }

  existsByEmail(email) {
    throw new Error("This is an abstract class. You should implement the existsByEmail method")
  }
}
