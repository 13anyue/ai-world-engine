import { navigate } from './router.js';
import { GAME_STATE, loadState, saveState } from './state.js';
import { renderGameTab, runApiTest, startGameFromSetup, applyChoice, createMapPoint, addForumPost, sendChat, saveArchive, loadArchive, resetGame } from '../pages/storyPage.js';
import { saveApiConfig } from '../pages/apiPage.js';
import { addMask, switchTheme } from '../pages/profilePage.js';

loadState();
navigate(GAME_STATE.route || 'home');

window.go = (route) => { GAME_STATE.route = route; saveState(); navigate(route); };
window.saveApi = () => saveApiConfig();
window.testApi = () => runApiTest();
window.startGame = () => startGameFromSetup();
window.switchGameTab = (tab) => renderGameTab(tab);
window.pickChoice = (i) => applyChoice(i);
window.mapClick = (e) => createMapPoint(e);
window.publishPost = () => addForumPost();
window.sendChatMessage = () => sendChat();
window.saveArchive = () => saveArchive();
window.loadArchive = () => loadArchive();
window.resetGame = () => resetGame();
window.addMask = () => addMask();
window.switchTheme = (v) => switchTheme(v);
