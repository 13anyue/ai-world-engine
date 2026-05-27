import { GAME_STATE, saveState } from '../core/state.js';
export function renderProfilePage() {
  const masks = GAME_STATE.profile.masks.map(m=>`<div class="npc-card"><b>${m.name}</b> · ${m.role}<div class="sub">绑定世界：${m.world}</div></div>`).join('');
  return `<div class="card"><div class="title">个人中心</div><div class="sub">右上角头像入口：面具角色、全局DIY、提示词预设、主题美化、API设置。</div>
  <input class="input" id="newMaskName" placeholder="新增面具名"/>
  <input class="input" id="newMaskWorld" placeholder="绑定世界名"/>
  <button class="button" onclick="addMask()">新增面具角色</button>
  <select class="input" onchange="switchTheme(this.value)"><option value="rose">玫瑰主题</option><option value="night">夜幕主题</option></select>
  ${masks}
  </div>`;
}
export function addMask(){ const n=newMaskName.value.trim(); const w=newMaskWorld.value.trim(); if(!n||!w)return alert('请填写'); GAME_STATE.profile.masks.push({id:Date.now(),name:n,world:w,role:'自定义角色'}); saveState(); go('profile'); }
export function switchTheme(v){ document.body.dataset.theme=v; GAME_STATE.profile.theme=v; saveState(); }
