import userModel from "../../models/userModel.js";

const update = (req, res) => {
  const user = req.body;
  const result = userModel.update(user);

  res.json({
    success: "OK",
    data: result
  })
}

export default update