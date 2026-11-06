// 단어 데이터: [그림 파일 이름, 영어, 한글, (읽을 소리: 영어와 다를 때만)]
// 출처: 앱/나와우리집/기획서.md 3장 (테마와 단어), 5장 (문장 규칙), 6장 (테마별 게임 배정)
// 주제 하나에 단어 5의 배수를 넣는다. 지금은 주제 6개 × 20개 = 120개 (묶음 4개씩, 묶음마다 5개).
window.A = window.A || {};

// 모든 주제가 같은 게임 8개를 같은 순서로 쓴다 (카드는 맨 위, 묻고 답하기는 맨 아래 가로 한 줄)
const ALL_GAMES = [
  ['card', 1], ['pick', 1], ['balloon', 1], ['match', 1],
  ['ox', 2], ['scratch', 2], ['maze', 3], ['qa', 3],
];

// 복수형 단어: "These are ..." 로 말한다 (기획서 5장)
const PLURAL_IDS = new Set(['footprints', 'scissors', 'bubbles', 'headphones', 'skis', 'lips', 'lungs']);

// 관사(a/an)를 붙이지 않는 셀 수 없는 말: "This is soap." (기획서 5장)
const NO_ART_IDS = new Set(['soap', 'confetti', 'yarn', 'music']);

// 문장 종류 (기획서 5장). core.js 의 A.isLine·A.askLine·A.itLine·A.whatLine·A.whereLine 이 종류대로 문장을 만든다
//  item: 몸·물건·놀이 물건·악기 → "This is a ball." / "These are skis."
//  number: 숫자 → "This is one."
//  time: 시각 → "It's one o'clock."
//  sport: 운동 이름 → "It's bowling."
//  feeling: 기분 얼굴 (주제 전체) → "This face is happy."
const NUMBER_IDS = new Set(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']);
const TIME_IDS = new Set(['oneoclock', 'twooclock', 'threeoclock', 'fouroclock', 'fiveoclock',
  'sixoclock', 'sevenoclock', 'eightoclock', 'nineoclock', 'tenoclock']);
const SPORT_IDS = new Set(['tennis', 'bowling', 'pingpong', 'badminton', 'swimming', 'hockey', 'pool']);
const kindOf = (id, themeId) => {
  if (themeId === 'feel') return 'feeling';
  if (NUMBER_IDS.has(id)) return 'number';
  if (TIME_IDS.has(id)) return 'time';
  if (SPORT_IDS.has(id)) return 'sport';
  return 'item';
};

// 화면 밖 미션 (기획서 7장). 놀이 끝 화면에 보여 준다
const BODY_MISSION = '오늘 내 몸 한 곳을 영어로 말해 보기';
const FEEL_MISSION = '오늘 내 기분을 영어로 말해 보기';
const HOUSE_MISSION = '오늘 집에서 본 물건 하나를 영어로 말해 보기';
const TOY_MISSION = '오늘 가지고 논 장난감 하나를 영어로 말해 보기';
const SPORT_MISSION = '오늘 한 운동이나 악기를 영어로 말해 보기';
const TIME_MISSION = '오늘 본 시계 시각을 영어로 말해 보기';

A.THEMES = [
  { id: 'body', ko: '몸', en: 'My Body', icon: '🧍', cover: 'heart', color: '#ffd1d1',
    games: ALL_GAMES, mission: BODY_MISSION,
    words: [
      ['eye', 'eye', '눈'], ['nose', 'nose', '코'], ['mouth', 'mouth', '입'], ['ear', 'ear', '귀'], ['hand', 'hand', '손'],
      ['foot', 'foot', '발'], ['tooth', 'tooth', '이'], ['leg', 'leg', '다리'], ['tongue', 'tongue', '혀'], ['thumb', 'thumb', '엄지'],
      ['finger', 'finger', '손가락'], ['bone', 'bone', '뼈'], ['heart', 'heart', '심장'], ['fist', 'fist', '주먹'], ['brain', 'brain', '뇌'],
      ['footprints', 'footprints', '발자국'], ['muscle', 'muscle', '근육'], ['lungs', 'lungs', '폐'], ['skull', 'skull', '머리뼈'], ['lips', 'lips', '입술'],
    ] },
  { id: 'feel', ko: '기분', en: 'Feelings', icon: '😊', cover: 'happy', color: '#ffe3a3',
    games: ALL_GAMES, mission: FEEL_MISSION,
    words: [
      ['happy', 'happy', '행복'], ['crying', 'crying', '울음'], ['angry', 'angry', '화남'], ['sleepy', 'sleepy', '졸림'], ['hot', 'hot', '더움'],
      ['love', 'in love', '사랑'], ['sick', 'sick', '아픔'], ['sad', 'sad', '슬픔'], ['scared', 'scared', '무서움'], ['excited', 'excited', '신남'],
      ['worried', 'worried', '걱정'], ['thinking', 'thinking', '생각'], ['shy', 'shy', '부끄러움'], ['yummy', 'yummy', '맛있음'], ['dizzy', 'dizzy', '어지러움'],
      ['cool', 'cool', '멋있음'], ['silly', 'silly', '엉뚱함'], ['winking', 'winking', '장난'], ['surprised', 'surprised', '놀람'], ['cold', 'cold', '추움'],
    ] },
  { id: 'house', ko: '집 안 물건', en: 'Things at Home', icon: '🏠', cover: 'bed', color: '#c9ebc3',
    games: ALL_GAMES, mission: HOUSE_MISSION,
    words: [
      ['bed', 'bed', '침대'], ['chair', 'chair', '의자'], ['door', 'door', '문'], ['toothbrush', 'toothbrush', '칫솔'], ['cup', 'cup', '컵'],
      ['mirror', 'mirror', '거울'], ['lightbulb', 'light bulb', '전등'], ['key', 'key', '열쇠'], ['soap', 'soap', '비누'], ['tv', 'TV', '텔레비전', 'tee vee'],
      ['telephone', 'telephone', '전화기'], ['bathtub', 'bathtub', '욕조'], ['scissors', 'scissors', '가위'], ['broom', 'broom', '빗자루'], ['toilet', 'toilet', '변기'],
      ['pictureframe', 'picture frame', '액자'], ['computer', 'computer', '컴퓨터'], ['trashcan', 'trash can', '쓰레기통'], ['book', 'book', '책'], ['bucket', 'bucket', '양동이'],
    ] },
  { id: 'toys', ko: '장난감·놀이', en: 'Toys and Play', icon: '🧸', cover: 'teddybear', color: '#c9dcff',
    games: ALL_GAMES, mission: TOY_MISSION,
    words: [
      ['teddybear', 'teddy bear', '곰인형'], ['puzzle', 'puzzle', '퍼즐'], ['robot', 'robot', '로봇'], ['yoyo', 'yo-yo', '요요'], ['gift', 'gift', '선물'],
      ['partypopper', 'party popper', '폭죽'], ['ribbon', 'ribbon', '리본'], ['crayon', 'crayon', '크레파스'], ['magicwand', 'magic wand', '마법봉'], ['bubbles', 'bubbles', '비눗방울'],
      ['paintbrush', 'paintbrush', '붓'], ['palette', 'palette', '물감 팔레트'], ['joystick', 'joystick', '조이스틱'], ['pencil', 'pencil', '연필'], ['confetti', 'confetti', '색종이'],
      ['headphones', 'headphones', '헤드폰'], ['camera', 'camera', '카메라'], ['radio', 'radio', '라디오'], ['yarn', 'yarn', '실'], ['duck', 'duck', '오리'],
    ] },
  { id: 'sports', ko: '운동·악기', en: 'Sports and Music', icon: '⚽', cover: 'basketball', color: '#e3d1ff',
    games: ALL_GAMES, mission: SPORT_MISSION,
    words: [
      ['basketball', 'basketball', '농구'], ['baseball', 'baseball', '야구'], ['volleyball', 'volleyball', '배구'], ['tennis', 'tennis', '테니스'], ['bowling', 'bowling', '볼링'],
      ['pingpong', 'ping pong', '탁구'], ['badminton', 'badminton', '배드민턴'], ['swimming', 'swimming', '수영'], ['drum', 'drum', '북'], ['guitar', 'guitar', '기타'],
      ['trumpet', 'trumpet', '나팔'], ['violin', 'violin', '바이올린'], ['bell', 'bell', '종'], ['skis', 'skis', '스키'], ['trophy', 'trophy', '트로피'],
      ['medal', 'medal', '메달'], ['microphone', 'microphone', '마이크'], ['music', 'music', '음악'], ['hockey', 'hockey', '아이스하키'], ['pool', 'pool', '당구'],
    ] },
  { id: 'numbers', ko: '숫자·시각', en: 'Numbers and Time', icon: '🔢', cover: 'threeoclock', color: '#ffd3b0',
    games: ALL_GAMES, mission: TIME_MISSION,
    words: [
      ['one', 'one', '하나 (1)'], ['two', 'two', '둘 (2)'], ['three', 'three', '셋 (3)'], ['four', 'four', '넷 (4)'], ['five', 'five', '다섯 (5)'],
      ['six', 'six', '여섯 (6)'], ['seven', 'seven', '일곱 (7)'], ['eight', 'eight', '여덟 (8)'], ['nine', 'nine', '아홉 (9)'], ['ten', 'ten', '열 (10)'],
      ['oneoclock', "one o'clock", '한 시'], ['twooclock', "two o'clock", '두 시'], ['threeoclock', "three o'clock", '세 시'], ['fouroclock', "four o'clock", '네 시'], ['fiveoclock', "five o'clock", '다섯 시'],
      ['sixoclock', "six o'clock", '여섯 시'], ['sevenoclock', "seven o'clock", '일곱 시'], ['eightoclock', "eight o'clock", '여덟 시'], ['nineoclock', "nine o'clock", '아홉 시'], ['tenoclock', "ten o'clock", '열 시'],
    ] },
];

// 5개씩 묶음으로 나누기 (맨 끝 묶음은 5개보다 적을 수 있음)
A.GROUP_SIZE = 5;
A.THEMES.forEach(t => {
  t.words = t.words.map(([id, en, ko, say]) => ({
    id, en, ko, say: say || en,
    kind: kindOf(id, t.id),
    art: NO_ART_IDS.has(id) ? '' : (/^[aeiou]/i.test(en) ? 'an' : 'a'),
    plural: PLURAL_IDS.has(id),
  }));
  t.groups = [];
  for (let i = 0; i < t.words.length; i += A.GROUP_SIZE) {
    t.groups.push(t.words.slice(i, i + A.GROUP_SIZE));
  }
});
