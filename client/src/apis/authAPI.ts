const BASE_URL = 'http://localhost:8080';

export const getAuth = async () => {
  try {
    const res = await fetch(`${BASE_URL}/auth`, {
      method: 'GET',
    });
    return res.ok;
  } catch (error) {
    console.log(error);
  }
};
