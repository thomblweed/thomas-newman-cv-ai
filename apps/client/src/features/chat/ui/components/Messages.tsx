import { useChatContext } from '../context/useChatContext';

export const Messages = () => {
  const { messages } = useChatContext();

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`mb-4 ${
            message.role === 'assistant' ? 'text-blue-600' : 'text-gray-200'
          }`}
        >
          <div className="font-semibold mb-1">
            {message.role === 'assistant' ? 'Assistant' : 'You'}
          </div>
          <div>
            {message.parts.map((part, idx) => {
              if (part.type === 'thinking') {
                return (
                  <div key={idx} className="text-sm text-gray-500 italic mb-2">
                    💭 Thinking: {part.content}
                  </div>
                );
              }
              if (part.type === 'text') {
                return <div key={idx}>{part.content}</div>;
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
