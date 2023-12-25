import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, AnyAction } from 'redux';
import { store } from '..';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;