import React from 'react';
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md';

interface StarRatingProps {
    rating: number;
    onRatingChange?: (rating: number) => void;
    readOnly?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, readOnly = false }) => {
    const handleClick = (index: number) => {
        if (!readOnly && onRatingChange) {
            onRatingChange(index + 1);
        }
    };

    return (
        <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => (
                <span
                    key={index}
                    className={`cursor-pointer ${readOnly ? '' : 'hover:text-yellow-500'}`}
                    onClick={() => handleClick(index)}
                >
                    {index < rating ? (
                        <MdOutlineStar size={20} className="text-yellow-500" />
                    ) : (
                        <MdOutlineStarBorder size={20} className="text-gray-400" />
                    )}
                </span>
            ))}
        </div>
    );
};

