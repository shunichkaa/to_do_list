import { useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '../../model/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;