const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { getUserTransactions } = require("../_utils/transactionPoint");

const initialState = {
  success: false,
  error: "",
  loading: false,
  transactions: [],
};

export const getAllTransaction = createAsyncThunk(
  "transaction/getTransactions",
  async (token, { rejectWithValue }) => {
    try {
      const req = await getUserTransactions(token);
      const response = req.data;
      return response;
    } catch (e) {
      return rejectWithValue(e.response ? e.response.data : e.message);
    }
  }
);

const TransactionSlice = createSlice({
  initialState,
  name: "transaction",
  extraReducers: (builder) => {
    builder
      .addCase(getAllTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTransaction.fulfilled, (state, action) => {
        action.payload.transactions;
        state.loading = false;
        state.success = true;
        state.transactions = action.payload.transactions;
      });
  },
});

export default TransactionSlice.reducer;
