function getUrls() {
  const urls = [];
  document
    .querySelectorAll('link[href*="cdn.midjourney.com"]')
    .forEach((link) => {
      urls.push(link.href.replace(/([0-3]_[0-3])(.*)(\.webp)$/, "$1$3"));
    });

  // Remove invalid urls
  return urls.filter((u) => u.length > 50);
}

function printUrls() {
  const urls = getUrls();
  console.log(urls.join("\n"));
}

printUrls();
