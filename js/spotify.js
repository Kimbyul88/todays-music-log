import {
  // buttonClickSound,
  buttonClickSound2,
  buttonClickSound3,
} from "./sound";

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
  console.dir(data);
  return data.tracks.items;
}

// 저장된 트랙 리스트
const savedTracks = [];

// 검색 실행 및 결과 표시
// 검색 실행 및 결과 표시
async function handleSearch() {
  var audio = new Audio("/sound/click.mp3");
  audio.play();
  const query = document.querySelector(".search-input").value;
  try {
    const results = await searchSpotify(query);
    const resultsContainer = document.querySelector(".search-results");
    resultsContainer.innerHTML = results
      .map(
        (track, key) => `
        <div class="search-result__div" data-index="${key}">
         <img src="${track.album.images[0].url}" alt="${track.name}" />
          <p><strong>${track.name}</strong> <span>by ${track.artists
          .map((a) => a.name)
          .join(", ")}</span></p>
        </div>
      `
      )
      .join("");

    // 각 결과에 클릭 이벤트 리스너 추가
    const resultDivs = document.querySelectorAll(".search-result__div");
    resultDivs.forEach((div, index) => {
      div.addEventListener("click", () => {
        buttonClickSound3(); // 사운드를 재생
        saveTrack(results[index]);
      });
    });
  } catch (error) {
    console.error(error.message);
  }
}

// 트랙 저장 함수
function saveTrack(track) {
  // 중복 저장 방지
  if (!savedTracks.some((t) => t.id === track.id)) {
    savedTracks.push({
      id: track.id,
      name: track.name,
      artists: track.artists.map((a) => a.name),
      image: track.album.images[0].url,
    });
    updateSavedTracksUI();
    updateToEditPopup();
  } else {
    // 중복 저장 시 콘솔에 로그 출력
    // console.log("Track is already saved!");
  }
}

// 저장된 트랙 UI 업데이트
function updateSavedTracksUI() {
  const savedTracksContainer = document.querySelector(".saved-tracks");
  if (!savedTracksContainer) return;

  savedTracksContainer.innerHTML = savedTracks
    .map(
      (track) => `
      <div class="saved-track__single">
        <figure>
        <img src="${track.image}" alt="${track.name}"/>
        <div></div>
        </figure>
        <span>${track.name}
        <p></p><p></p><p></p><p></p>
        </span>
      </div>
    `
    )
    .join("");

  const resultDivs = document.querySelectorAll(".saved-track__single");
  resultDivs.forEach((div) => {
    div.addEventListener("mouseover", () => {
      buttonClickSound2(); // 사운드를 재생
    });
  });
  const resultDivImgs = document.querySelectorAll("img");
  resultDivImgs.forEach((img) => {
    img.setAttribute("crossorigin", "anonymous");
  });
}

//편집 창에도 더하기
function updateToEditPopup() {
  const editPopup = document.querySelector(".edit-popup__content");
  if (!editPopup) return;
  editPopup.innerHTML = savedTracks
    .map(
      (track, index) => `
      <div class="edit-track" data-index="${index}">
        <span>${track.name}
        </span>
       <button>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path d="M6 18 18 6M6 6l12 12" />
</svg>
       </button>

      </div>
    `
    )
    .join("");

  // 버튼 클릭 이벤트 추가
  const editButtons = document.querySelectorAll(".edit-track button");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      buttonClickSound3();
      const trackIndex = button.closest(".edit-track").dataset.index;
      removeTrackFromSavedTracks(parseInt(trackIndex, 10));
    });
  });
}

// 저장된 트랙에서 제거하는 함수
function removeTrackFromSavedTracks(index) {
  // 해당 인덱스의 트랙 삭제
  if (index >= 0 && index < savedTracks.length) {
    savedTracks.splice(index, 1); // 배열에서 삭제
    updateSavedTracksUI(); // 저장된 트랙 UI 업데이트
    updateToEditPopup(); // 편집 팝업 업데이트
  }
}

// DOM 이벤트 연결
document.querySelector(".search-btn").addEventListener("click", handleSearch);
