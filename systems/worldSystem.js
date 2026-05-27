import {

sendAIMessage

}

from "./apiSystem.js";

export async function generateStory(){

const result =
await sendAIMessage([

{

role:"system",

content:`

你是高级AI文游引擎。

生成沉浸式剧情。

对白自然。

内心戏细腻。

1000字以内。

`

},

{

role:"user",

content:"继续剧情"

}

]);

return result;

}
