import { GAME_STATE }
from "../core/state.js";

/* =========================
发送AI请求
========================= */

export async function sendAIMessage(messages){

try{

const response = await fetch(

GAME_STATE.api.url,

{

method:"POST",

headers:{

"Content-Type":"application/json",

"Authorization":
`Bearer ${GAME_STATE.api.key}`

},

body:JSON.stringify({

model:GAME_STATE.api.model,

messages

})

}

);

const data =
await response.json();

return data
?.choices?.[0]
?.message
?.content || "AI无响应";

}catch(error){

console.log(error);

return "请求失败";

}

}
