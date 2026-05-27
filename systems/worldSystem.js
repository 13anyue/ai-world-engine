import { sendAIMessage }
from "./apiSystem.js";

export async function generateStory(){

const result =
await sendAIMessage([

{

role:"system",

content:`

你是高级AI文游引擎。

你需要：

生成沉浸式剧情。

规则：

1 对白使用自然风格
2 内心戏使用细腻描写
3 剧情有电影感
4 保持世界真实性
5 输出1000字以内

`

},

{

role:"user",

content:"继续剧情"

}

]);

return result;

}
