import users from "../db/user.js"
import { z } from "zod"

const USER_SCHEMA = z.object({
  id: z.number().int(),
  name: z.string().min(3).max(200),
  email: z.string().email()
})

const userModel = {
  validateCreate: (data) => {
    const partialSchema = USER_SCHEMA.partial({id: true})
    return partialSchema.safeParse(data)
  },
  list: () => {
    return users
  },
  create: (data) => {
    data.id = users[users.length - 1].id + 1
    users.push(data)
    return users
  },
  update: (data) => {
      return users.map((user) => {
        if (user.id == data.id) {
          user.name = data.name || user.name;
          user.email = data.email || user.email
        }
        return user
    })
  },
  remove: (id) => {
    return users.filter((data) => data.id != id)
  }
}

export default userModel