import { createDomain } from "effector";

const isLogin = createDomain();

export const logIn = isLogin.createEvent<boolean>();
export const setUser = isLogin.createEvent<string>();

export const $isLogin = isLogin.createStore<boolean>(false)
.on(logIn ,(_, value) => value);

export const $user = isLogin.createStore<string>("")
.on(setUser, (_, value) => value);
