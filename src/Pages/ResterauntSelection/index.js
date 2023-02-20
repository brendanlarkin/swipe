import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TinderCard from 'react-tinder-card';

function RestaurantSelectionPage() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: 'Restaurant Al',
      description: 'This is a restaurant description.',
      image: 'https://via.placeholder.com/500x550',
    },
    {
      id: 2,
      name: 'Restaurant B',
      description: 'This is another restaurant description.',
      image: 'https://via.placeholder.com/500x550',
    },
    {
      id: 3,
      name: 'Restaurant C',
      description: 'This is yet another restaurant description.',
      image: 'https://via.placeholder.com/500x550',
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipedRestaurants, setSwipedRestaurants] = useState([]);

  function handleSwipe(direction) {
    const restaurant = restaurants[currentIndex];
    if (direction === 'right') {
      setSwipedRestaurants((prev) => [...prev, restaurant.id]);
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }

  function handleCardLeftScreen() {
    if (currentIndex === restaurants.length - 1) {
      navigate('/results');
    }
  }

  const cardStyles = {
    width: '90vw',
    height: '70vh',
    maxWidth: '400px',
    maxHeight: '600px',
    margin: '0 auto',
    borderRadius: '10px',
    boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',
    backgroundColor: 'white',
    overflow: 'hidden',
  };

  const imageStyles = {
    width: '100%',
    height: '60%',
    objectFit: 'cover',
  };

  const contentStyles = {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40%',
  };

  const nameStyles = {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0',
  };

  const descriptionStyles = {
    fontSize: '1.2rem',
    textAlign: 'center',
  };

  return (
    <div>
      {currentIndex < restaurants.length ? (
        <TinderCard
          key={restaurants[currentIndex].id}
          onSwipe={(dir) => handleSwipe(dir)}
          onCardLeftScreen={() => handleCardLeftScreen()}
          style={cardStyles}
          swipeThreshold={205}

        >
          <div>
            <img src={restaurants[currentIndex].image} alt={restaurants[currentIndex].name} style={imageStyles} />
            <div style={contentStyles}>
              <h2 style={nameStyles}>{restaurants[currentIndex].name}</h2>
              <p style={descriptionStyles}>{restaurants[currentIndex].description}</p>
            </div>
          </div>
        </TinderCard>
      ) : (
        <p>No more restaurants to show.</p>
      )}
    </div>
  );
}

export default RestaurantSelectionPage;
