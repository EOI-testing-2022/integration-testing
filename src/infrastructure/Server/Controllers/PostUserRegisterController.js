import * as z from "zod"

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  age: z.number(),
})

export class PostUserRegisterController {
  constructor(registerUser) {
    this.registerUser = registerUser
  }

  run = async (ctx) => {
    const params = schema.parse(ctx.request.body)

    await this.registerUser.execute(params.name, params.email, params.password, params.age)

    ctx.response.status = 201
    ctx.response.body = { status: "created" }
  }
}
