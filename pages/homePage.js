export function renderHomePage() {
  return `<div class="card"><div class="title">AI卡片文游模拟器</div><div class="sub">现代圆角风 · 首页大厅。请先完成API配置，再导入/创作规则开始游戏。</div>
  <button class="button" onclick="go('api')">1. API配置（必做）</button>
  <button class="button" onclick="go('create')">2. 导入/手写游戏规则</button>
  <button class="button" onclick="go('hall')">3. 进入游戏大厅</button>
  <button class="button" onclick="go('profile')">个人中心（面具角色/主题）</button></div>`;
}
