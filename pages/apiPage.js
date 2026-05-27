import { GAME_STATE, saveState } from '../core/state.js';
export function renderApiPage() {
  const a = GAME_STATE.api;
  return `<div class="card"><div class="title">API配置</div>
  <input id="api-endpoint" class="input" placeholder="API端点" value="${a.endpoint || ''}"/>
  <input id="api-key" class="input" placeholder="API密钥" value="${a.key || ''}"/>
  <input id="api-model" class="input" placeholder="模型自定义名称" value="${a.model || ''}"/>
  <button class="button" onclick="saveApi()">保存配置</button>
  <button class="button" onclick="testApi()">测试连通</button>
  <div class="sub">${a.lastMessage || '尚未测试连通。'}</div></div>`;
}
export function saveApiConfig() { const g = GAME_STATE.api; g.endpoint = api_endpoint.value.trim(); g.key = api_key.value.trim(); g.model = api_model.value.trim(); saveState(); alert('已保存API配置'); }
