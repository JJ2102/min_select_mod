async function getApiData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("APIError: ", error);
    throw error;
  }
}
