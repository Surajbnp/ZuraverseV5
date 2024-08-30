import connectMongoDB from "../../../libs/mongodb";
import { UserModel } from "../../../models/UserModel";
import {withCors} from "../../../libs/corsmiddilewares";

// routes for post user profile
async function handler(req, res) {
  let { zurawallet } = req.body;
  var currentDate = new Date();

  if (req.method !== "POST") {
    res.status(405).send({ msg: "Only post requests are allowed." });
    return;
  }

  await connectMongoDB();

  const isUserAlready = await UserModel.find({
    zurawallet: zurawallet,
  });
  
  if (isUserAlready.length > 0) {
    return res.status(400).send({ msg: "user already exist!" });
  }

  try {
    let data = await UserModel({ ...req.body, accCreated: currentDate });
    await data.save();

    res.status(200).send({ msg: "user created successfully!" });
  } catch {
    res.status(500).status("error");
  }
}

export default withCors(handler);
