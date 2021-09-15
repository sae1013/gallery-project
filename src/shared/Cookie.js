const getCookie = (key) => {
  let cookie_str = document.cookie;
  cookie_str = "; " + cookie_str;
  let splitted = cookie_str.split(`; ${key}=`);
  let value = splitted.pop().split(";").shift();
  console.log(value);
};

const setCookie = (key, value, exp = 5) => {
  let date = new Date();

  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

  document.cookie = `${key}=${value};expires=${date.toUTCString()};path=/`;
};

const deleteCookie = (key) => {
  document.cookie = key + "=; expires=Thu, 01 Jan 1999 00:00:10 GMT;";
};

export { getCookie, setCookie, deleteCookie };
