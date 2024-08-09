import ConversationModel from "../models/conversation.model.js";
import MessageModel from "../models/message.model.js";
import { getReciverSocketId , io} from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new MessageModel({ senderId, receiverId, message });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    const reciverSocketId = getReciverSocketId(receiverId)
    if (reciverSocketId) {
      io.to(reciverSocketId).emit("newMessage" , newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const userId = req.user._id;

    const message = await MessageModel.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // بررسی اینکه کاربر مالک پیام است یا گیرنده پیام
    if (
      message.senderId.toString() !== userId.toString() &&
      message.receiverId.toString() !== userId.toString()
    ) {
      return res.status(403).json({
        message: "You can only delete your own messages",
      });
    }

    // حذف پیام از دیتابیس
    const deletedMessage = await MessageModel.findByIdAndDelete(messageId);
    if (!deletedMessage) {
      return res.status(500).json({ message: "Failed to delete the message" });
    }

    // حذف پیام از مکالمه مرتبط
    await ConversationModel.findOneAndUpdate(
      { participants: { $all: [message.senderId, message.receiverId] } },
      { $pull: { messages: messageId } }
    );

    // ارسال اطلاع‌رسانی به گیرنده پیام
    const receiverSocketId = getReciverSocketId(message.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("messageDeleted", messageId);
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "An error occurred while deleting the message" });
  }
};
