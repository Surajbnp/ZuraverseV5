import connectMongoDB from "../../../libs/mongodb";
import { UserModel } from "../../../models/UserModel";
import { withCors } from "../../../libs/corsmiddilewares";

async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).send({ msg: "Only GET requests are allowed." });
    return;
  }

  await connectMongoDB();
  let { accesskey } = req?.headers;
  let { limit } = req.query; 

  if (
    accesskey ===
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNhZ2FyIiwiaWF0IjoxNTE2MjM5MDIyfQ.wxsqzkXqzM734Hn7VIucUWFXRFs4hM7qaqi1t0qi_nI"
  ) {
    try {
      let Users = await UserModel.find()
        .sort({ karmabalance: -1 })
        .limit(parseInt(limit, 10) || 10); 
      res.status(200).send(Users);
    } catch (error) {
      console.error("Error while fetching", error);
      res.status(400).send({ msg: "Error while fetching" });
    }
  } else {
    res.status(403).send({ msg: "Invalid access key" });
  }
}

export default withCors(handler);
