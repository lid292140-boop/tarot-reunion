/* algorithm.js - 复合概率计算 */
window.TarotAlgorithm = {
  reasonScores: {
    '性格不合': 15, '异地': 20, '第三者': 5,
    '家庭反对': 10, '沟通问题': 18, '经济压力': 12, '其他': 12
  },

  calcTarotScore: function(cards) {
    // cards: [{card, position}] 过去0.2 现在0.3 未来0.5
    var weights = [0.2, 0.3, 0.5];
    var score = 0;
    for (var i = 0; i < cards.length; i++) {
      score += cards[i].card.score * weights[i];
    }
    return score;
  },

  calcRelationScore: function(data) {
    // 在一起时长
    var durationScore = Math.min(data.duration * 2, 30);
    // 分手次数惩罚
    var breakupPenalty = data.breakupCount * 8;
    // 分手时长
    var m = data.separation;
    var sepScore = m <= 1 ? 10 : m <= 3 ? 20 : m <= 6 ? 15 : m <= 12 ? 10 : 5;
    // 见面频率
    var meetScore = Math.min(data.meetFreq * 5, 20);
    // 分手原因
    var self = this;
    var reasonTotal = 0;
    data.reasons.forEach(function(r) {
      reasonTotal += (self.reasonScores[r] || 12);
    });
    var avgReason = reasonTotal / data.reasons.length;

    var score = durationScore - breakupPenalty + sepScore + meetScore + avgReason;
    return Math.max(0, Math.min(100, score));
  },

  calculate: function() {
    var tarotScore = this.calcTarotScore(TarotApp.drawnCards);
    var zodiacScore = TarotZodiac.getScore(
      TarotApp.formData.myZodiac, TarotApp.formData.partnerZodiac
    );
    var relationScore = this.calcRelationScore(TarotApp.formData);

    var final = tarotScore * 0.40 + zodiacScore * 0.25 + relationScore * 0.35;
    final += (Math.random() * 6 - 3);
    final = Math.max(5, Math.min(95, Math.round(final)));

    TarotApp.score = final;
    TarotApp.details = {
      tarot: Math.round(tarotScore),
      zodiac: Math.round(zodiacScore),
      relation: Math.round(relationScore)
    };
    return final;
  }
};
