import React from 'react';
import { FiStar } from 'react-icons/fi';

const StarRating = ({ rating, setRating, readonly = false }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => !readonly && setRating && setRating(star)}
          disabled={readonly}
          className={`
            ${readonly ? 'cursor-default' : 'cursor-pointer'}
            ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}
            transition-colors
          `}
        >
          <FiStar
            className={`w-4 h-4 ${star <= rating ? 'fill-yellow-400' : ''}`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;