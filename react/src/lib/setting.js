
export const ENV_MODE = process.env.NODE_ENV;
export const ENV_MODE_DEV = process.env.NODE_ENV === 'development';
export const ENV_MODE_PROD = process.env.NODE_ENV === 'production';

export const api_address = ENV_MODE_DEV ? `http://127.0.0.1:9999` :`http://127.0.0.1:9999`;
// export const lfw_address = ENV_MODE_PROD ? `http://localhost:3000` : `http://15.164.27.98:28180`;
export const lfw_address = ENV_MODE_PROD ? `http://localhost:13986` : `http://15.164.27.98:28180`;
// NOTE: Electron Local Test
// export const lfw_address = `http://15.164.27.98:28180`;
export const lfw_bin_address =`http://15.164.27.98:28700`;
export const test_server_address = `http://localhost:9999`


// http://15.164.27.98:3000