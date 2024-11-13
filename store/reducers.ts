import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  // Aquí puedes agregar tus reducers
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;