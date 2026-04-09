/* horoscope.js - 星座本周/本月运势（复合视角） */
window.TarotHoroscope = {
  // 基于当前日期动态计算周期标签
  getWeekLabel: function() {
    var d = new Date();
    var day = d.getDay() || 7;
    var mon = new Date(d); mon.setDate(d.getDate() - day + 1);
    var sun = new Date(d); sun.setDate(d.getDate() - day + 7);
    return (mon.getMonth()+1) + '/' + mon.getDate() + ' - ' + (sun.getMonth()+1) + '/' + sun.getDate();
  },
  getMonthLabel: function() {
    var d = new Date();
    return d.getFullYear() + '年' + (d.getMonth()+1) + '月';
  },

  // 12星座运势数据 [周运, 月运]
  data: [
    { // 白羊座
      week: { love: '感情上容易冲动行事，本周不适合主动联系前任。把精力放在自我提升上，你的改变对方迟早会看到。桃花运在周末有小幅回升，可能收到意外的问候。',
              action: '控制发消息的冲动，把想说的话写在备忘录里，三天后再看还想发再说。' },
      month: { love: '本月火星能量强劲，你的魅力值在线但攻击性也强。月中前后是关键节点，可能出现和前任偶遇或被共同朋友提起的情况。下半月感情运回暖，适合释放善意信号。',
               action: '月初沉淀，月中观察对方动态，下半月可以尝试轻量级接触（朋友圈互动、共同话题）。' }
    },
    { // 金牛座
      week: { love: '金星照拂下本周情感敏感度极高，你会比平时更想念过去的温暖。这种思念是正常的，但不要在深夜冲动联系。周三前后可能梦到对方，这是潜意识在处理情绪。',
              action: '把思念转化为行动力——健身、学习、打扮自己。让自己变好是最好的复合策略。' },
      month: { love: '本月整体感情运平稳，没有大起大落。这对金牛来说反而是好事，稳定的能量适合你慢慢修复内心。月底可能出现一个让你重新审视这段感情的契机，保持开放心态。',
               action: '本月适合"无声复合法"——不主动联系但持续提升自己，通过社交媒体让对方看到你的变化。' }
    },
    { // 双子座
      week: { love: '水星逆行影响沟通，本周说话容易被误解。如果和前任有任何接触，务必字斟句酌，避免引发新的矛盾。周末社交运旺，可能通过朋友圈获得对方的近况。',
              action: '管住嘴，多倾听少表达。如果对方主动联系你，回复可以慢一点，显得从容。' },
      month: { love: '本月上旬思维活跃但情绪不稳，容易在"想复合"和"算了吧"之间反复横跳。月中水逆结束后会清醒很多，下旬是本月最适合采取行动的时段。',
               action: '上旬不做决定，中旬理清思路，下旬如果还想复合就开始有计划地行动。' }
    },
    { // 巨蟹座
      week: { love: '月亮本周在你的感情宫位运行，情绪波动会比较大。你可能会突然很想哭，或者翻看以前的聊天记录。允许自己脆弱，但不要在情绪最低落的时候做决定。',
              action: '找一个信任的朋友倾诉，把情绪释放出来。憋在心里只会让你更难受。' },
      month: { love: '本月是巨蟹座的情感疗愈期。上旬可能会经历一次比较深的情绪低谷，但这是黎明前的黑暗。月中开始能量回升，你会逐渐找回内心的力量。下旬感情运明显好转，复合的窗口期可能出现。',
               action: '上旬专注自我疗愈，月中重建社交圈，下旬可以考虑释放复合信号。' }
    },
    { // 狮子座
      week: { love: '太阳能量本周给你带来自信和魅力，这是展现最好状态的时机。但注意不要把自信变成傲慢——前任最不想看到的就是你"高高在上"的样子。适度示弱反而更有吸引力。',
              action: '发一条展现生活品质但不炫耀的朋友圈，让对方看到你过得好但不是在报复性炫耀。' },
      month: { love: '本月狮子座的个人魅力达到高峰，身边可能出现新的追求者。这会让你纠结：是继续挽回前任还是接受新的可能？月底前做出的选择会影响未来半年的感情走向。',
               action: '不要用新欢刺激旧爱，这招对大多数人都会适得其反。专注于自己真正想要的。' }
    },
    { // 处女座
      week: { love: '本周你的分析能力特别强，会不自觉地复盘感情中的每一个细节。适度反思是好的，但过度分析会让你陷入思维陷阱。有些事情没有标准答案，感情不是数学题。',
              action: '给自己设一个"反思时间"——每天只允许想这件事30分钟，其余时间专注当下。' },
      month: { love: '本月处女座的感情运呈现先抑后扬的走势。上旬可能收到一些让你不舒服的消息（对方的动态或共同朋友的转述），但不要急于反应。下旬局势会反转，你之前的隐忍和自律会开始收到回报。',
               action: '上旬忍住不回应任何刺激，下旬等对方主动释放信号后再回应。处女座的耐心是最大的武器。' }
    },
    { // 天秤座
      week: { love: '金星本周给天秤座带来和谐的社交能量，你的亲和力和魅力都在线。如果有机会在社交场合"偶遇"前任，本周是不错的时机。但不要刻意制造，自然最好。',
              action: '参加一些社交活动，扩大交际圈。即使遇不到前任，好的社交状态也会通过共同朋友传递过去。' },
      month: { love: '本月天秤座在感情上会经历一次重要的内心抉择。你一直在权衡利弊，但有些事情不是靠分析能想清楚的。月中可能出现一个让你必须做决定的事件，相信自己的第一反应。',
               action: '停止无限期的犹豫。给自己设一个截止日期，到了那天就按当时的感觉行动。' }
    },
    { // 天蝎座
      week: { love: '冥王星能量本周让你的洞察力极强，你能敏锐地感知到前任的真实状态。但注意不要把"观察"变成"监视"——查对方社交媒体可以，但不要让这成为执念。',
              action: '把你观察到的信息记下来，但不要立刻行动。天蝎座的优势是耐心等待最佳出手时机。' },
      month: { love: '本月天蝎座的感情运势跌宕起伏。上旬可能经历一次情绪上的"小型爆发"，中旬趋于平静，下旬会出现一个意想不到的转机。这个转机可能来自对方的主动联系，也可能是你发现了一些之前不知道的真相。',
               action: '上旬释放情绪但不要对外发泄，中旬蓄力，下旬抓住转机果断行动。' }
    },
    { // 射手座
      week: { love: '木星带来乐观的能量，本周你的心态会比前几周好很多。你开始能用更豁达的视角看待这段感情，这种心态转变本身就是复合的前提——没有人想和一个整天愁眉苦脸的人在一起。',
              action: '去做一些让自己开心的事，旅行、运动、学新东西。快乐是最好的吸引力法则。' },
      month: { love: '本月射手座的自由能量和感情需求会产生冲突。你一方面想复合，一方面又享受单身的自由。这种矛盾是正常的，不要强迫自己做选择。月底前后，一次偶然的回忆可能会让你突然想清楚自己真正要什么。',
               action: '本月适合"放风筝式复合"——保持联系但不紧绷，给双方都留足空间。' }
    },
    { // 摩羯座
      week: { love: '土星本周让你格外理性和克制，这对摩羯座来说是常态，但在感情上过度理性反而是障碍。本周试着允许自己感性一次，承认"我想TA"不丢人。',
              action: '写一封不会寄出的信，把所有想说的话都写下来。这个过程本身就是疗愈。' },
      month: { love: '本月摩羯座的事业运和感情运呈现此消彼长的态势。上旬工作忙碌会暂时转移注意力，但月中开始感情上的空缺感会变得明显。下旬是本月最适合处理感情问题的时段，你的判断力和执行力都在线。',
               action: '上旬专注工作积累资本，下旬用摩羯座最擅长的"计划性"来推进复合——制定策略，分步执行。' }
    },
    { // 水瓶座
      week: { love: '天王星本周带来一些意外的信息或巧合，可能在不经意间看到前任的动态，或者被共同朋友提起。这些"巧合"也许是宇宙在给你信号，留意但不要过度解读。',
              action: '保持你独立思考的优势，不要被情绪带着走。水瓶座最大的魅力就是那份清醒和独特。' },
      month: { love: '本月水瓶座的精神世界会经历一次深层的觉醒。你可能突然理解了这段感情中一些之前想不通的问题，这种顿悟会改变你对复合的看法——不是更想或更不想，而是更清楚自己要的是什么样的关系。',
               action: '把你的思考和感悟记录下来，这些洞察在未来和对方沟通时会非常有价值。' }
    },
    { // 双鱼座
      week: { love: '海王星本周让你的感受力和共情能力达到顶峰，你甚至能"感应"到前任此刻的情绪状态。但要区分直觉和幻想——你感受到的"TA也在想我"可能是真的，也可能是你的投射。',
              action: '用创造性的方式释放情绪——写日记、画画、听音乐。双鱼座的艺术天赋在疗愈中会发挥巨大作用。' },
      month: { love: '本月双鱼座的感情运势像潮汐一样起伏。上旬情绪低落容易心软，要警惕在脆弱时做出冲动的决定。月中会有一段相对平静的时期，适合理性思考。下旬感情运回升，如果要采取行动，选在下旬最稳妥。',
               action: '上旬保护好自己的情绪边界，月中整理思路，下旬再行动。双鱼座最需要的是在感性和理性之间找到平衡。' }
    }
  ],

  get: function(zodiacIdx) {
    return this.data[zodiacIdx] || null;
  },

  renderHTML: function(myIdx, partnerIdx) {
    var my = this.data[myIdx];
    var partner = this.data[partnerIdx];
    var weekLabel = this.getWeekLabel();
    var monthLabel = this.getMonthLabel();
    var names = TarotZodiac.names;
    if (!my || !partner) return '';

    var html = '<div class="horoscope-section">';
    html += '<h3 class="reading-title">星座运势指南</h3>';

    // 我的运势
    html += '<div class="horo-block">';
    html += '<div class="horo-header">你的运势 · ' + names[myIdx] + '</div>';
    html += '<div class="horo-tab-row" id="myHoroTabs">';
    html += '<span class="horo-tab active" onclick="TarotHoroscope.switchTab(\'my\',\'week\')">本周 ' + weekLabel + '</span>';
    html += '<span class="horo-tab" onclick="TarotHoroscope.switchTab(\'my\',\'month\')">' + monthLabel + '</span>';
    html += '</div>';
    html += '<div class="horo-content" id="myHoroWeek">';
    html += '<p class="horo-text">' + my.week.love + '</p>';
    html += '<div class="horo-action"><span>行动建议</span>' + my.week.action + '</div></div>';
    html += '<div class="horo-content hidden" id="myHoroMonth">';
    html += '<p class="horo-text">' + my.month.love + '</p>';
    html += '<div class="horo-action"><span>行动建议</span>' + my.month.action + '</div></div>';
    html += '</div>';

    // 对方运势
    html += '<div class="horo-block">';
    html += '<div class="horo-header">对方运势 · ' + names[partnerIdx] + '</div>';
    html += '<div class="horo-tab-row" id="partnerHoroTabs">';
    html += '<span class="horo-tab active" onclick="TarotHoroscope.switchTab(\'partner\',\'week\')">本周 ' + weekLabel + '</span>';
    html += '<span class="horo-tab" onclick="TarotHoroscope.switchTab(\'partner\',\'month\')">' + monthLabel + '</span>';
    html += '</div>';
    html += '<div class="horo-content" id="partnerHoroWeek">';
    html += '<p class="horo-text">' + partner.week.love + '</p>';
    html += '<div class="horo-action"><span>行动建议</span>' + partner.week.action + '</div></div>';
    html += '<div class="horo-content hidden" id="partnerHoroMonth">';
    html += '<p class="horo-text">' + partner.month.love + '</p>';
    html += '<div class="horo-action"><span>行动建议</span>' + partner.month.action + '</div></div>';
    html += '</div>';

    html += '</div>';
    return html;
  },

  switchTab: function(who, period) {
    var prefix = who === 'my' ? 'my' : 'partner';
    var tabRow = document.getElementById(prefix + 'HoroTabs');
    tabRow.querySelectorAll('.horo-tab').forEach(function(t) { t.classList.remove('active'); });
    if (period === 'week') {
      tabRow.children[0].classList.add('active');
    } else {
      tabRow.children[1].classList.add('active');
    }
    document.getElementById(prefix + 'HoroWeek').classList.toggle('hidden', period !== 'week');
    document.getElementById(prefix + 'HoroMonth').classList.toggle('hidden', period !== 'month');
  }
};
