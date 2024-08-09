// eslint-disable-next-line no-unused-vars
import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
import useDeleteMessage from "../../hooks/useDeleteMessage";

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const { loading, removeMessage } = useDeleteMessage();

  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePicture = fromMe
    ? authUser.profilePictur
    : selectedConversation.profilePictur;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  const handleRemoveMessage = async (messageId) => {
    if (fromMe) {
      await removeMessage(messageId);
    }
  };

  return (
    <div
      className={`chat ${chatClassName} ${
        loading && fromMe ? "opacity-50" : ""
      }`}
      onClick={() => handleRemoveMessage(message._id)}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePicture} alt="user avatar" />
        </div>
      </div>

      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs gap-1 items-center text-gray-300">
        {formattedTime}
      </div>
    </div>
  );
}

export default Message;
