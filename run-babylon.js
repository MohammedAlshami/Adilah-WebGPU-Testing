const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',

    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  // Construct the file URL
  const fileUrl = 'file://' + path.resolve(__dirname, '1000x.html');

  // Load the HTML file
  await page.goto(fileUrl);

  // Wait for a certain amount of time to allow for rendering
  await new Promise(resolve => setTimeout(resolve, 3000)); // Adjust the delay as needed

  // Optionally, take a screenshot to visually inspect the rendered page
  await page.screenshot({ path: 'rendered_page.png' });

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
