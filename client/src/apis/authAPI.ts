import { API_BASE_URL } from '../constants/environment';

export const getAuth = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth`, {
      method: 'GET',
      credentials: 'include',
    });
    return res.ok;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
    });
    return res.ok;
  } catch (error) {
    console.error(error);
  }
};
