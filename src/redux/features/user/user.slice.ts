import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useGetLocalStorage } from '@/hooks';
import { IUserApp } from './user.interface';

const userLocalStorage: IUserApp | null = useGetLocalStorage<IUserApp>('user');

const userVoid: IUserApp = {
   username: '',
   role: null
};

const initialState: IUserApp = userLocalStorage ?? userVoid;

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      updateUser: (state, action: PayloadAction<IUserApp>) => {
         state.username = action.payload.username;
         state.role = action.payload.role;
      },
      removeUser: (state) => {
         state.username = '';
         state.role = null;
      }
   }
});

export const { updateUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
