import { describe, it, expect, beforeEach, vi } from "vitest"
import { PostUserRegisterController } from "./PostUserRegisterController.js"

describe("PostUserRegisterController", () => {
  let postUserRegisterController
  let registerUser
  const name = "María"
  const email = "maria@gmail.com"
  const password = "password"
  const age = 23

  beforeEach(() => {
    registerUser = { execute: vi.fn() }
    postUserRegisterController = new PostUserRegisterController(registerUser)
  })

  it("calls the use case", async () => {
    const mockCtx = {
      request: {
        body: {
          name,
          email,
          password,
          age,
        },
      },
      response: {},
    }

    await postUserRegisterController.run(mockCtx)

    expect(registerUser.execute).toHaveBeenCalledWith(name, email, password, age)
  })

  it("responds with http 201", async () => {
    const mockCtx = {
      request: {
        body: {
          name,
          email,
          password,
          age,
        },
      },
      response: {},
    }

    await postUserRegisterController.run(mockCtx)

    expect(mockCtx.response.status).toBe(201)
    expect(mockCtx.response.body).toEqual({ status: "created" })
  })

  describe("type validations", () => {
    it("fails if name is no type string", async () => {
      const mockCtx = {
        request: {
          body: {
            name: 1,
            email,
            password,
            age,
          },
        },
        response: {},
      }

      const result = postUserRegisterController.run(mockCtx)

      await expect(result).rejects.toThrow()
    })

    it("fails if email is no type string", async () => {
      const mockCtx = {
        request: {
          body: {
            name,
            email: 1,
            password,
            age,
          },
        },
        response: {},
      }

      const result = postUserRegisterController.run(mockCtx)

      await expect(result).rejects.toThrow()
    })

    it("fails if password is no type string", async () => {
      const mockCtx = {
        request: {
          body: {
            name,
            password: 1,
            email,
            age,
          },
        },
        response: {},
      }

      const result = postUserRegisterController.run(mockCtx)

      await expect(result).rejects.toThrow()
    })

    it("fails if age is not a number", async () => {
      const mockCtx = {
        request: {
          body: {
            name,
            email,
            password,
            age: "23",
          },
        },
        response: {},
      }

      const result = postUserRegisterController.run(mockCtx)

      await expect(result).rejects.toThrow()
    })
  })
})
