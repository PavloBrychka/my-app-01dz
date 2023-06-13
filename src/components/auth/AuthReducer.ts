import { AuthUserActionType, IAuthUser, IUser } from './types';


// ініціалізація змінної
const initState: IAuthUser = {
    isAuth: false,
    user: undefined
    
}


// Перевірка входу користувача
export const AuthReducer = (state=initState, action: any) : IAuthUser => {
    
    switch(action.type) {
        // користувач увійшов
        case AuthUserActionType.LOGIN_USER: {
            const user = action.payload as IUser;
            return {
                isAuth: true,
                user
            };
        }
        // користувач вийшов 
        case AuthUserActionType.LOGOUT_USER: {
            return {
                isAuth: false
            };
        }
    }
    return state;
}