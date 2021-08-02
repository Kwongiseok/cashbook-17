const BASE_URL = 'http://localhost:8080';

export const getMainChartData = async (year: Number, month: Number) => {
  try {
    const data = await fetch(`BASE_URL/?year=${year}&month=${month}`, {
      method: 'GET',
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
