import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/db";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  //find user in our database by email  if user exists, return user or create new user
  const user = await User.findOne({ email: req.body.email });
  console.log("googlesignin", user);
  if (!user) {
    console.log("inside if", user);
    try {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        isAdmin: false,
      });
      const createdUser = await newUser.save();
      console.log("createdUser", createdUser);
      await db.disconnect();
      const token = signToken({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: false,
      });
      res.send({
        token,
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: false,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    await db.disconnect();
    if (user) {
      const token = signToken(user);
      res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: false,
      });
    } else {
      res.status(401).send({ message: "Invalid email or password" });
    }
  }
});

export default handler;
