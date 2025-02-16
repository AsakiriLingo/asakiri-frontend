import { Star } from 'lucide-react';
import React, { useState } from 'react';

import './star-rating.scss';

interface StarRatingProps {
  initialValue?: number;
  averageRating?: number;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  showAverage?: boolean;
  onChange?: (rating: number) => void;
}

const getStarSize = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return 16;
    case 'large':
      return 32;
    default:
      return 24;
  }
};

export const StarRating: React.FC<StarRatingProps> = ({
  initialValue = 0,
  averageRating,
  disabled = false,
  size = 'medium',
  showAverage = true,
  onChange,
}) => {
  const [rating, setRating] = useState(initialValue);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value: number) => {
    if (disabled) return;
    setRating(value);
    onChange?.(value);
  };

  const starSize = getStarSize(size);

  return (
    <div className="star-rating">
      <div className="star-rating__container">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleClick(value)}
            onMouseEnter={() => !disabled && setHoverRating(value)}
            onMouseLeave={() => !disabled && setHoverRating(0)}
            className="star-rating__button"
            disabled={disabled}
          >
            <Star
              size={starSize}
              className={`star-rating__star ${
                (hoverRating ? hoverRating >= value : rating >= value)
                  ? 'star-rating__star--filled'
                  : 'star-rating__star--empty'
              }`}
            />
          </button>
        ))}
      </div>
      {showAverage && averageRating !== undefined && (
        <span className="star-rating__average">{averageRating.toFixed(1)}</span>
      )}
    </div>
  );
};
