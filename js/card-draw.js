/* card-draw.js - 洗牌仪式 + 抽牌交互 */
window.TarotCards = {
  positions: ['过去', '现在', '未来'],
  posHints: [
    '回溯你们曾经的故事，选一张代表「过去」的牌',
    '感受此刻的心境，选一张代表「现在」的牌',
    '望向未来的可能，选最后一张代表「未来」的牌'
  ],
  selected: [],
  pool: [],

  init: function() {
    this.selected = [];
    TarotApp.drawnCards = [];

    // 显示洗牌仪式，隐藏选牌
    document.getElementById('shufflePhase').classList.remove('hidden');
    document.getElementById('drawPhase').classList.add('hidden');
    document.getElementById('btnReveal').classList.add('hidden');

    // 生成洗牌动画卡片
    var sc = document.getElementById('shuffleCards');
    sc.innerHTML = '';
    for (var i = 0; i < 5; i++) {
      var c = document.createElement('div');
      c.className = 'shuffle-card';
      sc.appendChild(c);
    }

    // 仪式文案渐变
    var hints = [
      '感受命运的指引...',
      '牌面正在回应你的心意...',
      '命运之牌已经准备好了'
    ];
    var hintEl = document.getElementById('ritualHint');
    var hintIdx = 0;
    var hintTimer = setInterval(function() {
      hintIdx++;
      if (hintIdx < hints.length) {
        hintEl.textContent = hints[hintIdx];
      } else {
        clearInterval(hintTimer);
      }
    }, 1500);

    // 4.5秒后切换到选牌阶段
    var self = this;
    setTimeout(function() {
      clearInterval(hintTimer);
      self.startDraw();
    }, 4500);
  },

  startDraw: function() {
    document.getElementById('shufflePhase').classList.add('hidden');
    document.getElementById('drawPhase').classList.remove('hidden');
    this.updateHint();

    // 随机选5张牌
    var all = TarotData.slice();
    this.pool = [];
    while (this.pool.length < 5 && all.length > 0) {
      var idx = Math.floor(Math.random() * all.length);
      this.pool.push(all.splice(idx, 1)[0]);
    }

    var spread = document.getElementById('cardSpread');
    spread.innerHTML = '';
    var self = this;

    this.pool.forEach(function(card, i) {
      var el = document.createElement('div');
      el.className = 'tarot-card';
      el.innerHTML =
        '<div class="card-face card-back"></div>' +
        '<div class="card-face card-front">' +
          '<div class="card-icon">' + card.icon + '</div>' +
          '<div class="card-symbol">' + card.symbol + '</div>' +
          '<div class="card-name">' + card.name + '</div>' +
          '<div class="card-keyword">' + card.keyword + '</div>' +
        '</div>' +
        '<div class="card-position-label"></div>';
      el.onclick = function() { self.flipCard(el, i); };
      spread.appendChild(el);
    });
  },

  updateHint: function() {
    var n = this.selected.length;
    document.getElementById('drawCount').textContent = n + 1;
    document.getElementById('drawPos').textContent = this.positions[n] || '';
    var sub = document.querySelector('.card-hint-sub');
    if (sub) sub.textContent = this.posHints[n] || '';
  },

  flipCard: function(el, index) {
    if (el.classList.contains('flipped') || this.selected.length >= 3) return;

    el.classList.add('flipped');
    var posLabel = el.querySelector('.card-position-label');
    posLabel.textContent = this.positions[this.selected.length];

    this.selected.push(index);
    TarotApp.drawnCards.push({
      card: this.pool[index],
      position: this.positions[this.selected.length - 1]
    });

    if (this.selected.length < 3) {
      this.updateHint();
    } else {
      var sub = document.querySelector('.card-hint-sub');
      if (sub) sub.textContent = '三张命运之牌已揭晓，准备好面对结果了吗？';
      document.getElementById('drawCount').textContent = '3';
      document.getElementById('drawPos').textContent = '完成';
      setTimeout(function() {
        document.getElementById('btnReveal').classList.remove('hidden');
      }, 800);
    }
  }
};
