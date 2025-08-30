function getApiData(url) {
  console.log(`API-Call an "${url}"`);
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: "GET",
      url: url,
      onload: (res) => {
        console.log("Status:", res.status); // Debug
        console.log("Antwort-Länge:", res.responseText.length); // Debug
        try {
          const json = JSON.parse(res.responseText);
          console.log("JSON erfolgreich geparsed");
          resolve(json);
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
