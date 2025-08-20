const axios = require('axios');

const BASE_URL = process.env.SANKHYA_BASE_URL;

async function login() {
  const { data } = await axios.post(
    `${BASE_URL}?serviceName=MobileLoginSP.login&outputType=json`,
    {
      serviceName: 'MobileLoginSP.login',
      requestBody: {
        NOMUSU: { $: process.env.SANKHYA_USER },
        INTERNO: { $: process.env.SANKHYA_PASSWORD },
        KEEPCONNECTED: { $: 'S' }
      }
    }
  );
  return data.responseBody.jsessionid.$;
}

async function executeQuery(jsessionid, sql) {
  const config = {
    method: 'post',
    url: `${BASE_URL}?serviceName=DbExplorerSP.executeQuery&application=DbExplorer&outputType=json`,
    headers: {
      'Content-Type': 'application/json',
      Cookie: `JSESSIONID=${jsessionid}`
    },
    data: {
      serviceName: 'DbExplorerSP.executeQuery',
      requestBody: { sql }
    }
  };

  const { data } = await axios(config);
  return data.responseBody.rows;
}

module.exports = { login, executeQuery };
