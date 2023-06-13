export enum AuthUserActionType {
    LOGIN_USER = "AUTH_LOGIN_USER",
    LOGOUT_USER = "AUTH_LOGOUT_USER"
}
// 
export interface IAuthUser {
    isAuth: boolean, // перевіряє чи користувач авторизований
    user?: IUser // зберігає данні про користувача
}

export interface IUser {
    email: string,
    name: string
}