const songs = [
    {
        title: "we are the people",
        file: "songs/song1.mp3",
        cover: "we are the people.jpg"
    },
    {
        title: "Feel Good Inc",
        file: "songs/song2.mp3",
        cover: "Feel good.jpg"
    },
    {
        title: "Pink + White",
        file: "songs/song3.mp3",
        cover: "pink + white.png"
    }
];
const audio = document.getElementById("audio");
const title = document.getElementById("song-title");
const cover = document.getElementById("song-cover");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const albumArt = document.getElementById("album-art");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const volumeSlider = document.getElementById("volume");

let currentSong = 0;

function loadSong(index)
{
    audio.src = songs[index].file;
    title.textContent = songs[index].title;
    //cover.src = songs[index].cover;
    albumArt.src = songs[index].cover;
}

loadSong(currentSong);


let isPlaying = false;

playBtn.addEventListener("click", () => {

    if(isPlaying)
    {
        audio.pause();
        playBtn.textContent = "▶";
        albumArt.classList.remove("spin");
    }
    else
    {
        audio.play();
        playBtn.textContent = "⏸";
        albumArt.classList.add("spin");
    }

    isPlaying = !isPlaying;
});

nextBtn.addEventListener("click", () => {

    currentSong++;

    if(currentSong >= songs.length)
    {
        currentSong = 0;
    }

    loadSong(currentSong);

    audio.play();
     
    

    playBtn.textContent = "⏸";
    isPlaying = true;
});

prevBtn.addEventListener("click", () => {

    currentSong--;

    if(currentSong < 0)
    {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

    audio.play();

    playBtn.textContent = "⏸";
    isPlaying = true;
});

volumeSlider.addEventListener("input", () => {

    audio.volume = volumeSlider.value;

});
audio.addEventListener("ended", () => {

    currentSong++;

    if(currentSong >= songs.length)
    {
        currentSong = 0;
    }

    loadSong(currentSong);
    audio.play();

});
function formatTime(seconds){

    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);

    if(secs < 10){
        secs = "0" + secs;
    }

    return `${mins}:${secs}`;
}
audio.addEventListener("loadedmetadata", () => {

    durationEl.textContent =
        formatTime(audio.duration);

});
audio.addEventListener("timeupdate", () => {

    const progressPercent =
        (audio.currentTime / audio.duration) * 100;

    progress.value = progressPercent;

    currentTimeEl.textContent =
        formatTime(audio.currentTime);

});
progress.addEventListener("input", () => {

    audio.currentTime =
        (progress.value / 100) * audio.duration;

});
