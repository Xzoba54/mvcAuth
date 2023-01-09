import axios from "axios";

const clearLocalStorage = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const auth = async () => {
  try {
    if (!localStorage.getItem("accessToken") || !localStorage.getItem("refreshToken")) {
      clearLocalStorage();
      return { success: false };
    }

    const res = await axios.post("http://localhost:5000/api/v1/auth/verify", null, {
      headers: { Authorization: `Bearer: ${localStorage.getItem("accessToken")}` },
    });

    return res.data;
  } catch {
    clearLocalStorage();
    return { success: false };
  }
};

export default auth;
