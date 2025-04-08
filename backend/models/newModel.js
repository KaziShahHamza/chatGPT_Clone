import mongoose from "mongoose";

const newSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const newModel = mongoose.model("newCollection", newSchema);

export default newModel;
