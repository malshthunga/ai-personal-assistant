import axios from "axios";

export async function GetAuthUserData(token: string) {
  try{
  const userInfo = await axios.get(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    { headers: { Authorization: "Bearer " + token } }
  );
  return userInfo.data;
}
catch(e)
{
  return e // e is error
}
}
