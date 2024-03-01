import userModel from "../../models/userModel.js"

const listAll = (req, res) => { 
  res.json({
    success: "OK",
    data: userModel.list()
  })
}

export default listAll