import React, { useEffect} from "react";
import { Box, useMediaQuery } from '@mui/material';
import PizzaCard from "./PizzaCard";
import { setPizzaVarieties } from "scenes/state/authSlice";
import { useSelector, useDispatch } from "react-redux";

const PizzaList = () => {
    const { pizzaVarieties } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const isSmallScreen = useMediaQuery("(max-width: 620px)");
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch pizza varieties data from the server
          const response = await fetch("http://localhost:3001/pizza-varieties");
          const data = await response.json();
  
          // Set the pizza varieties in the Redux store
          dispatch(setPizzaVarieties(data));
        } catch (error) {
          console.error("Error fetching pizza varieties:", error);
        }
      };
  
      fetchData();
    }, [dispatch]);
  
    return (
      <Box display="flex" flexWrap="wrap" justifyContent="space-evenly" marginTop="1.3rem">
        {pizzaVarieties.map((pizza) => (
          <Box
            key={pizza.id}
            flex="1 0 300px"
            minWidth="250px"
            // maxWidth="270px"
            maxWidth={isSmallScreen ? "305px" : "270px"}
            margin="16px"
          >
            {/* Assuming `PizzaCard` is a separate component */}
            <PizzaCard pizza={pizza} />
          </Box>
        ))}
      </Box>
    );
  };
  
  export default PizzaList;