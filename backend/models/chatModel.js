import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    history: [
      {
        role: { type: String, required: true, enum: ["user", "model"] },
        parts: [{ text: { type: String, required: true } }],
        img: { type: String, required: false },
      },
    ],
  },
  { timestamps: true }
);

const chatModel = mongoose.model("chatCollection", chatSchema);

export default chatModel;
