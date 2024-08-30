const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { getUserInventory, UpdateUserInventory } = require("../_utils/inventoryPoint");

const initialState = {
  username: "",
  food: 0,
  electronics: 0,
  medicine: 0,
  others: 0,
  stockReq: {
    error: "",
    loading: false,
    success: false,
  },
};
export const getIventory = createAsyncThunk(
  "Invetory/getIventory",
  async (token, { rejectWithValue }) => {
    try {
      const res = await getUserInventory(token);
      const response = res.data;
      return response;
    } catch (e) {
      return rejectWithValue(e.response ? e.response.data : e.message);
    }
  
  }
);

export const UpdateIventory = createAsyncThunk(
  "Invetory/UpdateIventory",
  async ({token,data}, { rejectWithValue }) => {
    try {
      const res = await UpdateUserInventory(token,data);
      const response = res.data;
      return response;
    } catch (e) {
      return rejectWithValue(e.response ? e.response.data : e.message);
    }
  }
);



const InvetorySlice = createSlice({
  initialState,
  name: "Invetory",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIventory.pending, (state) => {
        state.stockReq.loading = true;
      })
      .addCase(getIventory.fulfilled, (state, action) => {
        action.payload.stock.userId.username;
        state.stockReq.loading = false;
        state.stockReq.success = true;
        state.username = action.payload.stock.userId.username;
        state.electronics = action.payload.stock.electronics;
        state.food = action.payload.stock.food;
        state.medicine = action.payload.stock.medicine;
        state.others = action.payload.stock.others;
      });

      builder.addCase(UpdateIventory.pending,(state)=>{
        state.stockReq.loading = true ;
      })
      .addCase(UpdateIventory.fulfilled,(state,action)=>{
       state.stockReq.loading= false ;
        state.stockReq.success =  action.payload.success ;
      })
      
  },
});

export default InvetorySlice.reducer;
