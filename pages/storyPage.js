import { GAME_STATE, saveState } from '../core/state.js';
import { renderApiPage } from './apiPage.js';

export function renderGameHallPage() {
  return `<div class="card"><div class="title">游戏大厅主界面</div>
  <div class="sub">长段剧情+3个玩家选项、存档、自定义、关系表、地图、论坛、设置联动。</div>
  <button class="button" onclick="switchGameTab('story')">进入剧情</button>
  ${renderTabNav()}<div id="tabArea">${renderTabContent(GAME_STATE.activeGameTab)}</div></div>`;
}

const renderTabNav = () => `<div class='tabs'>${['story:剧情','profile:个人资料','relation:关系表','map:地图','forum:论坛','settings:设置'].map(i=>{const [k,n]=i.split(':'); return `<button class='option' onclick="switchGameTab('${k}')">${n}</button>`;}).join('')}</div>`;

export function renderGameTab(tab){ GAME_STATE.activeGameTab=tab; const el=document.getElementById('tabArea'); if(el) el.innerHTML=renderTabContent(tab); saveState(); }

function renderTabContent(tab){ const g=GAME_STATE.game; if(tab==='story') return `<div class='story'><b>${g.story}</b><br><i>天气：${g.weather}｜时间：${g.time}｜节日：${g.festival}</i><br>属性：体力${g.attributes.体力} 学习${g.attributes.学习效率} 金钱${g.attributes.金钱}</div>${g.options.map((o,i)=>`<div class='option' onclick='pickChoice(${i})'>${o}</div>`).join('')}<button class='button' onclick='saveArchive()'>存档</button><button class='button' onclick='loadArchive()'>读档</button>`;
if(tab==='profile') return `<div class='sub'>背包与个人信息</div>${g.inventory.map(i=>`<div class='npc-card'>${i.name}${i.secret?'（私密物）':''}<div class='sub'>${i.desc}</div></div>`).join('')}`;
if(tab==='relation') return g.npcs.map(n=>`<div class='npc-card'><div class='npc-name'>${n.name}</div><div class='sub'>${n.bg}</div><div class='sub'>地点:${n.location} 心情:${n.mood} 好感:${n.favor} 出场:${n.appearances}</div><button class='option' onclick="alert('已与${n.name}互动，收到回应。')">交互</button><button class='option' onclick="alert('可替换${n.name}头像（示例）')">换头像</button></div>`).join('');
if(tab==='map') return `<div class='sub'>点击地图任意区域创建地点；可管理增减。</div><div class='map-container' onclick='mapClick(event)'>${g.map.map(m=>`<div class='map-location' style='left:${m.x}%;top:${m.y}%'>${m.name}</div>`).join('')}</div>`;
if(tab==='forum') return `<textarea id='postText' class='input' placeholder='发帖 / 私信 / 评论'></textarea><button class='button' onclick='publishPost()'>发布</button>${g.forumPosts.map(p=>`<div class='npc-card'><b>${p.user}</b><div>${p.text}</div><div class='sub'>评论 ${p.comments}</div></div>`).join('')}<div class='npc-card'><b>私信(像微信)</b><div id='chatLog'>${g.chats[0].msgs.join('<br>')}</div><input id='chatInput' class='input' placeholder='输入消息'/><button class='button' onclick='sendChatMessage()'>发送</button></div>`;
return `<button class='button' onclick='resetGame()'>恢复当前游戏出厂</button><div class='sub'>记忆功能/向量化占位：${g.memoryBook.length} 条。文风：${GAME_STATE.profile.globalStyle}</div>`;
}

export async function runApiTest(){
  const { endpoint, key, model } = GAME_STATE.api;
  if(!endpoint||!key||!model){ alert('请先完整填写API配置'); return; }
  try{ const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${key}`},body:JSON.stringify({model,messages:[{role:'user',content:'ping'}],max_tokens:5})}); GAME_STATE.api.tested=r.ok; GAME_STATE.api.lastMessage=r.ok?'连通成功':'连通失败'; }catch{ GAME_STATE.api.tested=false; GAME_STATE.api.lastMessage='连通失败'; }
  saveState(); go('api');
}

export function startGameFromSetup(){
  if(!GAME_STATE.api.tested) return alert('开始前请完成API连通测试');
  GAME_STATE.setup.selectedPreset = presetSel.value;
  GAME_STATE.setup.importedRule = importRule.value;
  GAME_STATE.setup.customRule = customRule.value;
  const preset = GAME_STATE.presets.find(p=>p.id===GAME_STATE.setup.selectedPreset);
  GAME_STATE.game.logs.push(`已载入预设：${preset.name}`);
  GAME_STATE.route='hall'; saveState(); go('hall');
}

export function applyChoice(i){ const c=GAME_STATE.game.options[i]; GAME_STATE.game.story=`你选择了：${c}。<b>新事件触发</b>：${c}导致人物关系出现变化。`; GAME_STATE.game.npcs.forEach(n=>n.appearances++); const target=GAME_STATE.game.npcs.find(n=>n.appearances>=3&&!n.met); if(target){ if(confirm(`${target.name}出场达到3次，是否认识一下？`)){ target.met=true; target.favor+=3; }} saveState(); renderGameTab('story'); }
export function createMapPoint(e){ const rect=e.currentTarget.getBoundingClientRect(); const x=((e.clientX-rect.left)/rect.width*100).toFixed(1); const y=((e.clientY-rect.top)/rect.height*100).toFixed(1); const name=prompt('新地点名字'); if(!name)return; GAME_STATE.game.map.push({id:Date.now(),name,x,y,npcs:[],detail:'自定义地点'}); saveState(); renderGameTab('map'); }
export function addForumPost(){ const t=postText.value.trim(); if(!t) return; GAME_STATE.game.forumPosts.unshift({user:GAME_STATE.profile.nickname,text:t,comments:0}); saveState(); renderGameTab('forum'); }
export function sendChat(){ const t=chatInput.value.trim(); if(!t)return; GAME_STATE.game.chats[0].msgs.push(`我：${t}`); GAME_STATE.game.chats[0].msgs.push(`赵悦：收到，${t.length>8?'我们细聊':'好呀'}`); saveState(); renderGameTab('forum'); }
export function saveArchive(){ GAME_STATE.saves.push({time:Date.now(),snapshot:JSON.parse(JSON.stringify(GAME_STATE.game))}); saveState(); alert('已存档'); }
export function loadArchive(){ const s=GAME_STATE.saves.at(-1); if(!s)return alert('暂无存档'); GAME_STATE.game=s.snapshot; saveState(); renderGameTab('story'); }
export function resetGame(){ if(!confirm('确定恢复出厂？'))return; localStorage.removeItem('AI_WORLD_ENGINE_STATE'); location.reload(); }
