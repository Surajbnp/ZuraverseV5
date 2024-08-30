import connectMongoDB from "../../../libs/mongodb";
import { UserModel } from "../../../models/UserModel";
import { withCors } from "../../../libs/corsmiddilewares";

async function handler(req, res) {
  let { zurawallet } = req?.headers;
  const { userName } = req.body;

  if (req.method !== "PUT") {
    res.status(405).send({ msg: "Only put requests are allowed." });
    return;
  }

  await connectMongoDB;
  const userProfile = await UserModel.findOne({ zurawallet });

  try {
    if (userName) {
      const existingUser = await UserModel.find({
        userName: userName.trim().toLowerCase(),
      });
      if (existingUser.length) {
        return res.status(400).send({ msg: "Username is already taken." });
      }
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).send({ msg: "Body data is empty" });
    }
    if (userProfile && userProfile.hasHouseId !== null) {
      req.body.hasHouseId = userProfile.hasHouseId;
    }

    await UserModel.findOneAndUpdate(
      { zurawallet: zurawallet },
      { ...req.body }
    );

    res.status(200).send({ msg: "User updated successfully!" });
  } catch (err) {
    res.status(500).send("Something went wrong!");
    console.log(err);
  }
}

export default withCors(handler);
