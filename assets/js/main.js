const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const cd = $('.cd')
const header = $('header h2')
const audio = $('#audio')
const cdThumbnail = $('.cd-thumb')

const playBtn = $('.btn-toggle-play')
const playList = $('.playlist')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playerSong = $('.player')
const progressSong = $('#progress')
const song = $('.song')


const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isLoop: false,
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },


    songs: [
        {
            name: 'Ai mà biết được',
            singer: 'Soobin Hoàng Sơn ft tlinh',
            path: './assets/music/song1.mp3',
            image: './assets/img/song1.png',
        },
        {
            name: 'Giá như',
            singer: 'Soobin Hoàng Sơn',
            path: './assets/music/song2.mp3',
            image: './assets/img/song2.png',
        },
        {
            name: 'Anh đã quen với cô đơn',
            singer: 'Soobin Hoàng Sơn',
            path: './assets/music/song3.mp3',
            image: './assets/img/song3.png',
        },
        {
            name: 'IFLY',
            singer: 'Bazzi',
            path: './assets/music/song4.mp3',
            image: './assets/img/song4.png',
        },
        {
            name: 'Trước khi tuổi trẻ này đóng lối',
            singer: 'Dick, Ngắn, Xám',
            path: './assets/music/song5.mp3',
            image: './assets/img/song5.png',
        },
        {
            name: 'Tấm lòng son faker',
            singer: 'H-kray',
            path: './assets/music/song6.mp3',
            image: './assets/img/song6.png',
        },
        {
            name: 'RISE',
            singer: 'Glitch Mob, Mako',
            path: './assets/music/song7.mp3',
            image: './assets/img/song7.png',
        },
        {
            name: 'Known me',
            singer: 'Gemini',
            path: './assets/music/song8.mp3',
            image: './assets/img/song8.png',
        },
        {
            name: 'Broken Love',
            singer: 'Gemini',
            path: './assets/music/song9.mp3',
            image: './assets/img/song9.png',
        },
        {
            name: 'Do me right',
            singer: 'Gemini',
            path: './assets/music/song10.mp3',
            image: './assets/img/song10.png',
        },
    ],
    loadCurrentSong: function () {
        if ($('.song.active')) {
            $('.song.active').classList.remove('active')
        }
        const currentSong = app.currentSong;
        header.textContent = currentSong.name
        audio.src = currentSong.path
        cdThumbnail.style.backgroundImage = `url('${currentSong.image}')`
        $(`#idsong-${this.currentIndex}`).classList.add('active')
        this.scrollToActiveSong()
    }
    ,
    loadNextSong: function () {
        if (this.currentIndex < this.songs.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
        audio.play()
    },
    loadPreviousSong: function () {
        if (this.currentIndex == 0) {
            this.currentIndex = this.songs.length - 1
        } else {
            this.currentIndex--;
        }
        this.loadCurrentSong();
        audio.play()
    },
    
    randomSong: function () {

        let randomIndex
        do {
            randomIndex = Math.floor(Math.random() * 10)
        } while (randomIndex === this.currentIndex);
        this.currentIndex = randomIndex;
        this.loadCurrentSong();
        audio.play()
    }
    ,
    scrollToActiveSong: function () {
        setTimeout(() => {
            if(cd.style.width == 0){
                $('.song.active').scrollIntoView({ behavior: "smooth", block: 'end' });
            }else{
                $('.song.active').scrollIntoView({ behavior: "smooth", block: 'center' });
            }
        }, 350);
    }
    ,
    render: function () {
        let html = this.songs.map(function (song, index) {
            return `
            <div id="idsong-${index}" class="song" data-index = ${index}>
                <div  class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        }).join('')
        playList.innerHTML = html
    },
    handleEventListener: function () {
        const cdOffsetWidth = cd?.offsetWidth

        //create object cd animate rotate 360 degree
        const cdThumbNailAnimation = cdThumbnail.animate({ rotate: '360deg' }, { duration: 10000, iterations: Infinity })
        cdThumbNailAnimation.pause()

        //Handle scroll
        document.onscroll = function () {
            const scroll = window.scrollY || document.documentElement.scrollTop;
            const newWidth = cdOffsetWidth - scroll

            cd.style.width = newWidth > 0 ? newWidth + "px" : 0
            cd.style.opacity = newWidth / cdOffsetWidth
        }


        //Handle play song
        audio.onplay = function () {
            app.isPlaying = true;
            playerSong.classList.add('playing');
        }

        //Handle pause song
        audio.onpause = function () {
            app.isPlaying = false;
            playerSong.classList.remove('playing');
        }

        //Next when song ended
        audio.onended = function () {
            if (app.isLoop) {
                audio.play()
                return
            }
            if (app.isRandom) {
                app.randomSong()

            } else {
                app.loadNextSong()
            }
        }


        //Handle progress bar
        audio.ontimeupdate = function () {
            if (audio.duration) {
                progressSong.value = Math.floor(audio.currentTime / audio.duration * 100)
            }
        }

        //Handle seek music bar
        progressSong.oninput = function (element) {
            const seekTime = element.target.value * (audio.duration / 100);
            audio.currentTime = seekTime
        }

        //Handle click play

        playBtn.onclick = function () {
            if (app.isPlaying) {
                audio.pause();
                cdThumbNailAnimation.pause()
            } else {
                audio.play();
                cdThumbNailAnimation.play()
            }
        }

        //Next song handle click
        nextBtn.onclick = function () {
            if (app.isRandom) {
                app.randomSong()
            } else {
                app.loadNextSong();
            }
            cdThumbNailAnimation.play()
        }

        //Previous song handle click
        prevBtn.onclick = function () {
            if (app.isRandom) {
                app.randomSong();
            } else {
                app.loadPreviousSong();
            }
            cdThumbNailAnimation.play()

        }

        //Random song handle click
        randomBtn.onclick = function () {
            app.isRandom = !app.isRandom
            this.classList.toggle('active', app.isRandom)
        }

        //Repeat song handle click
        repeatBtn.onclick = function () {
            app.isLoop = !app.isLoop
            this.classList.toggle('active', app.isLoop)
        }


        playList.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)') 
            if(songNode || e.target.closest('.option')){
                if(songNode){
                    app.currentIndex = songNode.dataset.index
                    app.loadCurrentSong()
                    audio.play()
                }
            }
        }
    }
    ,
    start: function () {
        this.defineProperties();

        this.handleEventListener();

        this.render();

        this.loadCurrentSong();

    }
}


app.start()


