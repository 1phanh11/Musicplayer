const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const cd = $('.cd')
const header = $('header h2')
const audio = $('#audio')
const cdThumbnail = $('.cd-thumb')
const playBtn = $('.btn-toggle-play')

const app = {
    currentIndex: 0,
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
        const html = function () {
            const currentSong = app.currentSong;
           

            header.textContent = currentSong.name
            audio.src = currentSong.path
            cdThumbnail.style.backgroundImage = `url('${currentSong.image}')`

            
        }
        html()
        // $('.dashboard').innerHTML = html
    }
    ,
    render: function () {
        let html = this.songs.map(function (song) {
            return `
            <div class="song">
                <div class="thumb" style="background-image: url('${song.image}')">
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
        $('.playlist').innerHTML = html
    },
    handleEventListener: function () {
        const cdOffsetWidth = cd?.offsetWidth

        //Handle scroll
        document.onscroll = function () {
            const scroll = window.scrollY || document.documentElement.scrollTop;
            const newWidth = cdOffsetWidth - scroll

            cd.style.width = newWidth > 0 ? newWidth + "px" : 0
            cd.style.opacity = newWidth / cdOffsetWidth
        }

        //Handle click play
    }
    ,
    start: function () {
        this.defineProperties();

        this.handleEventListener();

        this.loadCurrentSong();

        this.render();


    }
}


app.start()


