// eslint-disable-next-line import/no-extraneous-dependencies,node/no-extraneous-import
import axios from 'axios';

async function createAxiosInstance() {
  let instance;
  // eslint-disable-next-line no-undef
  const token = localStorage.getItem('token');
  console.log('token is', token);
  let headers = {};
  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  try {
    instance = axios.create({
      baseURL: 'https://api.yezcoin.com/',
      headers,
      timeout: 10000,
    });
  } catch (err) {
    instance = axios.create({
      baseURL: 'https://api.yezcoin.com/',
      headers,
      timeout: 10000,
    });
  }
  return instance;
}

function parseResponse(response) {
  if (response && response.data) {
    return response.data;
  }
  return null;
}

export async function getTransactions(json) {
  const instance = await createAxiosInstance();
  try {
    const response = await instance.post('api/v2/transactions', json);
    return parseResponse(response);
  } catch (error) {
    throw error;
  }
}

export async function getEthTransactions(json) {
  const instance = await createAxiosInstance();
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await instance.post('api/v2/ethTransactions', json);
    return parseResponse(response);
  } catch (error) {
    throw error;
  }
}

export async function loginUser(json) {
  const instance = await createAxiosInstance();
  try {
    const response = await instance.post('api/v1/login', json);
    return parseResponse(response);
  } catch (error) {
    throw error;
  }
}

export async function getAllWallets(json) {
  const instance = await createAxiosInstance();
  try {
    const response = await instance.post('api/v2/fetchAddressById', json);
    return parseResponse(response);
  } catch (error) {
    throw error;
  }
}
