import axios from 'axios';

async function testDoH() {
  console.log('--- Secure DNS-over-HTTPS (DoH) CNAME Test ---');

  try {
    const response = await axios.get('https://dns.google/resolve', {
      params: { name: 'api-inference.huggingface.co', type: 'CNAME' },
      timeout: 5000
    });

    console.log('✅ CNAME Query Succeeded!');
    console.log('Response Body:', JSON.stringify(response.data, null, 2));
  } catch (err) {
    console.error('❌ CNAME Query Failed:', err.message);
  }
}

testDoH();
