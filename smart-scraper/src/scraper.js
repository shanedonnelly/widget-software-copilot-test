import { Readability } from '@mozilla/readability';
import { convertHtmlToMarkdown } from 'dom-to-semantic-markdown';

(function() {
  'use strict';

  const BACKEND_URL = document.currentScript?.getAttribute('data-backend-url') || 'http://localhost:9002/api/content';
  const INTERVAL_MS = 5000;

  function parsePageToMarkdown() {
    const url = window.location.href;
    const timestamp = new Date().toISOString();

    try {
      // Clone the document so Readability doesn't modify the live DOM
      const docClone = document.cloneNode(true);

      // Remove our own script tag from the clone
      const scraperScripts = docClone.querySelectorAll('script[data-scraper]');
      scraperScripts.forEach(el => el.remove());

      // Use Readability to extract clean article content
      const reader = new Readability(docClone, {
        charThreshold: 100,
        keepClasses: false,
      });
      const article = reader.parse();

      if (article && article.content) {
        // Convert Readability's HTML output to semantic markdown
        const markdown = convertHtmlToMarkdown(article.content, {
          extractMainContent: true,
          includeMetaData: 'extended',
        });

        return {
          title: article.title || document.title,
          content: markdown,
          excerpt: article.excerpt || undefined,
          byline: article.byline || undefined,
          url,
          timestamp,
          source: 'script',
        };
      }
    } catch (e) {
      console.warn('[Scraper] Readability parsing failed, falling back:', e);
    }

    // Fallback: directly convert the body
    const fallbackMarkdown = convertHtmlToMarkdown(document.body.innerHTML, {
      extractMainContent: true,
      includeMetaData: 'extended',
    });

    return {
      title: document.title,
      content: fallbackMarkdown,
      url,
      timestamp,
      source: 'script',
    };
  }

  async function sendToBackend(data) {
    try {
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log('[Scraper] Content sent successfully');
      } else {
        console.warn('[Scraper] Backend responded with:', response.status);
      }
    } catch (e) {
      console.error('[Scraper] Failed to send data:', e);
    }
  }

  function scrapeAndSend() {
    const data = parsePageToMarkdown();
    sendToBackend(data);
  }

  // Wait for page to be fully loaded before starting
  function start() {
    console.log('[Scraper] Starting auto-scraper, interval:', INTERVAL_MS, 'ms');
    // Send once immediately
    scrapeAndSend();
    // Then every 5 seconds
    setInterval(scrapeAndSend, INTERVAL_MS);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
