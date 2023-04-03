import axios from "axios";

const CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_LINKEDIN_CALLBACK_URI;
const SCOPE = "r_liteprofile r_emailaddress";

export const linkedinAuth = {
  authorize() {
    const url = "https://www.linkedin.com/oauth/v2/authorization?";
    const query = new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: SCOPE,
    }).toString();
    window.location.href = url + query;
  },
  async getAccessToken(code) {
    const data = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  },
};
