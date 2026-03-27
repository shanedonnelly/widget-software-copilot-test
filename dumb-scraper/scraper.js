(function() {
  'use strict';

  var BACKEND_URL = document.currentScript && document.currentScript.getAttribute('data-backend-url') || 'http://localhost:9002/api/content';
  var INTERVAL_MS = 5000;

  function getMetadata() {
    var title = document.title || '';
    var description = '';
    var meta = document.querySelector('meta[name="description"]');
    if (meta) description = meta.getAttribute('content') || '';

    return {
      title: title,
      description: description,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };
  }

  function scrapeAndSend() {
    var metadata = getMetadata();
    var html = document.documentElement.outerHTML;

    var payload = {
      title: metadata.title,
      content: html,
      excerpt: metadata.description,
      byline: '',
      url: metadata.url,
      timestamp: metadata.timestamp,
      source: 'dumb-script'
    };

    var xhr = new XMLHttpRequest();
    xhr.open('POST', BACKEND_URL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log('[DumbScraper] Content sent successfully');
      } else {
        console.warn('[DumbScraper] Backend responded with:', xhr.status);
      }
    };
    xhr.onerror = function() {
      console.error('[DumbScraper] Failed to send data');
    };
    xhr.send(JSON.stringify(payload));
  }

  function start() {
    console.log('[DumbScraper] Starting auto-scraper, interval:', INTERVAL_MS, 'ms');
    scrapeAndSend();
    setInterval(scrapeAndSend, INTERVAL_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
