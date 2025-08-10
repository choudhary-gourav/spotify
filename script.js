  let currentsong = new Audio();

function convertToMinutesAndSeconds(totalSeconds) {
  totalSeconds = Math.floor(totalSeconds); // 

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}




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
      play.src = "Assest/Images/pause.svg";
    }
    else{
      currentsong.pause() 
      play.src = "Assest/Images/play.svg";
    }
  })
  currentsong.addEventListener("timeupdate",()=>{
    console.log(currentsong.currentTime, currentsong.duration)
    document.querySelector(".songtime").innerHTML =`${convertToMinutesAndSeconds(currentsong.currentTime)} / ${convertToMinutesAndSeconds(currentsong.duration)}`
    document.querySelector(".circle").style.left = (currentsong.currentTime/currentsong.duration)*100 +"%"
  })

  document.querySelector(".seekbar").addEventListener("click",e=>{
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left=percent + "%";
    currentsong.currentTime = ((currentsong.duration)* percent)/100;
  })
const leftPanel = document.querySelector(".left");
document.querySelector(".hamburger").addEventListener("click", () => {
  if (leftPanel.style.left === "0%") {
    leftPanel.style.left = "-100%";
  } else {
    leftPanel.style.left = "0%";
  }
});
document.addEventListener("click", (event) => {
  const leftPanel = document.querySelector(".left");
  const hamburger = document.querySelector(".hamburger");

 
  if (!leftPanel.contains(event.target) && !hamburger.contains(event.target)) {
    leftPanel.style.left = "-100%";
  }
else if (event.target.src && event.target.src.includes("logo.svg")) {
  leftPanel.style.left = "-100%";
}
});


}
main()