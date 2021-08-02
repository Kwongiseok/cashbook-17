const BASE_URL = 'http://localhost:8080';

export const getMainChartData = async (year: Number, month: Number) => {
  try {
    const res = await fetch(`${BASE_URL}/chart/cashbooks?year=${year}&month=${7}`, {
      method: 'GET',
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
