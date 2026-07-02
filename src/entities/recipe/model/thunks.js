// src/entities/recipe/model/thunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createRecipeRequest } from '../api/createRecipe';

// Асинхронный thunk для создания нового рецепта на сервере
export const createRecipe = createAsyncThunk('recipes/createRecipe', createRecipeRequest);
