import axios from 'axios';

export const getCityName = async (lat, long) => {
  const { data } = await axios.get(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}`
  );
  // console.log(data);
  return data;
};
