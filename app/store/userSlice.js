const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { register, login } = require("../_utils/userPoint");

const initialState = {
  token: "",
  success: false,
  loading: false,
  error: "",
};

// Async thunks
export const registerFunc = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await register(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const loginFunc = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await login(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerFunc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerFunc.fulfilled, (state, action) => {
        "Login successful, token:", action.payload.token;

        state.loading = false;
        state.token = action.payload.token; // Adjust based on your API response
        state.success = true;
        localStorage.setItem("token", state.token);
      })
      .addCase(registerFunc.rejected, (state, action) => {
        action.payload;
        state.loading = false;
        state.success = false;
        state.error = action.payload.error;
      })
      // ..........................................................
      .addCase(loginFunc.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginFunc.fulfilled, (state, action) => {
        ("dada");

        action.payload.token;
        state.loading = false;
        state.token = action.payload.token;
        state.success = true;
        localStorage.setItem("token", state.token);
      })
      .addCase(loginFunc.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload.error; // Access the error message
      });
  },
});

export default userSlice.reducer;
