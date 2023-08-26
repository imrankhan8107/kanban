import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const fetchTasksData = async () => {
  const res = await fetch(
    "https://api.quicksell.co/v1/internal/frontend-assignment"
  );
  const data = await res.json();
  return data;
};

// First, create the thunk
const fetchTasks = createAsyncThunk("users/fetchTasks", async (thunkAPI) => {
  try {
    const response = await fetchTasksData();
    return response;
  } catch (error) {
    // You can also dispatch additional actions or handle errors here
    thunkAPI.rejectWithValue(error.message);
  }
});

// Then, handle actions in your reducers:
const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: {
      tickets: [],
      users: [],
    },
    // grouping: localStorage["grouping"] ?? "status",
    // ordering: localStorage["ordering"] ?? "priority",
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    // selectGrouping: (state, action) => {
    //   localStorage["grouping"] = action.payload;
    //   state.grouping = action.payload;
    // },
    // selectOrdering: (state, action) => {
    //   localStorage["ordering"] = action.payload;
    //   state.ordering = action.payload;
    // },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      // Add user to the state array
      state.tasks = action.payload;
    });
  },
});

export default taskSlice.reducer;
// export const { selectGrouping, selectOrdering } = taskSlice.actions;
export { fetchTasks };
