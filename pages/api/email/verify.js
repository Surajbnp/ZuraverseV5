import { UserModel } from "../../../models/UserModel";
import { withCors } from "../../../libs/corsmiddilewares";

async function handler(req, res) {
  let { zurawallet } = req?.headers;
  let { otp, email } = req?.body;

  if (req.method !== "POST") {
    res.status(405).send({ msg: "Only post requests are allowed." });
    return;
  }

  console.log(otp);

  try {
    let currentUser = await UserModel.findOne({ zurawallet });
    if (Number(currentUser?.otp) === Number(otp)) {
      await UserModel.findOneAndUpdate(
        { zurawallet },
        { isEmailVerified: true, email : email }
      );
      res.status(200).send({ msg: "user verified!" });
    } else {
      res.status(401).send({ msg: "invalid Otp" });
    }
  } catch (err) {
    res.status(400).send({ msg: "something went wrong" });
    console.log(err);
  }
}

export default withCors(handler);
