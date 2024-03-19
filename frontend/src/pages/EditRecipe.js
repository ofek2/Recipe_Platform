import React from 'react';
import { useParams } from 'react-router-dom';
import EditRecipeForm from '../components/EditRecipeForm.js';
import Navbar from '../components/Navbar.js';

const EditRecipePage = () => {
  const { recipeId } = useParams();
    console.log(recipeId)
  return (
    <div className="container mx-auto">
                      <Navbar />
      <div className="text-3xl text-gray-600 font-bold text-center py-3 bigTitle sm:text-3xl">
        Edit Recipe
      </div>
      <EditRecipeForm recipeId={recipeId} />
    </div>
  );
};

export default EditRecipePage;