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
async function main() {
    let songs = await fetchSongs()
    console.log(songs)
   let songUL= document.querySelector(".songlist").getElementsByTagName("ul")[0]
   for (const song of songs) {
    
    songUL.innerHTML=songUL.innerHTML +  `<li>
                <img src="Assest/music.svg" alt="">
                <div class="songinfo">
                  <div class="songname">${song.replace("hindi songs/", "")            
    .replace(/\(.*?\)/g, "")               
    .replace(/www\.[^\s]+/g, "")            
    .replace(/[_\-]+/g, " ")                
    .replace(/\.mp3$/i, "")                 
    .replace(/^\d{1,2}\s*[\.\-\_]?/, "")   
    .replace(/\s+/g, " ")    
    .replaceAll("%20"," ")               
    .trim()}</div>
                  <div class="songArtist">Gourav Choudhary</div>
                </div>
                
              </li>`;
 }
     var audio = new Audio(songs[0]);
     audio.play()
}
main()