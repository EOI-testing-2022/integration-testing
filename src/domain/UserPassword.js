import crypto from "node:crypto"

export class UserPassword {
  constructor(password) {
    if (password.length < 6) {
      throw new Error("Password must be 6 characters or longer")
    }

    this.password = crypto.createHash("sha256").update(password).digest().toString("hex")
  }

  compareWith(plainPassword) {
    const hash = crypto.createHash("sha256").update(plainPassword).digest().toString("hex")

    return this.password === hash
  }
}
