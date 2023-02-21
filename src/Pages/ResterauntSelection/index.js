import React, { useState, useRef, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TinderCard from "react-tinder-card";

function AdvancedRestaurantSelectionPage() {
  const navigate = useNavigate();
  const [swipedRestaurants, setSwipedRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);
  const childRefs = useMemo(
    () =>
      Array(restaurants.length)
        .fill(0)
        .map((i) => React.createRef()),
    [restaurants]
  );

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/restaurants");
        const restaurantsData = await response.json();
        setRestaurants(restaurantsData);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchRestaurants();
  }, []);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < restaurants.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = (direction, restaurantToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);

    // Send the swiped restaurant to the backend
    const swipedRestaurant = restaurants[index];
    fetch("/api/swiped-restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(swipedRestaurant),
    });
  };

  const outOfFrame = (restaurant, idx) => {
    console.log(
      `${restaurant.name} (${idx}) left the screen!`,
      currentIndexRef.current
    );
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < restaurants.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex]?.current?.restoreCard();
  };

  const cardStyles = {
    width: "90vw",
    height: "70vh",
    maxWidth: "400px",
    maxHeight: "600px",
    margin: "0 auto",
    borderRadius: "10px",
    boxShadow: "0px 10px 30px -5px rgba(0, 0, 0, 0.3)",
    backgroundColor: "white",
    overflow: "hidden",
    transitionDuration: "0ms",
  };

  const imageStyles = {
    width: "100%",
    height: "60%",
    objectFit: "cover",
  };

  const contentStyles = {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
  };
  const nameStyles = {
    fontSize: "2rem",
    fontWeight: "bold",
    margin: "0",
  };

  const descriptionStyles = {
    fontSize: "1.2rem",
    textAlign: "center",
  };

  const handleResultsClick = () => {
    navigate("/results");
  };

  const handleAddRestaurantClick = () => {
    navigate("/add-restaurant");
  };

  return (
    <div>
      {restaurants.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={() => swipe("left")}>Swipe Left</button>
            <button onClick={() => swipe("right")}>Swipe Right</button>
          </div>
          ...
        </div>
      )}
    </div>
  );
  
}

export default AdvancedRestaurantSelectionPage;
