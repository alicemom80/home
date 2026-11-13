// 한 번 열면 인터넷 없이도 열리도록 파일을 저장해 두는 서비스 워커
const CACHE = 'me-and-home-v12';
const CACHE_PREFIX = 'me-and-home-';   // 이 앱의 캐시만 정리한다 (같은 기기의 다른 앱 캐시는 건드리지 않는다)
const FILES = [
  './', 'index.html', 'manifest.json', 'css/style.css', 'fonts/Jua.woff2', 'libs/confetti.js',
  'js/app.config.js', 'js/data.js', 'js/scenes.js', 'js/core.js', 'js/games1.js', 'js/games2.js',
  'js/games3.js', 'js/stickers.js', 'js/parent.js', 'js/start.js', 'js/app.js', 'sounds/correct.mp3',
  'sounds/pop.mp3', 'sounds/sparkle.mp3', 'sounds/tap.mp3', 'sounds/try-again.mp3', 'sounds/win.mp3', 'icons/icon-192.png',
  'icons/icon-512.png', 'images/bg/beach.webp', 'images/bg/body.webp', 'images/bg/farm.webp', 'images/bg/feel.webp', 'images/bg/forest.webp',
  'images/bg/home.webp', 'images/bg/house.webp', 'images/bg/night.webp', 'images/bg/numbers.webp', 'images/bg/savanna.webp', 'images/bg/sports.webp',
  'images/bg/toys.webp', 'images/angry.webp', 'images/badminton.webp', 'images/baseball.webp', 'images/basketball.webp', 'images/bathtub.webp',
  'images/bed.webp', 'images/bell.webp', 'images/bone.webp', 'images/book.webp', 'images/bowling.webp', 'images/brain.webp',
  'images/broom.webp', 'images/bubbles.webp', 'images/bucket.webp', 'images/camera.webp', 'images/chair.webp', 'images/cold.webp',
  'images/computer.webp', 'images/confetti.webp', 'images/cool.webp', 'images/crayon.webp', 'images/crying.webp', 'images/cup.webp',
  'images/dizzy.webp', 'images/door.webp', 'images/drum.webp', 'images/duck.webp', 'images/ear.webp', 'images/eight.webp',
  'images/eightoclock.webp', 'images/elephant.webp', 'images/excited.webp', 'images/eye.webp', 'images/finger.webp', 'images/fist.webp',
  'images/five.webp', 'images/fiveoclock.webp', 'images/foot.webp', 'images/footprints.webp', 'images/four.webp', 'images/fouroclock.webp',
  'images/gift.webp', 'images/girl.webp', 'images/guitar.webp', 'images/hand.webp', 'images/happy.webp', 'images/headphones.webp',
  'images/heart.webp', 'images/hockey.webp', 'images/hot.webp', 'images/joystick.webp', 'images/key.webp', 'images/leg.webp',
  'images/lightbulb.webp', 'images/lips.webp', 'images/love.webp', 'images/lungs.webp', 'images/magicwand.webp', 'images/medal.webp',
  'images/microphone.webp', 'images/mirror.webp', 'images/mouth.webp', 'images/muscle.webp', 'images/music.webp', 'images/nine.webp',
  'images/nineoclock.webp', 'images/nose.webp', 'images/one.webp', 'images/oneoclock.webp', 'images/paintbrush.webp', 'images/palette.webp',
  'images/partypopper.webp', 'images/pencil.webp', 'images/pictureframe.webp', 'images/pingpong.webp', 'images/pool.webp', 'images/puzzle.webp',
  'images/radio.webp', 'images/ribbon.webp', 'images/robot.webp', 'images/sad.webp', 'images/scared.webp', 'images/scissors.webp',
  'images/seven.webp', 'images/sevenoclock.webp', 'images/shy.webp', 'images/sick.webp', 'images/silly.webp', 'images/six.webp',
  'images/sixoclock.webp', 'images/skis.webp', 'images/skull.webp', 'images/sleepy.webp', 'images/soap.webp', 'images/surprised.webp',
  'images/swimming.webp', 'images/teddybear.webp', 'images/telephone.webp', 'images/ten.webp', 'images/tennis.webp', 'images/tenoclock.webp',
  'images/thinking.webp', 'images/three.webp', 'images/threeoclock.webp', 'images/thumb.webp', 'images/toilet.webp', 'images/tongue.webp',
  'images/tooth.webp', 'images/toothbrush.webp', 'images/trashcan.webp', 'images/trophy.webp', 'images/trumpet.webp', 'images/tv.webp',
  'images/two.webp', 'images/twooclock.webp', 'images/violin.webp', 'images/volleyball.webp', 'images/winking.webp', 'images/worried.webp',
  'images/yarn.webp', 'images/yoyo.webp', 'images/yummy.webp',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith(CACHE_PREFIX) && k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  // 인터넷이 되면 최신 파일, 안 되면 저장해 둔 파일을 쓴다
  e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(res => {   // 브라우저가 저장해 둔 옛 파일 대신 늘 새 파일을 확인한다
    if (res.ok && new URL(e.request.url).origin === location.origin) {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
    }
    return res;
  }).catch(() => caches.match(e.request)));
});
