import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const model = 'black-forest-labs/FLUX.1-schnell';
const apiKey = process.env.HF_API_KEY;

async function diagnose400() {
  console.log('--- Diagnosing HF 400 Bad Request ---');
  console.log('Token exists:', !!apiKey);

  const url = `https://router.huggingface.co/hf-inference/models/${model}`;
  
  // Test format 1: JSON payload {"inputs": "prompt"}
  try {
    console.log('Trying JSON format {"inputs": "..."} ...');
    const res = await axios.post(
      url,
      { inputs: 'A simple corporate marketing logo, minimalist design' },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      }
    );
    console.log('✅ Form 1 Succeeded! Status:', res.status);
  } catch (err) {
    console.log('❌ Form 1 Failed:');
    if (err.response) {
      console.log('Status:', err.response.status);
      try {
        const text = new TextDecoder().decode(err.response.data);
        console.log('Error Data:', text);
      } catch (e) {
        console.log('Error Data (raw):', err.response.data);
      }
    } else {
      console.log('Error message:', err.message);
    }
  }

  // Test format 2: Raw string in body
  try {
    console.log('\nTrying raw string body format ...');
    const res = await axios.post(
      url,
      'A simple corporate marketing logo, minimalist design',
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'text/plain'
        },
        timeout: 15000
      }
    );
    console.log('✅ Form 2 Succeeded! Status:', res.status);
  } catch (err) {
    console.log('❌ Form 2 Failed:');
    if (err.response) {
      console.log('Status:', err.response.status);
      try {
        const text = new TextDecoder().decode(err.response.data);
        console.log('Error Data:', text);
      } catch (e) {
        console.log('Error Data (raw):', err.response.data);
      }
    } else {
      console.log('Error message:', err.message);
    }
  }
}

diagnose400();
