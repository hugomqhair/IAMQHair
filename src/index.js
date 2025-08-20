require('dotenv').config();
const { login, executeQuery } = require('./sankhyaApi');
const dailySalesQuery = require('./queries/dailySales');

function checkEnv(vars) {
  vars.forEach((v) => {
    if (!process.env[v]) {
      throw new Error(`Missing environment variable: ${v}`);
    }
  });
}

async function main() {
  try {
    checkEnv(['SANKHYA_BASE_URL', 'SANKHYA_USER', 'SANKHYA_PASSWORD']);
    console.log('Starting...');
    const jsessionid = await login();
    console.log('Session ID:', jsessionid);
    const rows = await executeQuery(jsessionid, dailySalesQuery);
    console.log(rows);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
