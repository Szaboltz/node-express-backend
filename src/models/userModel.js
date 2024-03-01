import users from "../db/user.js"

const userModel = {
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