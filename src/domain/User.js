import crypto from "node:crypto"

export class User {
  #id
  #name
  #email
  #age
  #password

  constructor(id, name, email, password, age) {
    this.#id = id
    this.#name = name
    this.#email = email
    this.#age = age
    this.#password = crypto.createHash("sha256").update(password).digest().toString("hex")

    if (this.#age < 18) {
      throw new Error("User must be 18 or older")
    }

    if (password.length < 6) {
      throw new Error("Password must be 6 characters or longer")
    }

    if (!email.includes("@")) {
      throw new Error("Invalid email")
    }
  }

  hasId(id) {
    return this.#id === id
  }

  hasName(name) {
    return this.#name === name
  }

  hasEmail(email) {
    return this.#email === email
  }

  hasAge(age) {
    return this.#age === age
  }

  hasPassword(password) {
    const hash = crypto.createHash("sha256").update(password).digest().toString("hex")

    return this.#password === hash
  }

  getPassword() {
    return this.#password
  }
}
