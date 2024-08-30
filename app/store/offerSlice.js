const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const {
  getOffers,
  acceptOffers,
  acceptOffer,
  CreateOffer,
} = require("../_utils/offerPoint");

const initialState = {
  success: false,
  error: "",
  loading: false,
  offers: [],
};

export const getAllOffers = createAsyncThunk(
  "offers/getAllOffers",
  async (token, { rejectWithValue }) => {
    try {
      const req = await getOffers(token);
      const response = req.data;
      return response;
    } catch (e) {
      return rejectWithValue(e.response ? e.response.data : e.message);
    }
  }
);

export const AcceptUserOffer = createAsyncThunk(
  "offers/AcceptUserOffer",
  async ({token,data}, { rejectWithValue }) => {
    try {
      const req = await acceptOffer(token, data);
      const response = req.data;
      return response;
    } catch (e) {
      return rejectWithValue(e.response ? e.response.data : e.message);
    }
  }
);

export const createOffer = createAsyncThunk(
  "offers/createOffer",
  async ({token,data}, { rejectWithValue }) => {
    try {
      const req = await CreateOffer(token, data);
      const response = req.data;
      return response;
    } catch (e) {
      return rejectWithValue(e.response ? e.response.data : e.message);
    }
  }
);
const OfferSlice = createSlice({
  initialState,
  name: "offers",
  extraReducers: (builder) => {
    builder
      .addCase(getAllOffers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.offers = action.payload.offers;
      });
    builder
      .addCase(AcceptUserOffer.pending, (state) => {
        state.loading = true;
      })
      .addCase(AcceptUserOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      });

      builder
      .addCase(createOffer.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      });
  },
});

export default OfferSlice.reducer;
