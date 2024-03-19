import React from 'react';
import CreateNewRecipe from '../components/NewRecipeForm.js'; // Replace with the correct path
import { useTheme } from '../context/ThemeContext.js';
import Navbar from '../components/Navbar.js';


function AddRecipePage() {
  const { theme } = useTheme();
  const { darkMode } = theme;

  const pageBackgroundColor = darkMode === 'dark' ? 'DarkGray' : 'GhostWhite';

  return (
    
   <div style={{ backgroundColor: pageBackgroundColor }}>
                    <Navbar />
      {/* Other content of your AddRecipePage if any */}
      <CreateNewRecipe />
    </div>
  );
};

export default AddRecipePage;
