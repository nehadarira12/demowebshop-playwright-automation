const report = require('multiple-cucumber-html-reporter');
const { exec } = require('child_process');
const path = require('path');

const reportPath = path.resolve(
  __dirname,
  'test-results',
  'html-report',
  'index.html'
);

report.generate({
  jsonDir: 'test-results',
  reportPath: 'test-results/html-report',
  reportName: 'Demo Web Shop BDD Report',
  pageTitle: 'BDD Test Report',
  displayDuration: true,
  openReportInBrowser: false,
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest',
    },
    device: 'Local machine',
    platform: {
      name: 'Windows',
      version: '11',
    },
  },
});


exec(`start "" "${reportPath}"`);
