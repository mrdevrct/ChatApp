import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],

    messages: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Message",
        default: []
      },
    ],

  },
  {
    timestamps: true,
  }
);

const ConversationModel =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", conversationSchema);

export default ConversationModel;
