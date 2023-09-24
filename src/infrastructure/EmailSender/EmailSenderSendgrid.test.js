import { describe, it, expect, beforeEach } from "vitest"
import { EmailSenderSendgrid } from "./EmailSenderSendgrid.js"
import { TestInbox } from "./TestInbox.js"
import { User } from "../../domain/models/User.js"

describe("EmailSenderMailgun", () => {
  const notImportantId = "00000000-0000-0000-0000-000000000000"
  const notImportantAge = 18
  const notImportantPassword = "password"
  let emailSender
  let testInbox

  beforeEach(() => {
    emailSender = new EmailSenderSendgrid()
    testInbox = new TestInbox()
  })

  it("sends an email", async () => {
    const name = "Marta"
    const user = User.create(
      notImportantId,
      name,
      testInbox.getTestEmailAddress(),
      notImportantPassword,
      notImportantAge,
    )

    await emailSender.sendWelcomeEmail(user)

    const email = await testInbox.waitForNextEmail()
    expect(email.subject).toMatch("Welcome To My Project")
    expect(email.html).toMatch("Empiezas en Mi Proyecto")
    expect(email.html).toMatch("¡Bienvenido a Mi proyecto Marta!")
  })

  it("fails if email is malformed", async () => {
    const name = "Marta"
    const malformedEmail = "@"
    const user = User.create(notImportantId, name, malformedEmail, notImportantPassword, notImportantAge)

    const result = emailSender.sendWelcomeEmail(user)

    expect(result).rejects.toThrow("Invalid user destination email")
  })
})
