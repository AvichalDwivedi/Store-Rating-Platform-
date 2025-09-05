import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const RatingForm = ({ storeId, userRating }) => {
  const { submitRating } = useAuth();
  const [rating, setRating] = useState(userRating || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) return;
    
    setIsSubmitting(true);
    
    const result = submitRating(storeId, rating);
    
    if (result.success) {
      setSuccessMessage(`Rating ${userRating ? 'updated' : 'submitted'} successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
    
    setIsSubmitting(false);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'filled' : ''}`}
          onClick={() => setRating(i)}
          style={{ cursor: 'pointer' }}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="rating-form">
      <form onSubmit={handleSubmit}>
        <div className="star-rating">
          {renderStars()}
        </div>
        
        {successMessage && <div style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</div>}
        
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={isSubmitting || rating === 0}
        >
          {isSubmitting ? 'Submitting...' : userRating ? 'Update Rating' : 'Submit Rating'}
        </button>
      </form>
    </div>
  );
};

export default RatingForm;