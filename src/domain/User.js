export class User {
  #id
  #name
  #email
  #age

  constructor(id, name, email, age) {
    this.#id = id
    this.#name = name
    this.#email = email
    this.#age = age
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
}
