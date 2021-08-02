const BASE_URL = 'http://localhost:8080';

export const getMainChartData = async (year: Number, month: Number) => {
  try {
    const res = await fetch(`${BASE_URL}/chart/cashbooks?year=${year}&month=${month}`, {
      method: 'GET',
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMonthData = async (year: Number, month: Number) => {
  try {
    const res = await fetch(`${BASE_URL}/cashbooks?year=${year}&month=${month}`, {
      method: 'GET',
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
