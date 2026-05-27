export const GAME_STATE = {
  route: 'home',
  activeGameTab: 'story',
  api: { endpoint: '', key: '', model: 'gpt-4.1-mini', tested: false, lastMessage: '' },
  presets: [
    { id: 'campus', name: '校园成长', prompt: '你是细腻写实的校园文游引擎。对白加粗，心理活动斜体，重要信息用【】。每回合推进时间、天气、人物关系与蝴蝶效应。' },
    { id: 'xianxia', name: '修仙史诗', prompt: '你是多势力修仙世界叙事AI。每回合给出三选一，并维护境界、法宝、因果与声望。' }
  ],
  profile: {
    nickname: '林林',
    masks: [
      { id: 1, name: '林林', world: '青岚高中', role: '普通班转学生' },
      { id: 2, name: '沈昭宁', world: '灵根大陆', role: '杂灵根医修' }
    ],
    selectedMaskId: 1,
    theme: 'rose',
    globalStyle: '细腻现实向'
  },
  worlds: [{ id: 1, name: '青岚高中', genre: '校园', rule: '月度推进+事件抉择' }],
  currentWorldId: 1,
  setup: { importedRule: '', customRule: '', selectedPreset: 'campus' },
  saves: [],
  game: {
    time: '第1年·秋·9月', weather: '晴', festival: '无',
    story: '【开学第一天】你背着书包站在教学楼前，风里有桂花香。',
    options: ['先去教室报到', '绕去操场观察环境', '打开手机看看班群'],
    inventory: [{ name: '校园卡', secret: false, desc: '用于进出宿舍与食堂支付。' }, { name: '匿名信', secret: true, desc: '来自未知发件人，似乎知道你的过去。' }],
    attributes: { 体力: 5, 学习效率: 40, 社交力: 33, 金钱: 180 },
    logs: ['你抵达青岚高中。'],
    npcs: [
      { id: 101, name: '赵悦', mood: '紧张', location: '教室', favor: 7, bond: '同桌', bg: '成绩稳定，外冷内热。', appearances: 2, met: true },
      { id: 102, name: '刘欣', mood: '友善', location: '宿舍', favor: 5, bond: '舍友', bg: '性格开朗，喜欢漫画。', appearances: 3, met: false }
    ],
    relations: [{ source: '赵悦', target: '班主任王老师', type: '师生' }],
    map: [
      { id: 1, name: '教学楼', x: 38, y: 32, npcs: ['赵悦'], detail: '上课地点，信息流密集。' },
      { id: 2, name: '食堂', x: 64, y: 38, npcs: ['刘欣'], detail: '社交与补给核心区域。' }
    ],
    forumPosts: [{ user: '校园论坛管理员', text: '欢迎新生，今晚班级破冰活动。', comments: 3 }],
    chats: [{ id: 'zhaoyue', name: '赵悦', msgs: ['欢迎来我们班。', '晚自习见。'] }],
    memoryBook: [{ key: '赵悦-初遇', value: '对方对你保持观察，暂时友善。' }]
  }
};

export const saveState = () => localStorage.setItem('AI_WORLD_ENGINE_STATE', JSON.stringify(GAME_STATE));

export function loadState() {
  const raw = localStorage.getItem('AI_WORLD_ENGINE_STATE');
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    Object.assign(GAME_STATE, parsed);
  } catch {}
}
