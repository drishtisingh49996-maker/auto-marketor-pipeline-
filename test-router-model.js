import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const model = 'black-forest-labs/FLUX.1-schnell';
const apiKey = process.env.HF_API_KEY;

async function testRouter() {
  console.log('--- Router Model Inference Test ---');
  console.log('Using API Key:', !!apiKey);

  try {
    const response = await axios.post(
      `https://router.huggingface.co/models/${model}`,
      { inputs: 'A futuristic marketing agency workspace, high quality, digital art' },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer',
        timeout: 15000
      }
    );
    
    console.log('✅ SUCCESS!');
    console.log('Response Status:', response.status);
    console.log('Content Type:', response.headers['content-type']);
    console.log('Received Buffer length:', response.data.byteLength);
  } catch (err) {
    console.error('❌ Failed to use router endpoint:', err.message);
    if (err.response) {
      console.log('Response Status:', err.response.status);
      try {
        const text = new TextDecoder().decode(err.response.data);
        console.log('Response Data:', text);
      } catch (e) {
        console.log('Unable to decode error response data');
      }
    }
  }
}

testRouter();
