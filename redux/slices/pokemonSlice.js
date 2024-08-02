import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from "../../api/axios";

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async () => {
    const response = await apiClient.get("/pokemon/list");
    return response.data;
  }
);

export const fetchMyPokemons = createAsyncThunk(
  "pokemon/fetchMyPokemons",
  async () => {
    const response = await apiClient.get("/pokemon/me");
    return response.data;
  }
);

export const fetchPokemonById = createAsyncThunk(
  "pokemon/fetchPokemonById",
  async (id) => {
    const response = await apiClient.get(`/pokemon/${id}`);
    return response.data;
  }
);

export const fetchPokemonMeById = createAsyncThunk(
  "pokemon/fetchPokemonMeById",
  async (id) => {
    const response = await apiClient.get(`/pokemon/me/${id}`);
    return response.data;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemons: [],
    myPokemons: [],
    selectedPokemon: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pokemons = action.payload;
      })

      .addCase(fetchMyPokemons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.myPokemons = action.payload;
      })

      .addCase(fetchPokemons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPokemonById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedPokemon = action.payload;
      })
      .addCase(fetchPokemonMeById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedPokemon = action.payload;
      });
  },
});

export default pokemonSlice.reducer;
