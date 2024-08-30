import connectMongoDB from "../../../libs/mongodb";
import { UserModel } from "../../../models/UserModel";
import { withCors } from "../../../libs/corsmiddilewares";

async function handler(req, res) {
  let { zurawallet } = req?.headers;
  let { karmabalance } = req?.body;

  try {
    await connectMongoDB;
    let data = await UserModel.findOneAndUpdate(
      { zurawallet },
      { karmabalance: karmabalance }
    );
    console.log(data);
    res.status(200).send("points updated!");
  } catch (err) {
    console.log(err);
    res.status(400).send("something went wrong!");
  }
}

export default withCors(handler);
