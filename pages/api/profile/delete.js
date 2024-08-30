import connectMongoDB from "../../../libs/mongodb";
import { UserModel } from "../../../models/UserModel";
import {withCors} from "../../../libs/corsmiddilewares";

async function handler(req, res) {


  let { zurawallet } = req?.headers;
  await connectMongoDB();

  try {
    let data = await UserModel.findOneAndDelete({ zurawallet: zurawallet });
    res.status(200).send("user deleted");
  } catch (err) {
    res.status(400).send("something went wrong!");
  }
}

export default withCors(handler);

