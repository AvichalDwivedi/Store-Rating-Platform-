const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeClass = {
    small: '16px',
    medium: '24px',
    large: '32px'
  }[size];

  return (
    <div 
      className="loading-spinner" 
      style={{ 
        width: sizeClass, 
        height: sizeClass,
        border: `3px solid rgba(74, 108, 247, 0.3)`,
        borderTopColor: '#4a6cf7'
      }}
    ></div>
  );
};

export default LoadingSpinner;