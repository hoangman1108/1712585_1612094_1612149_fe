const convertMessage = (key) => {
  switch (key) {
    case 'USER_NOT_FOUND':
      return 'account invalid, you should check username';
    case 'PASSWORD_NOT_MATCH':
      return 'password invalid, you should check password';
    case 'NAME_CLASS_EXISTS':
      return 'class name is exists in database';
    default:
      return "";
  }
}

export default convertMessage;