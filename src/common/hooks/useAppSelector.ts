import {useSelector} from 'react-redux';
import type {RootState} from '../../model/store';

export const useAppSelector = useSelector.withTypes<RootState>();