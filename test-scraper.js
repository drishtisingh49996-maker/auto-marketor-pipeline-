import { scrapeWebsite } from './services/scraper.js';

async function test() {
  const targetUrl = process.argv[2] || 'https://example.com';
  console.log(`\n======================================`);
  console.log(`🔍 Testing Scraper on: ${targetUrl}`);
  console.log(`======================================\n`);

  try {
    const start = Date.now();
    const result = await scrapeWebsite(targetUrl);
    const duration = Date.now() - start;

    console.log(`⏱️ Duration: ${duration}ms`);
    console.log(`✅ Success: ${result.success}`);
    console.log(`📌 Title: "${result.title}"`);
    console.log(`📝 Description: "${result.description}"`);
    console.log(`📄 Content Snippet (first 400 chars):`);
    console.log(`--------------------------------------`);
    console.log(result.content ? result.content.substring(0, 400) + '...' : '[Empty Content]');
    console.log(`--------------------------------------`);
    if (result.error) {
      console.log(`⚠️ Error/Warning: ${result.error}`);
    }
    console.log(`======================================\n`);
  } catch (err) {
    console.error('❌ catastrophic error during scraping test:', err);
  }
}

test();
