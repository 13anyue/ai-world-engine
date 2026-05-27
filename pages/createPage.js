import { GAME_STATE, saveState } from '../core/state.js';
export function renderCreatePage() {
  const presetOpts = GAME_STATE.presets.map(p=>`<option value="${p.id}" ${p.id===GAME_STATE.setup.selectedPreset?'selected':''}>${p.name}</option>`).join('');
  return `<div class="card"><div class="title">创建/导入剧本规则</div>
  <div class="sub">先选择提示词预设（可后期修改并润色），再导入规则或手写设定。</div>
  <select class="input" id="presetSel">${presetOpts}</select>
  <textarea id="importRule" class="input" placeholder="导入的剧情规则/世界书">${GAME_STATE.setup.importedRule || ''}</textarea>
  <textarea id="customRule" class="input" placeholder="自己手写的世界内容与规则">${GAME_STATE.setup.customRule || ''}</textarea>
  <button class="button" onclick="startGame()">保存并生成游戏</button></div>`;
}
