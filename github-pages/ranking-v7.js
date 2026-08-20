(function () {
  'use strict';

  var commonDates = ['2026-08-18', '2026-08-14', '2026-08-09', '2026-08-01', '2026-07-24', '2026-07-16', '2026-07-08', '2026-06-29', '2026-06-18', '2026-06-05'];
  var profiles = {
    mira: { name: 'Mira Chen', avatar: 'M', score: '94.8', rate: '78%', followers: '44,518', bio: '擅長科技、金融與加密貨幣的長期預測。', source: '公司公告與市場公開資料', titles: ['NVIDIA 下季營收年增超過 45%', 'Bitcoin 年底以前突破 160,000 美元', 'Apple 秋季發表會推出新的穿戴裝置', '台積電年底收盤高於 1,800 元', 'Ethereum 三個月內突破 6,000 美元', 'AI 晶片需求連續兩季成長', 'Microsoft 本季雲端營收創新高', 'Solana 七月底以前高於 280 美元', '美國科技指數本月收紅', '全球 AI 伺服器出貨成長超過 30%'] },
    mountain: { name: '見山不是山', avatar: '見', score: '92.1', rate: '74%', followers: '31,206', bio: '追蹤總體經濟、亞洲市場與自然週期。', source: '政府統計與交易所資料', titles: ['台灣加權指數月底站上 29,000 點', '日圓第三季出現一波明顯升值', '台北夏季連續七天超過 35°C', '黃金年底以前刷新歷史高點', '亞洲出口數據連續三個月成長', '日本櫻花季比常年提前', '國際油價年底低於 90 美元', '台灣梅雨季雨量高於去年', '韓國半導體出口年增超過 20%', '美元指數本季回落'] },
    kairos: { name: 'Kairos', avatar: 'K', score: '89.7', rate: '70%', followers: '18,921', bio: '專注籃球、棒球與國際足球賽事。', source: '賽事官方最終結果', titles: ['勇士隊客場擊敗湖人隊', '洋基對紅襪總得分超過 8.5', '曼城對利物浦雙方都進球', '道奇隊主場擊敗教士隊', '塞爾提克本季勝場超過 55 場', '日本隊對韓國隊率先得分', '巴黎聖日耳曼主場獲勝', '統一獅對兄弟進入第九局仍差三分內', '西班牙對義大利正規時間平手', '網球決賽打滿三盤'] },
    luna: { name: 'Luna-17', avatar: 'L', score: '87.4', rate: '67%', followers: '12,744', bio: '觀察文化娛樂、太空與新興科技事件。', source: '官方公告與公開榜單', titles: ['年度全球票房冠軍突破 15 億美元', '人形機器人一年內進入量產測試', '亞洲影集登上全球串流榜首', '一年內出現新的登月任務', '智慧眼鏡明年銷量翻倍', '大型音樂節門票一天內售罄', 'AI 影片工具支援長片一致角色', '經典電影續集首週票房高於前作', '可摺疊裝置年度出貨成長 25%', '虛擬偶像一年內舉辦實體巡演'] }
  };
  var statusCycle = ['pending', 'pending', 'hit', 'hit', 'miss', 'hit', 'pending', 'hit', 'miss', 'hit'];
  var currentProfileKey = 'mira';
  var detailVotes = {};

  function predictionRows(profile) {
    return profile.titles.map(function (title, index) {
      var status = statusCycle[index];
      var label = status === 'hit' ? '已命中' : status === 'miss' ? '未命中' : '等待結果';
      var detail = status === 'hit' ? '模擬結果：條件成立，已完成結算。' : status === 'miss' ? '模擬結果：期限內未達成條件。' : '結果尚未公布，封存內容不可修改。';
      return { id: index, date: commonDates[index], title: title, status: status, label: label, detail: detail };
    }).sort(function (a, b) { return b.date.localeCompare(a.date); });
  }

  function render(profileKey) {
    var profile = profiles[profileKey] || profiles.mira;
    currentProfileKey = profiles[profileKey] ? profileKey : 'mira';
    document.getElementById('forecaster-avatar').textContent = profile.avatar;
    document.getElementById('forecaster-name').textContent = profile.name;
    document.getElementById('forecaster-bio').textContent = profile.bio;
    document.getElementById('forecaster-score').textContent = profile.score;
    document.getElementById('forecaster-rate').textContent = profile.rate;
    document.getElementById('forecaster-followers').textContent = profile.followers;
    document.getElementById('forecaster-total').textContent = String(profile.titles.length);
    document.getElementById('profile-predictions').innerHTML = predictionRows(profile).map(function (item) {
      var content = '<time class="history-date">' + item.date.replaceAll('-', '.') + '</time><span class="history-copy"><strong>' + item.title + '</strong><small>' + item.detail + '</small></span>';
      if (item.status === 'pending') {
        return '<button type="button" class="history-row history-row-button" data-pending-detail="' + item.id + '" aria-label="查看「' + item.title + '」的詳細內容並投票">' + content + '<span class="history-status pending">' + item.label + '<small>查看與投票 →</small></span></button>';
      }
      return '<article class="history-row" data-date="' + item.date + '">' + content + '<b class="history-status ' + item.status + '">' + item.label + '</b></article>';
    }).join('');
  }

  function closeDetail() {
    document.getElementById('prediction-detail-panel').hidden = true;
  }

  function openDetail(itemId) {
    var profile = profiles[currentProfileKey];
    var item = predictionRows(profile).find(function (row) { return row.id === itemId; });
    if (!item || item.status !== 'pending') return;
    var voteKey = currentProfileKey + '-' + item.id;
    var confidence = 54 + ((item.id * 9 + profile.name.length) % 35);
    var total = 1840 + item.id * 113;
    var state = detailVotes[voteKey] || { yes: Math.round(total * confidence / 100), no: 0, voted: false };
    if (!state.no) state.no = total - state.yes;
    detailVotes[voteKey] = state;
    var sum = state.yes + state.no;
    var yesPercent = state.yes / sum * 100;
    var noPercent = 100 - yesPercent;
    document.getElementById('detail-author').textContent = profile.name + ' · 發布於 ' + item.date.replaceAll('-', '.');
    document.getElementById('detail-prediction-content').innerHTML =
      '<span class="detail-pending-badge">等待結果</span><h2 id="detail-prediction-title">' + item.title + '</h2>' +
      '<p class="detail-sealed-copy">這則預言已在發布時間封存，內容及判定條件不可修改。結果公布後，系統將依指定來源自動結算。</p>' +
      '<div class="detail-grid"><span><small>發布時間</small><b>' + item.date.replaceAll('-', '.') + '</b></span><span><small>預計結算</small><b>結果公布後</b></span><span><small>驗證來源</small><b>' + profile.source + '</b></span></div>' +
      '<div class="belief detail-belief" data-vote-key="' + voteKey + '" data-yes-votes="' + state.yes + '" data-no-votes="' + state.no + '" data-voted="' + state.voted + '">' +
        '<div class="belief-head"><span>你相信這則預言嗎？</span><small><b data-detail-vote-total>' + sum.toLocaleString() + '</b> 人已表態</small></div>' +
        '<div class="belief-buttons"><button type="button" data-detail-vote="yes" style="--vote-share:' + yesPercent.toFixed(2) + '%"><i class="vote-fill" aria-hidden="true"></i><span class="vote-option"><strong>相信</strong><small><b data-detail-count="yes">' + state.yes.toLocaleString() + '</b> 人</small></span><b class="vote-percent" data-detail-percent="yes">' + yesPercent.toFixed(2) + '%</b></button>' +
        '<button type="button" data-detail-vote="no" style="--vote-share:' + noPercent.toFixed(2) + '%"><i class="vote-fill" aria-hidden="true"></i><span class="vote-option"><strong>不相信</strong><small><b data-detail-count="no">' + state.no.toLocaleString() + '</b> 人</small></span><b class="vote-percent" data-detail-percent="no">' + noPercent.toFixed(2) + '%</b></button></div>' +
        '<p class="vote-feedback' + (state.voted ? ' show' : '') + '" aria-live="polite">' + (state.voted ? '你已經投過這一則預言。' : '') + '</p></div>';
    if (state.voted) document.querySelector('[data-detail-vote="' + state.choice + '"]').classList.add('selected');
    document.getElementById('prediction-detail-panel').hidden = false;
  }

  function castDetailVote(button) {
    var belief = button.closest('.detail-belief');
    var key = belief.getAttribute('data-vote-key');
    var state = detailVotes[key];
    var feedback = belief.querySelector('.vote-feedback');
    if (state.voted) { feedback.textContent = '你已經投過這一則預言。'; feedback.classList.add('show'); return; }
    var choice = button.getAttribute('data-detail-vote');
    var before = state[choice];
    state[choice] += 1;
    state.voted = true;
    state.choice = choice;
    var sum = state.yes + state.no;
    var yesPercent = state.yes / sum * 100;
    var noPercent = 100 - yesPercent;
    belief.setAttribute('data-voted', 'true');
    belief.classList.add('vote-updated');
    belief.querySelector('[data-detail-vote-total]').textContent = sum.toLocaleString();
    belief.querySelector('[data-detail-count="yes"]').textContent = state.yes.toLocaleString();
    belief.querySelector('[data-detail-count="no"]').textContent = state.no.toLocaleString();
    belief.querySelector('[data-detail-percent="yes"]').textContent = yesPercent.toFixed(2) + '%';
    belief.querySelector('[data-detail-percent="no"]').textContent = noPercent.toFixed(2) + '%';
    belief.querySelector('[data-detail-vote="yes"]').style.setProperty('--vote-share', yesPercent.toFixed(2) + '%');
    belief.querySelector('[data-detail-vote="no"]').style.setProperty('--vote-share', noPercent.toFixed(2) + '%');
    button.classList.add('selected');
    var burst = document.createElement('span'); burst.className = 'vote-burst'; burst.textContent = '+1'; button.appendChild(burst);
    feedback.textContent = '已加入你的一票：' + (choice === 'yes' ? '相信' : '不相信') + ' ' + before.toLocaleString() + ' → ' + state[choice].toLocaleString() + ' 人。';
    feedback.classList.add('show');
  }

  function init() {
    document.querySelectorAll('[data-profile]').forEach(function (link) {
      link.addEventListener('click', function () { render(link.getAttribute('data-profile')); });
    });
    document.getElementById('profile-predictions').addEventListener('click', function (event) {
      var row = event.target.closest('[data-pending-detail]');
      if (row) openDetail(Number(row.getAttribute('data-pending-detail')));
    });
    document.getElementById('prediction-detail-panel').addEventListener('click', function (event) {
      if (event.target.closest('[data-close-prediction-detail]')) closeDetail();
      var vote = event.target.closest('[data-detail-vote]');
      if (vote) castDetailVote(vote);
    });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeDetail(); });
    render('mira');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());

