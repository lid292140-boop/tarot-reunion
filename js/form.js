/* form.js - 表单验证与数据收集 */
window.TarotForm = {
  zodiacs: ['白羊座','金牛座','双子座','巨蟹座','狮子座','处女座',
            '天秤座','天蝎座','射手座','摩羯座','水瓶座','双鱼座'],
  reasons: ['性格不合','异地','第三者','家庭反对','沟通问题','经济压力','其他'],

  init: function() {
    var self = this;
    // 填充星座下拉
    ['myZodiac', 'partnerZodiac'].forEach(function(id) {
      var sel = document.getElementById(id);
      sel.innerHTML = '<option value="">请选择</option>';
      self.zodiacs.forEach(function(z, i) {
        sel.innerHTML += '<option value="' + i + '">' + z + '</option>';
      });
    });
    // 填充分手原因标签
    var container = document.getElementById('reasonTags');
    container.innerHTML = '';
    self.reasons.forEach(function(r) {
      var tag = document.createElement('span');
      tag.className = 'reason-tag';
      tag.textContent = r;
      tag.onclick = function() { tag.classList.toggle('selected'); };
      container.appendChild(tag);
    });
    // 自定义原因输入
    var customWrap = document.createElement('div');
    customWrap.className = 'custom-reason-wrap';
    customWrap.innerHTML = '<input type="text" id="customReason" class="custom-reason-input" placeholder="输入其他原因，回车添加" maxlength="20">';
    container.after(customWrap);
    document.getElementById('customReason').onkeydown = function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        var val = this.value.trim();
        if (!val) return;
        var tag = document.createElement('span');
        tag.className = 'reason-tag selected';
        tag.textContent = val;
        tag.onclick = function() { tag.classList.toggle('selected'); };
        container.appendChild(tag);
        this.value = '';
      }
    };
  },

  submit: function() {
    var my = document.getElementById('myZodiac').value;
    var partner = document.getElementById('partnerZodiac').value;
    var dur = document.getElementById('duration').value;
    var sep = document.getElementById('separation').value;

    if (!my || !partner || !dur || !sep) {
      alert('请填写完整信息哦~'); return;
    }

    var selectedReasons = [];
    document.querySelectorAll('.reason-tag.selected').forEach(function(t) {
      selectedReasons.push(t.textContent);
    });
    if (selectedReasons.length === 0) {
      alert('请至少选择一个分手原因'); return;
    }

    TarotApp.formData = {
      myZodiac: parseInt(my),
      partnerZodiac: parseInt(partner),
      duration: parseInt(dur),
      breakupCount: parseInt(document.getElementById('breakupCount').value),
      separation: parseInt(sep),
      meetFreq: parseInt(document.getElementById('meetFreq').value),
      reasons: selectedReasons
    };
    TarotApp.showStep('cards');
  }
};

// 页面加载时初始化表单
TarotForm.init();
