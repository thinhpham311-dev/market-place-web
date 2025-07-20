interface ErrorMessagesProps {
    messages: string[];
    className?: string;
}

const ErrorMessages = ({ messages, className }: ErrorMessagesProps) => {
    if (!messages || messages.length === 0) return null;

    return (
        <p className={`text-red-500 text-xs basis-full ${className || ""}`}>
            {messages.map((error, index) => (
                <span key={index} className="block">
                    {error}
                </span>
            ))}
        </p>
    );
};

export default ErrorMessages;
