function getApiData(url) {
  console.log(`API-Call an "${url}"`);
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: "Get",
      url: url,
      onload: (res) => {
        try {
          console.log(`${url} geladen...`);
          resolve(JSON.parse(res.responseText));
        } catch (error) {
          reject(error);
        }
      },
      onerror: reject,
    });
  });
}
