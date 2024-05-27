const puppeteer = require('puppeteer');

async function renderHTMLInBackground(htmlFileURL, duration, interval) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Navigate to HTML file URL
    await page.goto(htmlFileURL);

    // Define the start time
    const startTime = Date.now();

    // Loop until the duration is reached
    while (Date.now() - startTime < duration) {
        // Measure memory usage
        const memoryInfo = await page.metrics();
        console.log('JS Heap Used Size:', memoryInfo['JSHeapUsedSize'] / 1024 / 1024, 'MB');

        // Wait for the specified interval before the next measurement
        await new Promise(resolve => setTimeout(resolve, interval));
    }

    // Close the browser
    await browser.close();
}

// Define the parameters
const htmlFileURL = 'C:\\Users\\USER\\Desktop\\Adilah\\babylon-performance\\1000x.html'; // Change to the path of your HTML file
const duration = 60000; // Duration in milliseconds (e.g., 1 minute)
const interval = 100; // Interval between measurements in milliseconds (e.g., 5 seconds)

// Call the function
renderHTMLInBackground(htmlFileURL, duration, interval)
    .then(() => console.log('Memory usage recorded successfully.'))
    .catch(error => console.error('Error recording memory usage:', error));
