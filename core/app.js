const STORAGE_KEY = {
  API: 'awe-api', SETTINGS: 'awe-settings', MASKS: 'awe-masks', FORUM: 'awe-forum', LOCATIONS: 'awe-locations',
  SAVES: 'awe-saves', CHATS: 'awe-chats', APPS: 'awe-apps'
};
const BUILD_INFO = { version: '2026-05-27-2', note: 'runtime-hints-visible' };

const state = {
  api: { endpoint: '', key: '', model: '', ok: false },
  presetsRaw: '', settings: { style: '现代细腻', memory: true, holidays: ['新年', '中秋'] },
  masks: [{ id: 1, name: '观察者', world: '霓虹雨城' }], activeMask: 1, page: 'home', gameReady: false, storyLoading: false,
  npcs: [{ id: 1, name: '沈辞', mood: '审视', bg: '财团继承人', tags: ['高冷', '理性'] }, { id: 2, name: '林镜', mood: '愉悦', bg: '艺术生', tags: ['敏感', '偏执'] }],
  relationLinks: [{ from: '沈辞', to: '林镜', type: '竞争+旧识' }, { from: '沈辞', to: '沈家', type: '家族' }],
  locations: [{ name: '雾桥站', x: 28, y: 40, mood: '紧张', npcs: ['沈辞'] }],
  forum: [{ user: '系统播报', text: '今夜全城暴雨橙色预警。' }],
  saves: [{ id: 1, name: '自动存档', time: new Date().toLocaleString('zh-CN'), snapshot: null }],
  chats: { '沈辞': [{ me: false, text: '到站后别抬头，先观察人群。' }] },
  apps: ['聊天', '相册', '备忘录', '地图', '论坛'],
  story: { title: '第一夜：失序来电', content: '<b>沈辞：</b>“你终于来了，时间比雨更贵。”<br><i>我看见他袖口沾着血，却像刚参加完晚宴。</i><br>你收到提示：属性【洞察+1】、物品【匿名SIM卡】。', options: ['追问血迹来源', '先观察周围', '接听匿名电话'] }
};

const page = document.getElementById('page-container');
const nav = document.getElementById('bottom-nav');
document.getElementById('profile-entry').innerHTML = icon('user');
document.getElementById('profile-entry').onclick = () => navigate('profile');

init();
async function init() { hydrate(); await loadPreset(); render(); }

function hydrate() {
  try {
    const read = (k, d) => JSON.parse(localStorage.getItem(k) || 'null') ?? d;
    state.api = { ...state.api, ...read(STORAGE_KEY.API, {}) };
    state.settings = { ...state.settings, ...read(STORAGE_KEY.SETTINGS, {}) };
    state.masks = read(STORAGE_KEY.MASKS, state.masks);
    state.forum = read(STORAGE_KEY.FORUM, state.forum);
    state.locations = read(STORAGE_KEY.LOCATIONS, state.locations);
    state.saves = read(STORAGE_KEY.SAVES, state.saves);
    state.chats = read(STORAGE_KEY.CHATS, state.chats);
    state.apps = read(STORAGE_KEY.APPS, state.apps);
  } catch (e) { console.warn(e); }
}
function persist() {
  Object.entries({ [STORAGE_KEY.API]: state.api, [STORAGE_KEY.SETTINGS]: state.settings, [STORAGE_KEY.MASKS]: state.masks, [STORAGE_KEY.FORUM]: state.forum, [STORAGE_KEY.LOCATIONS]: state.locations, [STORAGE_KEY.SAVES]: state.saves, [STORAGE_KEY.CHATS]: state.chats, [STORAGE_KEY.APPS]: state.apps }).forEach(([k, v]) => localStorage.setItem(k, JSON.stringify(v)));
}

function navigate(name) { state.page = name; render(); }
window.navigate = navigate;

const labels = { story: '剧情', profile: '个人', relation: '关系', map: '地图', forum: '论坛', settings: '设置' };
function render() { page.innerHTML = (views[state.page] || views.home)(); renderNav(); bindEvents(); }
function renderNav() { nav.innerHTML = ['story', 'profile', 'relation', 'map', 'forum', 'settings'].map(t => `<button class="tab ${state.page === t ? 'active' : ''}" onclick="navigate('${t}')">${icon(t)}<span>${labels[t]}</span></button>`).join(''); }

function runtimeHints() {
  const isFile = location.protocol === 'file:';
  const origin = location.origin === 'null' ? 'file:// 本地文件模式' : location.origin;
  return {
    isFile,
    origin,
    tips: [
      '在项目目录运行：python3 -m http.server 5173',
      '浏览器访问：http://127.0.0.1:5173（比 localhost 更稳定）',
      '若仍打不开：尝试 python -m http.server 5173 或改用端口 8080'
    ]
  };
}

const views = {
  home: () => {
    const rt = runtimeHints();
    return `<section class='card'><h1>AI文游大厅</h1><p>先配API并测试，再创建世界进入文游。</p><p class='build'>前端版本：<code>${BUILD_INFO.version}</code> · ${BUILD_INFO.note}</p><div class='status-row'><span class='badge ${state.api.ok ? 'ok' : ''}'>API：${state.api.ok ? '已连通' : '未连通'}</span><span class='badge ${state.gameReady ? 'ok' : ''}'>世界：${state.gameReady ? '已创建' : '未创建'}</span></div><div class='grid2'>${action('api', 'API配置', '端点/密钥/模型')} ${action('create', '创建世界', '导入规则并生成')} ${action('profile', '个人与存档', '面具/存档管理')} ${action('story', '进入剧情', '需要API连通')}</div></section><section class='card'><h3>如何打开 UI</h3><p class='hint'>当前访问来源：<code>${escapeHtml(rt.origin)}</code></p>${rt.isFile ? "<p class='warn'>你现在是直接双击打开文件（file://），请先启动本地HTTP服务再访问。</p>" : ''}<ol class='steps'>${rt.tips.map(t => `<li>${t}</li>`).join('')}</ol></section>`;
  },
  api: () => `<section class='card'><h2>API配置</h2><input id='ep' class='input' placeholder='API端点' value='${escapeHtml(state.api.endpoint)}'><input id='key' type='password' class='input' placeholder='API密钥' value='${escapeHtml(state.api.key)}'><input id='model' class='input' placeholder='模型别名' value='${escapeHtml(state.api.model)}'><button id='save-api' class='button'>保存配置</button><button id='test-api' class='button ghost'>测试连通</button><p class='hint'>状态：${state.api.ok ? '✅ 已连通' : '⚠️ 未验证'}</p></section>`,
  create: () => `<section class='card'><h2>创建/导入世界</h2><textarea id='rule' class='input' style='height:180px'>${escapeHtml(state.presetsRaw)}</textarea><button id='build-game' class='button'>生成游戏大厅</button></section>`,
  story: () => !state.gameReady ? `<section class='card'><h2>尚未开始</h2><p>请先在API页完成连通，再在创建页生成世界。</p></section>` : `<section class='card'><h2>${state.story.title}</h2><div class='story'>${state.story.content}</div>${state.storyLoading ? "<p class='hint'>剧情生成中，请稍候...</p>" : ''}${state.story.options.map((o, i) => `<button class='option' ${state.storyLoading ? 'disabled' : ''} onclick='chooseOpt(${i})'>${i + 1}. ${o}</button>`).join('')}</section>`,
  profile: () => `<section class='card'><h2>个人中心 / 面具 / 存档</h2><p>当前面具：${state.masks.find(m => m.id === state.activeMask)?.name || '未选择'}</p><div class='chips'>${state.masks.map(m => `<button class='chip' onclick='switchMask(${m.id})'>${m.name} · ${m.world}</button>`).join('')}</div><button id='add-mask' class='button ghost'>新增面具角色</button><hr><h3>存档系统</h3><input id='save-name' class='input' placeholder='存档名称'><button id='create-save' class='button'>新建存档</button><div>${state.saves.map(s => `<div class='list'><b>${s.name}</b><p>${s.time}</p><button class='mini' onclick='loadSave(${s.id})'>读取</button> <button class='mini' onclick='deleteSave(${s.id})'>删除</button></div>`).join('')}</div><button id='export-save' class='button ghost'>导出当前状态JSON</button><textarea id='import-json' class='input' placeholder='粘贴JSON导入存档'></textarea><button id='import-save' class='button ghost'>导入并覆盖当前</button></section>`,
  relation: () => `<section class='card'><h2>关系表 + 家族树</h2>${state.npcs.map(n => `<div class='list'><b>${n.name}</b>｜${n.bg}｜心情:${n.mood}<br>标签：${n.tags.join(' / ')}<br><button class='mini' onclick="npcInteract('${n.name}')">交互</button> <button class='mini' onclick="openPhone('${n.name}')">NPC手机</button></div>`).join('')}<h3>关系圈</h3>${state.relationLinks.map(r => `<div class='list'>${r.from} → ${r.to}（${r.type}）</div>`).join('')}</section>`,
  map: () => `<section class='card'><h2>地图</h2><p>点击空白地图新增地点；或一键AI生成5个地点。</p><button id='gen-places' class='button ghost'>AI生成5个地点</button><div id='map' class='map'>${state.locations.map(l => `<span class='pin' data-pin='1' style='left:${l.x}%;top:${l.y}%' title='${l.name}'>${l.name}</span>`).join('')}</div></section>`,
  forum: () => `<section class='card'><h2>论坛</h2>${state.forum.map(p => `<div class='list'><b>${p.user}</b><p>${p.text}</p><button class='mini'>评论</button> <button class='mini'>私信</button></div>`).join('')}<textarea id='post' class='input' placeholder='发帖内容'></textarea><button id='send-post' class='button'>发布</button></section>`,
  settings: () => `<section class='card'><h2>全局设置</h2><label><input type='checkbox' id='mem' ${state.settings.memory ? 'checked' : ''}/> 长期记忆</label><input id='style' class='input' value='${escapeHtml(state.settings.style)}'><input id='holidays' class='input' value='${escapeHtml(state.settings.holidays.join('，'))}'><button id='save-settings' class='button'>保存设置</button><button id='reset' class='button ghost'>恢复初始</button></section>`,
  phone: () => {
    const npc = state.phoneNpc;
    const chat = state.chats[npc] || [];
    const apps = state.apps.filter(a => a.includes(state.appQuery || ''));
    return `<section class='card'><h2>${npc} 的手机</h2><div class='phone-top'><input id='app-search' class='input' placeholder='搜索应用' value='${escapeHtml(state.appQuery || '')}'></div><div class='chips'>${apps.map(a => `<span class='chip'>${a}</span>`).join('')}</div><h3>私信（类微信）</h3><div class='chat-box'>${chat.map(c => `<p class='${c.me ? 'me' : 'npc'}'>${c.me ? '你' : npc}：${escapeHtml(c.text)}</p>`).join('')}</div><input id='chat-input' class='input' placeholder='发送消息'><button id='send-chat' class='button'>发送</button><button class='button ghost' onclick="navigate('relation')">返回关系表</button></section>`;
  }
};

function bindEvents() {
  document.getElementById('save-api')?.addEventListener('click', saveApi);
  document.getElementById('test-api')?.addEventListener('click', testApi);
  document.getElementById('build-game')?.addEventListener('click', buildGame);
  document.getElementById('add-mask')?.addEventListener('click', addMask);
  document.getElementById('map')?.addEventListener('click', addLocationFromMapClick);
  document.getElementById('gen-places')?.addEventListener('click', generatePlaces);
  document.getElementById('send-post')?.addEventListener('click', sendPost);
  document.getElementById('save-settings')?.addEventListener('click', saveSettings);
  document.getElementById('reset')?.addEventListener('click', () => location.reload());
  document.getElementById('create-save')?.addEventListener('click', createSave);
  document.getElementById('export-save')?.addEventListener('click', exportSave);
  document.getElementById('import-save')?.addEventListener('click', importSave);
  document.getElementById('app-search')?.addEventListener('input', (e) => { state.appQuery = e.target.value; render(); });
  document.getElementById('send-chat')?.addEventListener('click', sendChat);
}

function saveApi() { state.api.endpoint = val('ep'); state.api.key = val('key'); state.api.model = val('model'); persist(); alert('API配置已保存'); }
async function testApi() { if (!state.api.endpoint || !state.api.key || !state.api.model) return alert('请先完整填写API端点/密钥/模型'); try { const resp = await fetch(state.api.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${state.api.key}` }, body: JSON.stringify({ model: state.api.model, messages: [{ role: 'user', content: 'ping' }], max_tokens: 5 }) }); state.api.ok = resp.ok; } catch { state.api.ok = false; } persist(); render(); }
function buildGame() { state.presetsRaw = val('rule'); state.gameReady = state.api.ok; if (!state.gameReady) return alert('请先测试API连通'); navigate('story'); }
function addMask() { state.masks.push({ id: Date.now(), name: `新面具${state.masks.length + 1}`, world: '未绑定世界' }); persist(); render(); }
function addLocationFromMapClick(e) { if (e.target.closest('[data-pin]')) return; const rect = e.currentTarget.getBoundingClientRect(); const x = Number(((e.clientX - rect.left) / rect.width * 100).toFixed(1)); const y = Number(((e.clientY - rect.top) / rect.height * 100).toFixed(1)); const name = prompt('地点名称'); if (!name) return; state.locations.push({ name, x, y, mood: '平静', npcs: [] }); persist(); render(); }
function generatePlaces() { const base = ['夜港', '银塔', '旧巷', '高架', '学院', '中央站']; for (let i = 0; i < 5; i++) state.locations.push({ name: `${base[(Math.random() * base.length) | 0]}-${(Math.random() * 99) | 0}`, x: (10 + Math.random() * 80).toFixed(1), y: (10 + Math.random() * 80).toFixed(1), mood: ['平静', '紧张', '喧闹'][(Math.random() * 3) | 0], npcs: [] }); persist(); render(); }
function sendPost() { const v = val('post'); if (!v) return; state.forum.unshift({ user: '你', text: v }); persist(); render(); }
function saveSettings() { state.settings.memory = document.getElementById('mem').checked; state.settings.style = val('style'); state.settings.holidays = val('holidays').split('，').map(s => s.trim()).filter(Boolean); persist(); alert('设置已保存'); }

function createSave() { const name = val('save-name') || `存档${state.saves.length + 1}`; const snapshot = JSON.parse(JSON.stringify({ api: state.api, settings: state.settings, masks: state.masks, activeMask: state.activeMask, gameReady: state.gameReady, npcs: state.npcs, relationLinks: state.relationLinks, locations: state.locations, forum: state.forum, chats: state.chats, story: state.story })); state.saves.unshift({ id: Date.now(), name, time: new Date().toLocaleString('zh-CN'), snapshot }); persist(); render(); }
window.loadSave = (id) => { const s = state.saves.find(x => x.id === id); if (!s?.snapshot) return alert('该存档无快照'); Object.assign(state, JSON.parse(JSON.stringify(s.snapshot))); persist(); alert(`已读取：${s.name}`); render(); };
window.deleteSave = (id) => { state.saves = state.saves.filter(s => s.id !== id); persist(); render(); };
function exportSave() { const text = JSON.stringify({ state }, null, 2); navigator.clipboard?.writeText(text); alert('已复制当前状态JSON到剪贴板'); }
function importSave() { try { const raw = val('import-json'); const obj = JSON.parse(raw); if (!obj.state) throw new Error(); Object.assign(state, obj.state); persist(); render(); } catch { alert('JSON格式错误'); } }

window.chooseOpt = async (i) => {
  const option = state.story.options[i];
  if (!option || state.storyLoading) return;
  if (!state.api.ok) return alert('请先在API页测试连通后再推进剧情');
  state.storyLoading = true;
  render();
  try {
    const next = await generateStory(option);
    state.story = next;
    persist();
    render();
  } catch (e) {
    console.warn(e);
    alert('剧情生成失败，请检查API配置或稍后重试');
  } finally {
    state.storyLoading = false;
    render();
  }
};
window.switchMask = (id) => { state.activeMask = id; persist(); render(); };
window.npcInteract = (name) => alert(`${name}回应：已收到你的交互请求，关系变化将同步到剧情与地图。`);
window.openPhone = (name) => { state.phoneNpc = name; state.appQuery = ''; navigate('phone'); };
function sendChat() { const npc = state.phoneNpc; if (!npc) return; const msg = val('chat-input'); if (!msg) return; state.chats[npc] ||= []; state.chats[npc].push({ me: true, text: msg }, { me: false, text: `已收到：${msg}。我会留意。` }); persist(); render(); }


async function generateStory(choice) {
  const payload = {
    model: state.api.model,
    messages: [{ role: 'user', content: `当前标题：${state.story.title}
当前剧情：${state.story.content.replace(/<[^>]+>/g, ' ')}
玩家选择：${choice}
请续写下一幕，返回JSON：{"title":"","content":"","options":["","",""]}` }],
    temperature: 0.8,
    max_tokens: 500
  };
  const resp = await fetch(state.api.endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${state.api.key}` },
    body: JSON.stringify(payload)
  });
  if (!resp.ok) throw new Error(`story api failed: ${resp.status}`);
  const data = await resp.json();
  const raw = data?.choices?.[0]?.message?.content || data?.output_text || '';
  const parsed = parseStoryResponse(raw);
  return {
    title: parsed.title || `下一幕：${choice}`,
    content: (parsed.content || String(raw || '').trim() || `你选择了“${choice}”，但剧情引擎没有返回有效内容。`).replaceAll('\n', '<br>'),
    options: Array.isArray(parsed.options) && parsed.options.length ? parsed.options.slice(0, 4) : ['继续追问', '暂时观察', '转换话题']
  };
}

function parseStoryResponse(raw) {
  if (!raw) return {};
  const text = String(raw).trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const jsonText = (fence?.[1] || text).trim();
  try { return JSON.parse(jsonText); } catch {}
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start >= 0 && end > start) {
    try { return JSON.parse(text.slice(start, end + 1)); } catch {}
  }
  return { content: text };
}

async function loadPreset() { try { state.presetsRaw = (await fetch('./presets/default-prompt.txt').then(r => r.text())).trim(); } catch { state.presetsRaw = '你是剧情引擎...'; } }

const val = (id) => (document.getElementById(id)?.value || '').trim();
function action(route, title, desc) { return `<button class='quick' onclick="navigate('${route}')"><h3>${title}</h3><p>${desc}</p></button>`; }
function escapeHtml(t) { return String(t).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;'); }
function icon(name) { const s = { user: '<svg viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.4 0-8 2-8 4.5V21h16v-2.5C20 16 16.4 14 12 14Z"/></svg>', story: '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4zM8 8h8M8 12h8M8 16h5"/></svg>', profile: '<svg viewBox="0 0 24 24"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.9 0-7 1.8-7 4v2h14v-2c0-2.2-3.1-4-7-4Z"/></svg>', relation: '<svg viewBox="0 0 24 24"><path d="M7 7h4v4H7zM13 13h4v4h-4zM11 9h2v2h-2zM9 11h2v2H9z"/></svg>', map: '<svg viewBox="0 0 24 24"><path d="M12 2 6 8a6 6 0 1 0 12 0Zm0 9a3 3 0 1 1 3-3 3 3 0 0 1-3 3Z"/></svg>', forum: '<svg viewBox="0 0 24 24"><path d="M4 4h16v12H7l-3 3z"/></svg>', settings: '<svg viewBox="0 0 24 24"><path d="M19.4 13a7.8 7.8 0 0 0 0-2l2-1.6-2-3.5-2.4 1a7.5 7.5 0 0 0-1.7-1L15 3h-6l-.3 2.9a7.5 7.5 0 0 0-1.7 1l-2.4-1-2 3.5 2 1.6a7.8 7.8 0 0 0 0 2l-2 1.6 2 3.5 2.4-1a7.5 7.5 0 0 0 1.7 1L9 21h6l.3-2.9a7.5 7.5 0 0 0 1.7-1l2.4 1 2-3.5ZM12 15a3 3 0 1 1 3-3 3 3 0 0 1-3 3Z"/></svg>' }; return `<span class='ico'>${s[name] || s.settings}</span>`; }
