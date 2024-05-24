const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: true, // Run in headless mode
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // Required in some environments
  });
  const page = await browser.newPage();

  // Construct the file URL
  const fileUrl = 'file://' + path.resolve(__dirname, '1000x.html');

  // Load the HTML file
  await page.goto(fileUrl);

  // Define the duration to run the script (in milliseconds)
  const duration = 5 * 60 * 1000; // 5 minutes

  // Define the interval between measurements (in milliseconds)
  const interval = 100; // 5 seconds

  const startTime = Date.now();

  // Loop until the duration is reached
  while (Date.now() - startTime < duration) {
    // Measure GPU usage
    const gpuInfo = await page.metrics();
    console.log('GPU Memory Usage:', gpuInfo['JSHeapUsedSize'] / 1024 / 1024, 'MB');
    console.log('GPU Texture Memory Usage:', gpuInfo['MallocedTextureMemory'] / 1024 / 1024, 'MB');

    // Wait for the specified interval before the next measurement
    await new Promise(resolve => setTimeout(resolve, interval));
  }

  await browser.close();
})();
