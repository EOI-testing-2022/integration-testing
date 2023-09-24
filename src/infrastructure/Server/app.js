import Koa from "koa"
import Router from "@koa/router"
import { koaBody } from "koa-body"
import { PostUserRegisterController } from "./Controllers/PostUserRegisterController.js"
import { RegisterUser } from "../../application/RegisterUser.js"
import { UserRepositoryMongo } from "../UserRepository/UserRepositoryMongo.js"
import { IdGeneratorRandom } from "../IdGenerator/IdGeneratorRandom.js"
import { EmailSenderMailgun } from "../EmailSender/EmailSenderMailgun.js"

const app = new Koa()

const router = new Router()

const userRepository = new UserRepositoryMongo()

await userRepository.connect()

const idGenerator = new IdGeneratorRandom()
const emailSender = new EmailSenderMailgun()
const registerUser = new RegisterUser(userRepository, idGenerator, emailSender)
const postUserRegisterController = new PostUserRegisterController(registerUser)

router.post("/users/register", postUserRegisterController.run)

app
  .use(
    koaBody({
      jsonLimit: "1kb",
    }),
  )
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)
