// Spotify API - Client Credentials Flow
async function getAccessToken() {
  const clientId = "c54f02feb1ab4054b5f6d79fe0207130";
  const clientSecret = "e05b8f094c524ae5bf42c43886eed806";
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("Failed to get Spotify token");
  }

  const data = await response.json();
  return data.access_token;
}

// Spotify Search API 호출
async function searchSpotify(query) {
  const token = await getAccessToken();
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Spotify search results");
  }

  const data = await response.json();
  return data.tracks.items;
}

// 검색 실행 및 결과 표시
async function handleSearch() {
  const query = document.querySelector("#search-input").value;
  try {
    const results = await searchSpotify(query);
    const resultsContainer = document.querySelector("#results");
    resultsContainer.innerHTML = results
      .map(
        (track) => `
        <div>
          <p><strong>${track.name}</strong> by ${track.artists
          .map((a) => a.name)
          .join(", ")}</p>
          <audio controls src="${track.preview_url}"></audio>
        </div>
      `
      )
      .join("");
  } catch (error) {
    console.error(error.message);
  }
}

// DOM 이벤트 연결
document.querySelector("#search-btn").addEventListener("click", handleSearch);
