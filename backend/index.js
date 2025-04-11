import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import ImageKit from "imagekit";
import chatModel from "./models/chatModel.js";
import userChatModel from "./models/userChatModel.js";
import { clerkMiddleware } from "@clerk/express";
import { clerkClient, requireAuth, getAuth } from "@clerk/express";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(clerkMiddleware());

const connect = async () => {
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

app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});

app.get("/api/userchats", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);

  try {
    const userChat = await userChatModel.find({ userId: userId });

    res.status(200).send(userChat[0].chats);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching userChatModel.");
  }
});

app.post("/api/chats", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  const { text } = req.body;

  // console.log("userId: ", userId, "text: ", text);
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
    // console.log("newChat: ", newChat);

    const savedChat = await newChat.save();
    // console.log("savedChat Id: ", savedChat._id);
    // console.log("savedChat: ", savedChat);

    const userChat = await userChatModel.find({ userId: userId });
    // console.log("userChat: ", userChat);

    if (!userChat.length) {
      const newUserChat = new userChatModel({
        userId: userId,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 20),
          },
        ],
      });

      // console.log("newUserChat: ", newUserChat);

      await newUserChat.save();
    } else {
      await userChatModel.updateOne(
        { userId: userId },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 20),
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

app.get("/protected", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);

  const user = await clerkClient.users.getUser(userId);

  console.log("userId: ", userId);
  // console.log("Clerk User: ", user);
  return res.json({ user });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
