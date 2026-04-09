/* result.js - 结果渲染与动画 */
window.TarotResult = {
  render: function() {
    var score = TarotAlgorithm.calculate();
    var data = TarotApp.formData;
    var cards = TarotApp.drawnCards;
    var zodiac = TarotZodiac;
    var myName = zodiac.names[data.myZodiac];
    var partnerName = zodiac.names[data.partnerZodiac];
    var partnerP = zodiac.getPersonality(data.partnerZodiac);
    var label = this.getLabel(score);

    var html = '';
    // 概率环
    html += '<div class="score-ring">' +
      '<svg viewBox="0 0 180 180">' +
        '<circle class="ring-bg"></circle>' +
        '<circle class="ring-fill" id="ringFill"></circle>' +
      '</svg>' +
      '<div class="score-number"><span id="scoreNum">0</span><span>%</span></div>' +
    '</div>';
    html += '<div class="score-label">' + label + '</div>';

    // 三张牌详细解读
    html += '<div class="reading-section">';
    html += '<h3 class="reading-title">牌面详细解读</h3>';
    cards.forEach(function(c) {
      var posKey = c.position === '过去' ? 'past' :
                   c.position === '现在' ? 'present' : 'future';
      var detail = c.card[posKey] || c.card.desc;
      html += '<div class="reading-card">' +
        '<div class="reading-card-header">' +
          '<span class="reading-icon">' + c.card.icon + '</span>' +
          '<div class="reading-card-info">' +
            '<span class="reading-pos">' + c.position + '之牌</span>' +
            '<span class="reading-name">' + c.card.symbol + ' · ' + c.card.name + '</span>' +
          '</div>' +
          '<span class="reading-keyword">' + c.card.keyword + '</span>' +
        '</div>' +
        '<p class="reading-detail">' + detail + '</p>' +
      '</div>';
    });
    html += '</div>';

    // 综合牌阵分析
    html += '<div class="advice-section">' +
      '<h3>综合牌阵分析</h3>' +
      '<p>' + this.getSummary(cards, score) + '</p>' +
    '</div>';

    // 星座配对深度分析
    html += '<div class="advice-section">';
    html += '<h3>' + myName + ' × ' + partnerName + ' 配对分析</h3>';
    html += '<p>' + this.getZodiacAnalysis(data, zodiac) + '</p>';
    html += '<h3 style="margin-top:16px">对方性格画像</h3>';
    html += '<p>' + partnerP.traits + '。' + this.getTraitDetail(data.partnerZodiac) + '</p>';
    html += '<h3 style="margin-top:16px">针对性复合攻略</h3>';
    html += '<p>' + partnerP.approach + '</p>';
    html += '<p style="margin-top:8px">' + this.getActionPlan(data, score) + '</p>';
    html += '</div>';

    // 星座运势
    html += TarotHoroscope.renderHTML(data.myZodiac, data.partnerZodiac);

    // 操作按钮
    html += '<div class="result-actions">' +
        '<button class="btn-outline" onclick="TarotApp.showStep(\'welcome\')">重新占卜</button>' +
        '<button class="btn-gold" onclick="TarotApp.showStep(\'chat\')">闺蜜安慰室</button>' +
        '<button class="btn-outline" onclick="TarotApp.showStep(\'chat\',\'ex\')">模拟前任语气</button>' +
      '</div>';

    document.getElementById('resultContainer').innerHTML = html;
    setTimeout(function() {
      var offset = 502 - (502 * score / 100);
      document.getElementById('ringFill').style.strokeDashoffset = offset;
      TarotResult.animateNumber(score);
    }, 100);
  },

  getLabel: function(s) {
    if (s >= 80) return '命运眷顾，缘分深厚';
    if (s >= 65) return '缘分未尽，值得争取';
    if (s >= 45) return '有机会，但需要智慧和耐心';
    if (s >= 30) return '阻力较大，需要慎重考虑';
    return '顺其自然，先学会爱自己';
  },

  animateNumber: function(target) {
    var el = document.getElementById('scoreNum');
    var current = 0;
    var step = Math.ceil(target / 60);
    var timer = setInterval(function() {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current;
    }, 30);
  },

  getSummary: function(cards, score) {
    var past = cards[0].card, present = cards[1].card, future = cards[2].card;
    var s = '从牌阵整体来看，';
    if (past.score >= 60) {
      s += '「' + past.name + '」出现在过去位，说明你们曾经的感情基础是扎实的，那些美好不是幻觉。';
    } else {
      s += '「' + past.name + '」出现在过去位，暗示这段关系从一开始就埋下了一些隐患，分手并非偶然。';
    }
    if (present.score >= 60) {
      s += '现在位的「' + present.name + '」带来了积极的信号，说明当下的能量是有利于复合的。';
    } else {
      s += '现在位的「' + present.name + '」提醒你，此刻还不是最佳时机，需要更多的沉淀和准备。';
    }
    if (future.score >= 70) {
      s += '而未来位的「' + future.name + '」是整个牌阵中最令人振奋的信号——前方有光，这段感情还有很大的可能性。';
    } else if (future.score >= 45) {
      s += '未来位的「' + future.name + '」说明结局并非注定，一切取决于你接下来的选择和行动。';
    } else {
      s += '未来位的「' + future.name + '」是一个需要认真对待的警示，也许命运在引导你走向另一个方向。';
    }
    return s;
  },

  getZodiacAnalysis: function(data, zodiac) {
    var myEl = zodiac.elements[data.myZodiac];
    var partnerEl = zodiac.elements[data.partnerZodiac];
    var myElName = zodiac.elementNames[myEl];
    var partnerElName = zodiac.elementNames[partnerEl];
    var zScore = zodiac.getScore(data.myZodiac, data.partnerZodiac);
    var s = '你是' + myElName + '星座，对方是' + partnerElName + '星座。';
    if (myEl === partnerEl) {
      s += '同属一个元素，你们天然有很深的共鸣和理解，但也容易因为太相似而缺少互补的张力。';
    } else if (zScore >= 65) {
      s += '你们的元素属性形成了良好的互补关系，一个提供激情，一个提供稳定，这是很有潜力的组合。';
    } else if (zScore >= 45) {
      s += '你们的元素属性存在一定的摩擦，但这种摩擦也可以转化为成长的动力，关键在于双方的包容度。';
    } else {
      s += '你们的元素属性天然存在较大的冲突，相处需要比一般情侣付出更多的理解和耐心。';
    }
    s += '星座配对契合度为' + zScore + '分。';
    return s;
  },

  traitDetails: [
    '白羊座分手后通常会快速进入"假装没事"模式，但内心的火还没灭。抓住TA冲动的特点，在TA情绪波动时出现，比冷静期联系更有效。',
    '金牛座是十二星座中最念旧的，分手后会反复回忆过去的细节。TA不会主动回头，但如果你能持续稳定地出现在TA的生活边缘，TA的防线会慢慢松动。',
    '双子座分手后社交会变得更频繁，看起来很潇洒，但这恰恰是TA逃避痛苦的方式。不要试图用沉重的方式挽回，用轻松有趣的互动重新吸引TA的注意力。',
    '巨蟹座分手后会把自己缩进壳里，表面冷漠但内心极度脆弱。TA最怕的是再次受伤，所以你需要用极大的耐心和温柔去一点点重建TA的安全感。',
    '狮子座的自尊心不允许TA主动回头，即使心里想复合也会嘴硬。你需要给TA一个体面的台阶下，让TA觉得复合是TA自己的选择，而不是你求来的。',
    '处女座分手后会不断分析"哪里出了问题"，TA需要看到你有具体的、可量化的改变。空洞的承诺对处女座完全无效，TA要的是证据。',
    '天秤座最怕冲突和尴尬，分手后会尽量维持表面的和平。不要逼TA做决定，营造轻松自然的相处氛围，让TA在没有压力的情况下重新感受你的好。',
    '天蝎座爱恨分明，分手后要么彻底拉黑要么暗中关注。如果TA还没有完全切断联系，说明还有戏。但你必须绝对坦诚，任何隐瞒都会让TA彻底关上门。',
    '射手座分手后会迅速投入新的生活和冒险中，看起来完全不在乎。但TA的自由本性也意味着TA不会把门关死。做一个有趣的、不纠缠的存在，比苦苦哀求有效一百倍。',
    '摩羯座是最难挽回的星座之一，因为TA的决定通常经过深思熟虑。但如果你能展现出事业上的进步和人格上的成熟，TA会重新评估你的价值。摩羯座尊重强者。',
    '水瓶座分手后会变得非常理性和疏离，好像你们从来没有在一起过。不要试图用情感攻势打动TA，而是用思想上的共鸣和精神上的独立来重新吸引TA。',
    '双鱼座是最容易心软的星座，但也是最容易反复的。TA可能今天想复合明天又犹豫。你需要在TA心软的时候果断推进，同时给出足够的安全感让TA不再摇摆。'
  ],

  getTraitDetail: function(idx) {
    return this.traitDetails[idx] || '';
  },

  getActionPlan: function(data, score) {
    var sep = data.separation;
    var s = '';
    if (sep <= 1) {
      s += '你们刚分手不久，现在双方情绪都还不稳定。建议先给彼此1-2周的冷静期，不要频繁联系。';
    } else if (sep <= 3) {
      s += '分手1-3个月是复合的黄金窗口期。对方的愤怒已经消退，但思念还没有被时间冲淡。';
    } else if (sep <= 6) {
      s += '分手已经超过3个月，对方可能已经开始适应没有你的生活。你需要制造一个自然的重新接触的契机。';
    } else {
      s += '分手时间较长，直接表达复合意愿可能会让对方有压力。建议从朋友关系重新开始，慢慢升温。';
    }
    if (data.breakupCount >= 3) {
      s += '你们已经分手' + data.breakupCount + '次了，反复分合说明核心问题一直没有解决。这次如果要复合，必须先正视并解决那个根本矛盾，否则只会重蹈覆辙。';
    }
    return s;
  }
};
