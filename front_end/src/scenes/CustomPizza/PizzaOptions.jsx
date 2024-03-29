import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setBase,
  setCheese,
  setSauce,
  setVeggie,
  fetchPizzaOptions,
  setPizzaOptions,
} from 'scenes/state/authSlice';
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router';

const PizzaOptions = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    baseOptions,
    sauceOptions,
    cheeseOptions,
    veggieOptions,
    selectedOptions,
  } = useSelector((state) => state.auth);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Fetch pizza options on component mount
    const fetchOptions = async () => {
      try {
        // Dispatch action to fetch pizza options
        const options = await dispatch(fetchPizzaOptions());
        // Dispatch action to set pizza options in the state
        dispatch(setPizzaOptions(options));
      } catch (error) {
        console.error('Error fetching pizza options:', error);
      }
    };

    fetchOptions();
  }, [dispatch]);

  if (!baseOptions || !sauceOptions || !cheeseOptions || !veggieOptions) {
    return <div>Loading...</div>;
  }

  // Function to handle selecting an option from each category
  const handleOptionSelect = (optionType, option) => {
    switch (optionType) {
      case 'base':
        dispatch(setBase(option));
        break;
      case 'sauce':
        dispatch(setSauce(option));
        break;
      case 'cheese':
        dispatch(setCheese(option));
        break;
      case 'veggie':
        dispatch(setVeggie(option));
        break;
      default:
        break;
    }
  };

  // Function to render options for a specific category
  const renderOptions = (options, optionType, selectedOption, categoryText) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '0.5rem' }}>
      <Typography variant="h4" style={{ marginBottom: '0.5rem', fontWeight: '700' }}>
        {categoryText}
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', width: '100%' }}>
        {options.map((option, index) => (
          <Card
            key={option.id}
            onClick={() => handleOptionSelect(optionType, option)}
            sx={{
              width: 160,
              margin: 1,
              cursor: 'pointer',
              backgroundColor: selectedOption === option ? 'lightblue' : 'white',
              position: 'relative',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': { transform: 'scale(1.05)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' },
            }}
          >
            <CardMedia component="img" height="120" image={option.img} alt={option.name} />
            <CardContent style={{ textAlign: 'center', padding: 2, alignItems: 'center', width: '150px', fontWeight: 'bold' }}>
              <Typography variant="subtitle1" style={{ fontSize: '18px', fontWeight: '550' }}>
                {option.name}
              </Typography>
              {selectedOption === option && (
                <IconButton style={{ position: 'absolute', top: 0, right: 0 }} color="primary">
                  <CheckCircleOutline />
                </IconButton>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Function to handle customizing pizza
  const customizedPizza = () => {
    if (selectedOptions.base && selectedOptions.sauce && selectedOptions.cheese && selectedOptions.veggie) {
      if (isAuthenticated) {
        navigate('/customizedPizza', {
          state: {
            selectedOptions,
            baseOptions,
            sauceOptions,
            cheeseOptions,
            veggieOptions,
          },
        });
      } else {
        setError('Please log in to customize your pizza.');
      }
    } else {
      setError('Please select one option from each category to customize pizza.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <hr style={{ width: '100%', margin: '20px auto' }} />

      <Typography variant="h3" style={{ marginBottom: '1.5rem', fontWeight: '700'}}>
        Customizable Pizza
      </Typography>

      <hr style={{ width: '100%', margin: '20px auto' }} />
      {renderOptions(baseOptions, 'base', selectedOptions.base, 'Pizza Base')}

      <hr style={{ width: '100%', margin: '20px auto' }} />
      {renderOptions(sauceOptions, 'sauce', selectedOptions.sauce, 'Sauce')}

      <hr style={{ width: '100%', margin: '20px auto' }} />
      {renderOptions(cheeseOptions, 'cheese', selectedOptions.cheese, 'Cheese')}

      <hr style={{ width: '100%', margin: '20px auto' }} />
      {renderOptions(veggieOptions, 'veggie', selectedOptions.veggie, 'Veggies')}

      {error && <p style={{ color: 'red', fontSize: '24px', fontWeight: '600' }}>{error}</p>}

      <Button
        onClick={customizedPizza}
        variant="contained"
        color="primary"
        style={{
          marginTop: '1.5rem',
          width: '200px',
          padding: '1rem',
          fontSize: '1.2rem',
          fontWeight: 'bold',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s',
          '&:hover': { backgroundColor: '#388e3c' },
        }}
      >
        Customize
      </Button>
    </div>
  );
};

export default PizzaOptions;
