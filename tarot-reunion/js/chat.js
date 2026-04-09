/* chat.js - Claude API 虚拟陪伴 + 降级回复 */
window.TarotChat = {
  apiKey: '',
  history: [],
  initialized: false,

  fallbacks: {
    '难过|伤心|哭|痛': '我能感受到你的难过。分手确实很痛，允许自己悲伤，这不是软弱。',
    '还爱|想念|忘不了|放不下': '思念说明这段感情对你很重要。这份深情本身就很珍贵。',
    '怎么办|该不该|纠结': '不急着做决定。给自己一些时间，答案会慢慢清晰的。',
    '不甘心|后悔|如果': '遗憾是感情里最常见的情绪。但每段经历都在教会我们更好地去爱。',
    '谢谢|感谢': '不用谢，我一直都在。无论什么时候，都可以来找我聊聊。',
    '复合|挽回|回来': '复合需要双方的意愿和改变。先问问自己，你想要的是TA，还是那段回忆？',
    '孤独|一个人|寂寞': '孤独是暂时的，但你学会的独处能力是永久的。这段时间，好好陪陪自己。'
  },
  defaultReply: '无论结果如何，你值得被好好爱。先好好爱自己，好的人和事都会来的。',

  init: function() {
    if (this.initialized) return;
    this.initialized = true;
    this.history = [];
    var score = TarotApp.score;
    var msg = score >= 70
      ? '你们的缘分还很深呢，复合概率' + score + '%。想聊聊接下来怎么做吗？'
      : score >= 45
      ? '复合概率' + score + '%，有机会但需要努力。说说你现在的感受吧。'
      : '我知道' + score + '%这个数字可能让你有些失落。但别灰心，说说你的心事吧。';
    this.addBubble(msg, 'bot');
  },

  setKey: function() {
    var input = document.getElementById('apiKeyInput');
    this.apiKey = input.value.trim();
    if (this.apiKey) {
      sessionStorage.setItem('tarot_api_key', this.apiKey);
      document.getElementById('apiKeyBar').classList.add('hidden');
      this.addBubble('已连接AI陪伴模式，你的Key仅在本次会话使用。', 'bot');
    }
  },

  send: function() {
    var input = document.getElementById('chatInput');
    var text = input.value.trim();
    if (!text) return;
    input.value = '';
    this.addBubble(text, 'user');
    this.history.push({ role: 'user', content: text });

    if (this.apiKey) {
      this.callClaude(text);
    } else {
      var reply = this.getFallback(text);
      this.addBubble(reply, 'bot');
    }
  },

  getFallback: function(text) {
    var keys = Object.keys(this.fallbacks);
    for (var i = 0; i < keys.length; i++) {
      if (new RegExp(keys[i]).test(text)) return this.fallbacks[keys[i]];
    }
    return this.defaultReply;
  },

  callClaude: function() {
    var self = this;
    var zodiac = TarotZodiac;
    var d = TarotApp.formData;
    var cards = TarotApp.drawnCards;
    var sys = '你是"塔罗守护者"，一位温柔有智慧的情感陪伴者。' +
      '用户刚完成塔罗牌复合占卜：复合概率' + TarotApp.score + '%。' +
      '牌面：' + cards.map(function(c) { return c.card.name + '(' + c.position + ')'; }).join('、') + '。' +
      '星座：' + zodiac.names[d.myZodiac] + '与' + zodiac.names[d.partnerZodiac] + '。' +
      '以温暖共情的方式对话，不给绝对判断，帮助用户理清情绪。回复150字以内，中文。';

    self.addBubble('正在思考...', 'bot typing');

    fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': self.apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 512,
        system: sys,
        messages: self.history
      })
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      // 移除"正在思考"
      var msgs = document.getElementById('chatMessages');
      var typing = msgs.querySelector('.typing');
      if (typing) typing.remove();

      var reply = data.content && data.content[0] ? data.content[0].text : '抱歉，我暂时无法回复。';
      self.history.push({ role: 'assistant', content: reply });
      self.addBubble(reply, 'bot');
    })
    .catch(function() {
      var msgs = document.getElementById('chatMessages');
      var typing = msgs.querySelector('.typing');
      if (typing) typing.remove();
      self.addBubble('连接失败，请检查API Key是否正确。', 'bot');
    });
  },

  addBubble: function(text, type) {
    var el = document.createElement('div');
    el.className = 'chat-bubble ' + type;
    el.textContent = text;
    var container = document.getElementById('chatMessages');
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
  }
};
