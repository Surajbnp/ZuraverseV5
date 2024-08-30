import connectMongoDB from "../../libs/mongodb";
import { UserModel } from "../../models/UserModel";
import { withCors } from "../../libs/corsmiddilewares";

async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).send({ msg: "Only get requests are allowed." });
    return;
  }

  await connectMongoDB();
  let { zurawallet } = req?.headers;
  try {
    let profiles = await UserModel.findOne({ zurawallet: zurawallet });
    res.status(200).send(profiles);
  } catch {
    console.log("error while fetching");
    res.status(400).status({ msg: "error while fetching" });
  }
}

export default withCors(handler);
