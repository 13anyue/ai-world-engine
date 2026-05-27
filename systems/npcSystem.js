import { GAME_STATE }
from "../core/state.js";

/* =========================
初始化NPC
========================= */

export function createNPC(data){

const npc = {

id:
Date.now(),

name:
data.name || "未知",

age:
data.age || 18,

gender:
data.gender || "未知",

personality:
data.personality || "普通",

favorability:
0,

mood:"平静",

location:"未知",

occupation:"未知",

background:"",

memory:[],

relations:[],

phone:{

messages:[],
posts:[]

},

inventory:[],

secrets:[],

status:{

health:100,
stress:0,
trust:0

}

};

GAME_STATE.npcs.push(npc);

return npc;

}

/* =========================
获取NPC
========================= */

export function getNPC(id){

return GAME_STATE.npcs.find(
n=>n.id===id
);

}

/* =========================
修改好感
========================= */

export function changeFavorability(
id,
value
){

const npc = getNPC(id);

if(!npc) return;

npc.favorability += value;

}

/* =========================
修改情绪
========================= */

export function setMood(
id,
mood
){

const npc = getNPC(id);

if(!npc) return;

npc.mood = mood;

}

/* =========================
添加记忆
========================= */

export function addMemory(
id,
text
){

const npc = getNPC(id);

if(!npc) return;

npc.memory.push({

time:
Date.now(),

text

});

}
