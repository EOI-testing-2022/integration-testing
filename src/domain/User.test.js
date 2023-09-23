import { describe, expect, it } from "vitest"
import { User } from "./User.js"

describe("User", () => {
  const notImportantId = "00000000-0000-0000-0000-000000000000"
  const notImportantName = "John Doe"
  const notImportantEmail = "john@email.com"
  const notImportantAge = 18

  it("has an id", () => {
    const userId = "f969af7f-bc05-46ed-8a82-62a9f49f4927"

    const user = new User(userId, notImportantName, notImportantEmail, notImportantAge)

    expect(user.hasId(userId)).toBe(true)
  })

  it("has another id", () => {
    const userId = "f969af7f-bc05-46ed-8a82-62a9f49f4927"
    const otherId = "54124556-9B55-4924-A9A3-51E8B20769C4"

    const user = new User(userId, notImportantName, notImportantEmail, notImportantAge)

    expect(user.hasId(otherId)).toBe(false)
  })

  it("has a name", () => {
    const userName = "Maria"

    const user = new User(notImportantId, userName, notImportantEmail, notImportantAge)

    expect(user.hasName(userName)).toBe(true)
  })

  it("has another name", () => {
    const userName = "Maria"
    const otherUserName = "Jose"

    const user = new User(notImportantId, userName, notImportantEmail, notImportantAge)

    expect(user.hasName(otherUserName)).toBe(false)
  })

  it("has an email", () => {
    const email = "maria@email.com"

    const user = new User(notImportantId, notImportantName, email, notImportantAge)

    expect(user.hasEmail(email)).toBe(true)
  })

  it("has another email", () => {
    const email = "maria@email.com"
    const otherEmail = "jose@email.com"

    const user = new User(notImportantId, notImportantName, email, notImportantAge)

    expect(user.hasEmail(otherEmail)).toBe(false)
  })

  it("has an age", () => {
    const age = 18

    const user = new User(notImportantId, notImportantName, notImportantEmail, age)

    expect(user.hasAge(age)).toBe(true)
  })

  it("has another age", () => {
    const age = 18
    const otherAge = 20

    const user = new User(notImportantId, notImportantName, notImportantEmail, age)

    expect(user.hasAge(otherAge)).toBe(false)
  })
})
