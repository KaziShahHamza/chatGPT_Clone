import express from "express";
import cors from "cors";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import newModel from "./models/newModel.js";
import chatModel from "./models/chatModel.js";
import userChatModel from "./models/userChatModel.js";

const app = express();
const port = process.env.PORT || 3002;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use(express.json());

const connect = async () => {
  // console.log(process.env.MONGOURI);
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log("Database connected");
  } catch (error) {
    console.log("Database not connected");
    console.log(error);
  }
};

connect();

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// app.get("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const records = await newModel.find({ userId: id });

//     if (records.length === 0) {
//       return res.status(404).send("No records found");
//     }
//     res.status(200).send(records);
//     console.log("Records received");
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.post("/", async (req, res) => {
//   try {
//     const newRecordBody = req.body;
//     const newRecord = new newModel(newRecordBody);
//     const savedRecord = await newRecord.save();

//     res.status(200).send(savedRecord);
//     console.log("Records Saved");
//   } catch (err) {
//     res.status(500).send(err);
//     console.log("post problem from server");
//   }
// });

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.post("/api/chats", async (req, res) => {
  const { userId, text } = req.body;

  console.log("userId: ", userId, "text: ", text);
  try {
    const newChat = new chatModel({
      userId: userId,
      history: [
        {
          role: "user",
          parts: [{ text: text }],
        },
      ],
    });
    console.log("newChat: ", newChat);

    const savedChat = await newChat.save();
    // console.log("savedChat Id: ", savedChat._id);
    console.log("savedChat: ", savedChat);

    const userChat = await userChatModel.find({ userId: userId });
    console.log("userChat: ", userChat);

    if (!userChat.length) {
      const newUserChat = new userChatModel({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });

      console.log("newUserChat: ", newUserChat);

      await newUserChat.save();
    } else {
      await userChatModel.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );  
      res.status(201).send(newChat._id);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating chat.");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
