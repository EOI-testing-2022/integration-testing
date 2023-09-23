import pkg from "pg"
const { Client } = pkg
import { up as up1 } from "./1695495516669.js"

const client = new Client({
  host: "localhost",
  port: 5432,
  database: "my-project",
  user: "admin",
  password: "password",
})

Promise.resolve()
  .then(() => client.connect())
  .then(() => up1(client))
  .then(() => {
    console.log("Done")
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => client.end())
