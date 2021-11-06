import { getLocalStorage } from "../helpers/localStorage";

export default function authHeader() {
  const { auth } = getLocalStorage('persist:root');
  console.log(JSON.parse(auth));
  const token = JSON.parse(auth).user;
  if (auth && token) {
    return { "authorization": 'Bearer ' + token };
  } else {
    return {};
  }
}