export function parseJwt(token) {
  if (!token) {
    return;
  }

  // token = token.toString();
  // console.log(token);
  // console.log(typeof token);
  const base64Url = token.split(".")[1];
  // console.log(base64Url);
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export const handleResponseError = (error) => {
  if (error.response) {
    console.log(error.response.data);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log(error.message);
  }
};
