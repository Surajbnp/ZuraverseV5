import connectMongoDB from "../../libs/mongodb";
import { UserModel } from "../../models/UserModel";
import { withCors } from "../../libs/corsmiddilewares";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send({ msg: "Only POST requests are allowed." });
  }

  try {
    await connectMongoDB();

    const { referid, walletcreated } = req.headers;

    // check if wallet is new or existed already
    const existingWallet = await UserModel.findOne({
      zurawallet: walletcreated,
    });

    if (!existingWallet) {
      const newUser = new UserModel({
        zurawallet: walletcreated,
        accCreated: new Date(),
      });
      await newUser.save();

      if (referid) {
        const referredUser = await UserModel.findById(referid)
        if (referredUser) {
          referredUser?.referred?.push({
            wallet: walletcreated,
            gotReward: false,
          });
          await referredUser.save();
          return res.status(200).send({ msg: "Signup success with referral." });
        }
      }

      return res.status(200).send({ msg: "Signup success." });
    } else {
      return res.status(400).send({ msg: "Wallet already exists." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "Something went wrong.", error });
  }
}

export default withCors(handler);
