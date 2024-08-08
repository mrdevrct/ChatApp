// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../zustand/useConversation";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";

function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { typingStatus } = useSocketContext();

  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header message  */}
          <div className="bg-slate-500 text-white px-4 py-2 mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-lg">To:</span>
              <span className="text-xl font-bold">{selectedConversation.fullname}</span>
            </div>
            {typingStatus && (
              <div className="text-sm text-gray-400 italic flex items-center">
                {typingStatus}
              </div>
            )}
          </div>

          {/* Messages */}
          <Messages />

          {/* Input Message */}
          <MessageInput />
        </>
      )}
    </div>
  );
}

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full ">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-300 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullname}</p>
        <p>Selected a chat start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
