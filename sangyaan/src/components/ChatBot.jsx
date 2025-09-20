import { useState } from 'react';

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your Chemistry Assistant. Ask me anything about chemical reactions!", type: 'bot' }
    ]);
    const [input, setInput] = useState('');

    const chemistryKnowledge = {
        'acid base': 'Acid-base reactions involve the transfer of H+ ions. They typically form salt and water.',
        'neutralization': 'Neutralization is a reaction between an acid and a base that forms salt and water.',
        'precipitation': 'Precipitation reactions occur when two solutions react to form an insoluble solid called a precipitate.',
        'oxidation': 'Oxidation is the loss of electrons during a reaction.',
        'reduction': 'Reduction is the gain of electrons during a reaction.',
        'catalyst': 'A catalyst is a substance that increases the rate of a reaction without being consumed.',
        'reaction types': 'Main types include: synthesis, decomposition, single displacement, double displacement, and acid-base reactions.'
    };

    const handleSend = () => {
        if (!input.trim()) return;

        // Add user message
        const newMessages = [...messages, { text: input, type: 'user' }];
        setMessages(newMessages);

        // Generate bot response
        const response = generateResponse(input.toLowerCase());
        setTimeout(() => {
            setMessages([...newMessages, { text: response, type: 'bot' }]);
        }, 500);

        setInput('');
    };

    const generateResponse = (query) => {
        // Check knowledge base for relevant response
        for (const [key, value] of Object.entries(chemistryKnowledge)) {
            if (query.includes(key)) {
                return value;
            }
        }
        return "I'm not sure about that. Try asking about acid-base reactions, precipitation, oxidation, reduction, or catalysts!";
    };

    return (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-xl border border-gray-200">
            {/* Header */}
            <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
                <span className="font-semibold">Chemistry Assistant</span>
                <span className="text-2xl">🧪</span>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-4 ${
                            message.type === 'user' ? 'text-right' : 'text-left'
                        }`}
                    >
                        <div
                            className={`inline-block p-3 rounded-lg ${
                                message.type === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                            {message.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about chemistry..."
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSend}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatBot;