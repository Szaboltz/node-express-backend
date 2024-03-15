import userModel from "../../models/userModel.js"

const listAll = async (__, res) => { 
  res.json({
    success: "OK",
    data: await userModel.list()
  })
}

export default listAll