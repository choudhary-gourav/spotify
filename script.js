  let currentsong = new Audio();

async function fetchSongs() {
  try {
    const res = await fetch("http://127.0.0.1:3000/songs/");
    const html = await res.text();

    const container = document.createElement("div");
    container.innerHTML = html;

    const links = container.getElementsByTagName("a");
    const songs = [];

    for (let link of links) {
      if (link.href.endsWith(".mp3")) {
        songs.push(link.href.split("/songs/")[1]);
      }
    }

    console.log("Fetched Songs:", songs);
    return songs;

  } catch (error) {
    console.error("Failed to fetch songs:", error);
    return [];
  }
}
const playmusic = (track)=>{
  currentsong.src = /songs/ + track
  currentsong.play();
  document.querySelector(".songinformation").innerHTML = track.replace("hindi songs/", "")
      .replace(/\(.*?\)/g, "")
      .replace(/www\.[^\s]+/g, "")
      .replace(/[_\-]+/g, " ")
      .replace(/\.mp3$/i, "")
      .replace(/^\d{1,2}\s*[\.\-\_]?/, "")
      .replace(/\s+/g, " ")
      .replaceAll("%20", " ");
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00"
  
}
async function main() {

  let songs = await fetchSongs();
  console.log(songs);

  let songUL = document.querySelector(".songlist ul");
  songUL.innerHTML = ""; // clear existing

  for (const song of songs) {
    const cleanedSongName = song
      .replace("hindi songs/", "")
      .replace(/\(.*?\)/g, "")
      .replace(/www\.[^\s]+/g, "")
      .replace(/[_\-]+/g, " ")
      .replace(/\.mp3$/i, "")
      .replace(/^\d{1,2}\s*[\.\-\_]?/, "")
      .replace(/\s+/g, " ")
      .replaceAll("%20", " ")
      .trim();

    songUL.innerHTML += `
      <li data-file="${song}">
        <img src="Assest/Images/music.svg" alt="">
        <div class="songinfo">
          <div class="songname">${cleanedSongName}</div>
          <div class="songArtist">Gourav Choudhary</div>
        </div>
      </li>`;
  }

  // Add click event to each <li>
  document.querySelectorAll(".songlist li").forEach(e => {
    e.addEventListener("click", () => {
      const actualFile = e.getAttribute("data-file");
      console.log("Playing:", actualFile);
      playmusic(actualFile);
    });
  });
  play.addEventListener("click",()=>{
    if(currentsong.paused){
      currentsong.play()
    }
    else{
      currentsong.pause()
    }
  })

}
main()