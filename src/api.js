function getApiData(url) {
  console.log(`API-Call an "${url}"`);
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: "GET",
      url: url,
      onload: (res) => {
        try {
          const data = JSON.parse(res.responseText);
          resolve(data);
        } catch (error) {
          console.error("Parsing-Fehler:", error);
          reject(error);
        }
      },
      onerror: (err) => {
        console.error("Request-Fehler:", err);
        reject(err);
      },
    });
  });
}
