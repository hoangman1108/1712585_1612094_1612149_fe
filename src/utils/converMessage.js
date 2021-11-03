const convertMessage = (key) => {
  switch (key) {
    case 'USER_NOT_FOUND':
      return 'account invalid, you should check username';
    case 'PASSWORD_NOT_MATCH':
      return 'password invalid, you should check password';
    default:
      return "";
  }
}

export default convertMessage;