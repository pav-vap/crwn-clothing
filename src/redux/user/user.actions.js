import { UserActionTypes } from './user.types';

export const setCurrentUser = userA => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: userA
});