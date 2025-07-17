interface QuantityInfoProps {
    quantity: number;
    errorMessages: string[];
}

const QuantityInfo = ({ quantity, errorMessages }: QuantityInfoProps) => {
    return (
        <>
            <p>{quantity} pieces available</p>
            {errorMessages.length > 0 && (
                <p className="text-red-500 text-xs basis-full">
                    {errorMessages.map((error, index) => (
                        <span key={index}>{error}</span>
                    ))}
                </p>
            )}
        </>
    );
};

export default QuantityInfo