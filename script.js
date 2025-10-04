async function getsongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let response = await a.text();
  console.log(response);

  let div = document.createElement("div");
  div.innerHTML = response;

  let links = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < links.length; index++) {
    const element = links[index];
    if (element.href.endsWith("mp3")) {
      songs.push(element.href);
    }
  }
  return songs;
}
async function main() {
  let songs = await getsongs();
  console.log(songs);
  let songUL=document.querySelector(".songlist").getElementsByTagName("ul")[0]
  // for (const song of songs) {
  //   songUL.innerHTML=songUL.innerHTML+`<li>${song.replaceAll("%20", " ")}</li>`;
    
  // }
for (const song of songs) {
  // ✅ Take only filename part
  let songName = song.split("/").pop();
  // ✅ Decode %20 etc.
  songName = decodeURIComponent(songName);
  // ✅ Remove [iSongs.info] if present
  songName = songName.replace("[iSongs.info]", "").trim();
  // ✅ Remove leading track numbers like "01 - "
  songName = songName.replace(/^\d+\s*-\s*/, "");

  songUL.innerHTML += `
    <li>
      <img class="musiccard" src="music.svg" alt="">
      <div class="info">
        <div>${songName}</div>
        <div>Raju</div>
      </div>
      <div class="playnow">
        <img src="pay2.svg" alt="">
      </div>
    </li>`;
}



  // play songs
  var audio = new Audio(songs[0]);
  // audio.play();
  audio.addEventListener("lodeddata", () => {
    let duration = (audio.duration, audio.currentSrc, audio.currentTime);
    console.log(duration);
  });
}
main();
