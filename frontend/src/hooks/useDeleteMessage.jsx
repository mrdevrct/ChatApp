import toast from "react-hot-toast";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import { useState } from "react";

function useDeleteMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useConversation();
  const { socket } = useSocketContext();

  const removeMessage = async (messageId) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to delete the message");
      }

      // Remove the deleted message from the messages array
      setMessages(messages.filter((msg) => msg._id !== messageId));

      // Emit the delete event to the socket server
      socket.emit("messageDeleted", messageId);

      toast.success("Message deleted successfully");
    } catch (e) {
      toast.error(e.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { loading, removeMessage };
}

export default useDeleteMessage;
