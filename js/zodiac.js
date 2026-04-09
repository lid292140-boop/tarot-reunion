/* zodiac.js - 星座配对与性格分析 */
window.TarotZodiac = {
  names: ['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座',
          '天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座'],
  // 元素: 0火 1土 2风 3水
  elements: [0,1,2,3,0,1,2,3,0,1,2,3],
  elementNames: ['火象','土象','风象','水象'],

  // 元素相性矩阵 [自己][对方]
  compatibility: [
    [80, 35, 70, 50],  // 火
    [35, 80, 50, 70],  // 土
    [70, 50, 80, 35],  // 风
    [50, 70, 35, 80]   // 水
  ],

  // 特殊配对加分 [小index, 大index, 加分]
  specials: [
    [7, 11, 10],  // 天蝎-双鱼
    [0, 6, 5],    // 白羊-天秤
    [3, 7, 8],    // 巨蟹-天蝎
    [1, 5, 7],    // 金牛-处女
    [4, 8, 6],    // 狮子-射手
    [2, 10, 6],   // 双子-水瓶
  ],

  getScore: function(a, b) {
    var ea = this.elements[a], eb = this.elements[b];
    var base = this.compatibility[ea][eb];
    var lo = Math.min(a, b), hi = Math.max(a, b);
    for (var i = 0; i < this.specials.length; i++) {
      if (this.specials[i][0] === lo && this.specials[i][1] === hi) {
        base += this.specials[i][2];
        break;
      }
    }
    return Math.min(base, 100);
  },

  personalities: [
    { traits: '热情冲动、直来直去', approach: '给TA空间冷静，主动示好但别纠缠，用行动证明改变' },
    { traits: '固执念旧、重视安全感', approach: '稳定持续地出现，用实际行动而非空话打动TA' },
    { traits: '善变好奇、怕无聊', approach: '展现你的成长和新鲜感，轻松有趣地重新吸引TA' },
    { traits: '敏感恋家、极度缺安全感', approach: '温柔耐心地修复信任，让TA感受到被珍惜' },
    { traits: '骄傲要面子、渴望被崇拜', approach: '给足面子和台阶，真诚赞美，让TA觉得被需要' },
    { traits: '挑剔完美主义、嘴硬心软', approach: '展现你的自律和进步，用细节打动TA' },
    { traits: '优柔寡断、追求和谐', approach: '营造轻松愉快的氛围，别施压，让TA自己做决定' },
    { traits: '占有欲强、爱恨分明', approach: '坦诚面对过去的问题，展现忠诚和深情' },
    { traits: '自由奔放、讨厌束缚', approach: '给TA充分自由，做一个有趣的灵魂伴侣' },
    { traits: '务实冷静、慢热但深情', approach: '用时间和行动证明你的可靠，别急于求成' },
    { traits: '独立理性、重视精神共鸣', approach: '展现独立思考和成长，做TA的知己而非附属' },
    { traits: '浪漫多情、容易心软', approach: '用浪漫和真情打动TA，但要给出实际的改变承诺' }
  ],

  getPersonality: function(idx) {
    var p = this.personalities[idx];
    return p || { traits: '神秘莫测', approach: '真诚沟通是最好的方式' };
  }
};
