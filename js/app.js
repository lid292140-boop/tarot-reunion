/* app.js - 全局状态与页面切换 */
window.TarotApp = {
  formData: {},
  drawnCards: [],
  score: 0,

  showStep: function(name) {
    document.querySelectorAll('.step').forEach(function(s) {
      s.classList.remove('active');
    });
    var el = document.getElementById('step-' + name);
    if (el) {
      el.classList.add('active');
      // 进入特定步骤时触发初始化
      if (name === 'cards') TarotCards.init();
      if (name === 'result') TarotResult.render();
      if (name === 'chat') TarotChat.init();
    }
  }
};

// 生成星空背景（稀疏暗淡）
(function() {
  var container = document.getElementById('stars');
  if (!container) return;
  for (var i = 0; i < 40; i++) {
    var star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.setProperty('--dur', (3 + Math.random() * 4) + 's');
    star.style.setProperty('--max-opacity', (0.2 + Math.random() * 0.3).toString());
    star.style.animationDelay = Math.random() * 4 + 's';
    container.appendChild(star);
  }
})();

// 生成雨滴
(function() {
  var rain = document.getElementById('rain');
  if (!rain) return;
  for (var i = 0; i < 50; i++) {
    var drop = document.createElement('div');
    drop.className = 'drop';
    drop.style.left = Math.random() * 100 + '%';
    drop.style.height = (30 + Math.random() * 60) + 'px';
    drop.style.setProperty('--speed', (2 + Math.random() * 3) + 's');
    drop.style.setProperty('--delay', Math.random() * 4 + 's');
    rain.appendChild(drop);
  }
})();
