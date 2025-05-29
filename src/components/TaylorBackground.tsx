import React, { useEffect, useMemo } from 'react';

const TaylorBackground: React.FC = () => {
  const taylorImages = useMemo(() => [
    `${process.env.PUBLIC_URL}/images/taylor/fearless.jpg`,
    `${process.env.PUBLIC_URL}/images/taylor/red.jpg`,
    `${process.env.PUBLIC_URL}/images/taylor/1989.jpg`,
    `${process.env.PUBLIC_URL}/images/taylor/midnights.jpg`
  ], []);

  useEffect(() => {
    // Intentionally left empty after debugging, but keeping the hook 
    // in case we need to add effects related to taylorImages later.
  }, [taylorImages]);

  return (
    <div className="taylor-background">
      {taylorImages.map((image, index) => {
        return (
          <img
            key={index}
            src={image}
            alt={`Taylor Swift Era ${index + 1}`}
            className="taylor-image"
          />
        );
      })}
    </div>
  );
};

export default TaylorBackground; 