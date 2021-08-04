import { API_BASE_URL } from '../constants/environment';

export const getPayments = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/payments`, {
      method: 'GET',
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createPayment = async (name: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(`${data.message}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deletePayment = async (id: number) => {
  try {
    const res = await fetch(`${API_BASE_URL}/payments/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const { message } = await res.json();
      throw new Error(`${message}`);
    }
    return true;
  } catch (error) {
    console.log(error);
  }
};
