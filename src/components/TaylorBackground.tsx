import React, { useEffect, useMemo } from 'react';

const TaylorBackground: React.FC = () => {
  const taylorImages = useMemo(() => [
    '/images/taylor/fearless.jpg',  // Fearless era image
    '/images/taylor/red.jpg',       // Red era image
    '/images/taylor/1989.jpg',      // 1989 era image
    '/images/taylor/midnights.jpg'  // Midnights era image
  ], []);

  useEffect(() => {
    // Intentionally left empty after debugging, but keeping the hook 
    // in case we need to add effects related to taylorImages later.
  }, [taylorImages]);

  return (
    <div className="taylor-background">
      {taylorImages.map((image, index) => {
        const fullPath = image;
        return (
          <img
            key={index}
            src={fullPath}
            alt={`Taylor Swift Era ${index + 1}`}
            className="taylor-image"
          />
        );
      })}
    </div>
  );
};

export default TaylorBackground; 