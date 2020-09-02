import './style.css'
import sw from './sw.js'

const images = document.querySelectorAll('.images');

const data = [
    { text: "Bob Dylan", src: 'https://media4.s-nbcnews.com/j/newscms/2016_21/1550126/ss-160524-bob-dylan-mn-02_12e608d20b1f1338478994d0382200c3.fit-760w.jpg' },
    { text: "Jim Morrison", src: 'https://www.theargus.co.uk/resources/images/11292243/?type=responsive-gallery' },
    { text: "Pink Floyd", src: 'https://chezzachooun.files.wordpress.com/2018/08/unnamed.jpg' },
    { text: "The Beatles", src: 'https://cdn.britannica.com/18/136518-050-CD0E49C6/The-Beatles-Ringo-Starr-Paul-McCartney-George.jpg' },
    { text: "Freddie Mercury", src: 'https://cdn.britannica.com/38/200938-050-E22981D1/Freddie-Mercury-Live-Aid-Queen-Wembley-Stadium-July-13-1985.jpg' },
    { text: "Neil Young", src: 'https://static.billboard.com/files/media/neil-young-1976-u-billboard-1548-1024x677.jpg' },
    { text: "Jimi Hendrix", src: 'https://d28vr35rno8k21.cloudfront.net/images/F_hendrix_banner.png' },
    { text: "Led Zeppelin", src: 'https://www.ledzeppelin.com/sites/g/files/g2000006376/f/201905/Led-Zeppelin-by-Dick-Barnatt---Redferns_London_December-1968_Getty-Images_3.jpg' },
    { text: "Rolling Stones", src: 'https://www.rollingstone.com/wp-content/uploads/2018/06/rs-6094-rectangle.jpg?resize=1800,1200&w=1800' },
    { text: "Elvis Presley", src: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Elvis_Presley_1970.jpg' },
    { text: "Guns N' Roses", src: 'https://www.biography.com/.image/t_share/MTcyNTI4NDc2MDM5OTQ3MzQ3/guns-n-roses-gettyimages-535921600.jpg' },
    { text: "U2", src: 'https://crokepark.ie/BlankSite/media/4-panel-images/U2.jpg?ext=.jpg' },
    { text: "Queen", src: 'https://s.yimg.com/ny/api/res/1.2/2bN2.m4SJ_1tg5iRyz0_WQ--~A/YXBwaWQ9aGlnaGxhbmRlcjtzbT0xO3c9NjcwO2g9NTA5/http://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/84114ff946a640a0de28a389d430ed34' },
    { text: "Paul McCartney", src: 'https://celebwiki.org/wp-content/uploads/2019/03/paul-mccartney_230964.jpeg' },
    { text: "John Lennon", src: 'https://i.ytimg.com/vi/YkgkThdzX-8/hqdefault.jpg' },
];

const shuffled = (array) => array.sort(() => 0.5 - Math.random());
const getRandomElements = (array, n) => shuffled(array).slice(0, n);
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createGame = () => {
    const selectedData = getRandomElements(data, images.length);
    const selected = selectedData[getRandomInt(0, selectedData.length - 1)];

    images.forEach((img, index) => {
        img.src = selectedData[index].src;
        img.text = selectedData[index].text;
        img.onclick = (el1) => {
            const right = selected.text === el1.target.text;
            const say = `${right ? 'right' : 'wrong'}. it is ${el1.target.text}`;
            let utterance = new SpeechSynthesisUtterance(say);
            speechSynthesis.speak(utterance);
            if (right) createGame();
        }
    });

    const header = document.getElementById('header');
    header.textContent = selected.text;

    const playButton = document.getElementById('play-button');
    playButton.onclick = () => {
        let utterance = new SpeechSynthesisUtterance(selected.text);
        speechSynthesis.speak(utterance);
    };
};

createGame();

// Register service worker to control making site work offline

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register(sw)
        .then(function () { console.log('Service Worker Registered'); });
}

// Code to handle install prompt on desktop

// let deferredPrompt;
// const addBtn = document.querySelector('.add-button');
// addBtn.style.display = 'none';

// window.addEventListener('beforeinstallprompt', (e) => {
//     // Prevent Chrome 67 and earlier from automatically showing the prompt
//     e.preventDefault();
//     // Stash the event so it can be triggered later.
//     deferredPrompt = e;
//     // Update UI to notify the user they can add to home screen
//     addBtn.style.display = 'block';

//     addBtn.addEventListener('click', (e) => {
//         // hide our user interface that shows our A2HS button
//         addBtn.style.display = 'none';
//         // Show the prompt
//         deferredPrompt.prompt();
//         // Wait for the user to respond to the prompt
//         deferredPrompt.userChoice.then((choiceResult) => {
//             if (choiceResult.outcome === 'accepted') {
//                 console.log('User accepted the A2HS prompt');
//             } else {
//                 console.log('User dismissed the A2HS prompt');
//             }
//             deferredPrompt = null;
//         });
//     });
// });
