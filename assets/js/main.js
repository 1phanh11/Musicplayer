const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const app = {
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
    render: function () {
        let html = this.songs.map(function (song) {
            return`
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
    start: function () {
        this.render();
    }
}


app.start()


