import { RootState, AppDispatch } from "../utils/AppThunk.types";
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector