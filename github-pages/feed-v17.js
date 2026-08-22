(function () {
  'use strict';

  var categories = {
    sports: { name: '球賽', icon: '◒', source: '賽事官方結果', entries: [
      ['勇士對湖人', '勇士獲勝'], ['洋基對紅襪', '總得分超過 8.5'], ['曼城對利物浦', '雙方都會進球'], ['道奇對教士', '道奇獲勝'], ['塞爾提克對公鹿', '塞爾提克獲勝'], ['日本對韓國', '日本隊先得分'], ['巴黎聖日耳曼對馬賽', '巴黎獲勝'], ['統一獅對中信兄弟', '比賽進入第九局仍未拉開三分'], ['西班牙對義大利', '正規時間平手'], ['網球決賽', '比賽打滿三盤']
    ]},
    stocks: { name: '股票', icon: '↗', source: '交易所收盤資料', entries: [
      ['台積電 2330', '年底高於 1,800 TWD'], ['NVIDIA NVDA', '年底高於 250 USD'], ['Apple AAPL', '本季創歷史新高'], ['Tesla TSLA', '三個月內高於 500 USD'], ['聯發科 2454', '年底高於 2,000 TWD'], ['Microsoft MSFT', '本季上漲超過 10%'], ['Amazon AMZN', '年底高於 260 USD'], ['鴻海 2317', '年底高於 260 TWD'], ['Alphabet GOOGL', '下季營收年增超過 12%'], ['台灣加權指數', '年底站上 30,000 點']
    ]},
    crypto: { name: '加密貨幣', icon: '₿', source: '指定交易所指數', entries: [
      ['Bitcoin', '年底突破 160,000 USD'], ['Ethereum', '年底突破 6,000 USD'], ['Solana', '三個月內高於 320 USD'], ['XRP', '年底高於 5 USD'], ['BNB', '年底高於 1,200 USD'], ['Dogecoin', '年底高於 0.6 USD'], ['Cardano', '三個月內高於 2 USD'], ['Avalanche', '年底高於 90 USD'], ['Chainlink', '年底高於 60 USD'], ['加密貨幣總市值', '年底突破 6 兆 USD']
    ]},
    world: { name: '世界事件', icon: '◎', source: '公開新聞與官方公告', entries: [
      ['全球航空業', '明年旅客量創新高'], ['歐洲能源市場', '冬季天然氣價格回落'], ['全球觀光', '明年國際旅遊人次成長 8%'], ['太空探索', '一年內出現新的登月任務'], ['全球電動車', '年度銷量突破新高'], ['國際油價', '年底低於每桶 90 美元'], ['全球人口', '明年都市人口比率繼續上升'], ['航空公司', '一年內開通新的超長程航線'], ['全球供應鏈', '明年運價低於今年高點'], ['國際大型展會', '明年參觀人數創新高']
    ]},
    politics: { name: '政治選舉', icon: '▥', source: '選委會與官方結果', entries: [
      ['某主要城市選舉', '投票率超過 65%'], ['某國國會選舉', '沒有單一政黨過半'], ['地方首長選舉', '現任者成功連任'], ['公投案', '同意票與不同意票差距小於 5%'], ['青年投票率', '高於上一屆'], ['女性候選人比例', '創歷屆新高'], ['不在籍投票', '使用人數創新高'], ['選舉辯論', '經濟議題成為最大焦點'], ['地方議會', '新人席次增加'], ['主要政黨支持度', '選前一個月差距縮小']
    ]},
    tech: { name: '科技科學', icon: '◇', source: '公司公告與研究機構', entries: [
      ['AI 手機', '一年內成為旗艦機標準配備'], ['人形機器人', '一年內進入量產測試'], ['量子運算', '一年內公布新的錯誤修正突破'], ['自駕計程車', '明年新增三座營運城市'], ['可摺疊裝置', '年度出貨量成長 25%'], ['太空公司', '一年內完成可回收火箭新紀錄'], ['AI 影片工具', '一年內支援長片一致角色'], ['智慧眼鏡', '明年銷量翻倍'], ['固態電池', '一年內公布量產時間表'], ['醫療 AI', '一年內取得新的臨床核准']
    ]},
    entertainment: { name: '娛樂', icon: '☆', source: '票房、榜單與官方公告', entries: [
      ['年度全球票房冠軍', '票房突破 15 億 USD'], ['串流影集', '新一季首週觀看創紀錄'], ['華語歌手', '世界巡演增加十個城市'], ['動畫電影', '成為年度票房前三名'], ['大型音樂節', '門票一天內售罄'], ['遊戲新作', '首月銷量突破一千萬套'], ['頒獎典禮', '串流作品拿下最佳影片'], ['虛擬偶像', '一年內舉辦實體巡演'], ['經典電影續集', '首週票房高於前作'], ['亞洲影集', '登上全球榜首']
    ]},
    life: { name: '生活與身邊事', icon: '⌂', source: '個人回報或相關人士驗證', entries: [
      ['家中的盆栽', '兩週內長出新芽'], ['社區咖啡店', '月底以前推出新的季節飲品'], ['家中寵物', '一週內恢復正常食慾'], ['辦公室團隊', '本月會有新成員加入'], ['住家附近', '三個月內開設新的便利商店'], ['朋友的旅行計畫', '月底以前改變目的地'], ['社區活動', '本季參加人數高於去年'], ['家中的老電器', '今年內需要更換'], ['日常運動目標', '四週內連續完成二十天'], ['陽台種植的番茄', '六週內結出第一顆果實']
    ]},
    nature: { name: '天氣自然', icon: '≈', source: '氣象與地質機構', entries: [
      ['台北夏季', '出現連續七天高溫 35°C'], ['西北太平洋颱風季', '命名颱風超過 20 個'], ['日本櫻花季', '東京比常年提早開花'], ['北極海冰', '九月面積低於近十年平均'], ['全球均溫', '明年再次位居歷史前三高'], ['台灣梅雨季', '總雨量高於去年'], ['歐洲夏季', '至少一地突破 45°C'], ['大西洋颶風季', '大型颶風數高於常年'], ['阿爾卑斯山', '冬季積雪低於長期平均'], ['澳洲夏季', '出現新一波大規模熱浪']
    ]}
  };

  var authors = ['星海觀測者', 'Kairos', 'Mira Chen', '北方之眼', '未來抄寫員', '晨霧資料室', '第七觀測站', '時間旅人', '遠方訊號', '明日備忘錄'];
  var selectedCategory = 'all';
  var selectedFeed = 'hot';
  var pinnedRecordId = '';
  var userPredictionsKey = 'foreseen_user_predictions_v1';
  var deviceIdKey = 'foreseen_device_id_v1';
  var voteReceiptKey = 'foreseen_vote_receipts_v1';
  var databaseRecords = [];
  var scopeNames = { public: '公開事件', group: '地區／群體事件', personal: '個人生活事件' };

  function apiUrl(path) {
    var origin = String(window.FORESEEN_API_ORIGIN || '').replace(/\/$/, '');
    return origin + path;
  }

  function publicUrl(path) {
    var base = String(window.FORESEEN_PUBLIC_BASE || window.location.origin).replace(/\/$/, '');
    return base + path;
  }

  function getDeviceId() {
    var id = '';
    try { id = window.localStorage.getItem(deviceIdKey) || ''; } catch (_) {}
    if (!/^[A-Za-z0-9_-]{8,80}$/.test(id)) {
      id = 'device_' + crypto.randomUUID();
      try { window.localStorage.setItem(deviceIdKey, id); } catch (_) {}
    }
    return id;
  }

  function voteReceipts() {
    try { return JSON.parse(window.localStorage.getItem(voteReceiptKey) || '{}'); } catch (_) { return {}; }
  }

  function rememberVote(code, choice) {
    try {
      var receipts = voteReceipts();
      receipts[code] = choice;
      window.localStorage.setItem(voteReceiptKey, JSON.stringify(receipts));
    } catch (_) {}
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character];
    });
  }

  function decodeSharedPrediction() {
    try {
      if (!window.location || !window.location.search) return null;
      var token = new URLSearchParams(window.location.search).get('share');
      if (!token) return null;
      var base64 = token.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) base64 += '=';
      var binary = window.atob(base64);
      var encoded = Array.prototype.map.call(binary, function (character) { return '%' + character.charCodeAt(0).toString(16).padStart(2, '0'); }).join('');
      var payload = JSON.parse(decodeURIComponent(encoded));
      if (!payload || payload.v !== 1 || typeof payload.title !== 'string' || payload.title.length > 500) return null;
      var category = categories[payload.category] ? payload.category : 'life';
      return {
        id: String(payload.id || 'shared'), category: category, categoryName: categories[category].name, icon: categories[category].icon,
        subject: payload.title, answer: '', source: String(payload.source || '分享者提供的驗證方式').slice(0, 100),
        author: String(payload.author || '分享的預言').slice(0, 50), confidence: Math.min(99, Math.max(1, Number(payload.confidence) || 50)),
        followers: 0, days: Math.max(0, Number(payload.days) || 0), index: 1000, shared: true,
        scope: ['public', 'group', 'personal'].includes(payload.scope) ? payload.scope : 'public',
        scopeLabel: scopeNames[payload.scope] || '公開事件', yesVotes: Math.max(0, Number(payload.yesVotes) || 0), noVotes: Math.max(0, Number(payload.noVotes) || 0), voted: false
      };
    } catch (_) { return null; }
  }

  var sharedPrediction = decodeSharedPrediction();
  if (sharedPrediction) selectedFeed = 'new';

  function predictionFromApi(item, shared) {
    var category = categories[item.category] ? item.category : 'life';
    var deadline = item.deadline ? new Date(item.deadline + 'T23:59:59') : null;
    var days = deadline && !Number.isNaN(deadline.getTime()) ? Math.max(0, Math.ceil((deadline.getTime() - Date.now()) / 86400000)) : 0;
    var receipts = voteReceipts();
    return {
      id: item.id, shortCode: item.shortCode, authorId: item.authorId,
      category: category, categoryName: categories[category].name, icon: categories[category].icon,
      subject: item.structured || item.raw || '尚未命名的預言', answer: '',
      source: item.source || item.verificationLabel || '社群驗證', author: item.authorName || '匿名預言者',
      confidence: Number(item.confidence) || 50, followers: Number(item.followers) || 0, days: days,
      index: 2000 + new Date(item.createdAt || 0).getTime(), database: true, shared: Boolean(shared),
      user: item.authorId === getDeviceId(), scope: item.scope || 'public', scopeLabel: scopeNames[item.scope] || '公開事件',
      verificationType: item.verificationType || 'community', yesVotes: Number(item.yesVotes) || 0,
      noVotes: Number(item.noVotes) || 0, voted: Boolean(receipts[item.shortCode]), status: item.status || 'published'
    };
  }

  async function loadRemoteRecords() {
    try {
      var response = await fetch(apiUrl('/api/predictions?limit=30'), { headers: { accept: 'application/json' } });
      var payload = await response.json();
      if (response.ok && Array.isArray(payload.items)) databaseRecords = payload.items.map(function (item) { return predictionFromApi(item, false); });
      var match = window.location.pathname.match(/\/p\/([23456789A-HJ-NP-Z]{7})\/?$/);
      var queryCode = new URLSearchParams(window.location.search).get('p');
      if (!match && /^[23456789A-HJ-NP-Z]{7}$/.test(queryCode || '')) match = [queryCode, queryCode];
      if (match) {
        var detailResponse = await fetch(apiUrl('/api/predictions/' + match[1]), { headers: { accept: 'application/json' } });
        var detailPayload = await detailResponse.json();
        if (detailResponse.ok && detailPayload.prediction) {
          sharedPrediction = predictionFromApi(detailPayload.prediction, true);
          selectedFeed = 'new';
        }
      }
    } catch (_) {}
  }

  function userRecordsFor(category) {
    var saved = [];
    try { saved = JSON.parse(window.localStorage.getItem(userPredictionsKey) || '[]'); } catch (_) { saved = []; }
    var records = saved.filter(function (item) {
      return !databaseRecords.some(function (record) { return record.id === item.id; });
    }).filter(function (item) {
      return !sharedPrediction || item.id !== sharedPrediction.id;
    }).filter(function (item) {
      return selectedFeed !== 'resolved' && (category === 'all' || item.category === category);
    }).map(function (item) {
      var deadline = item.deadline ? new Date(item.deadline + 'T00:00:00') : null;
      var days = deadline && !Number.isNaN(deadline.getTime()) ? Math.max(0, Math.ceil((deadline.getTime() - Date.now()) / 86400000)) : 0;
      var icon = categories[item.category] ? categories[item.category].icon : '✦';
      return {
        id: item.id, category: item.category || 'other', categoryName: item.categoryName || '其他預言', icon: icon,
        subject: item.structured || item.raw || '尚未命名的預言', answer: '', source: item.verificationLabel || '社群驗證',
        author: '我的預言', confidence: Number(item.confidence) || 50, followers: 0, days: days, index: 999,
        user: true, database: Boolean(item.shortCode), shortCode: item.shortCode || '', authorId: item.authorId || getDeviceId(), scope: item.scope || 'public', scopeLabel: item.scopeLabel || scopeNames[item.scope] || '公開事件',
        verificationType: item.verificationType || 'community', yesVotes: Number(item.yesVotes) || 0, noVotes: Number(item.noVotes) || 0, voted: Boolean(item.voted)
      };
    });
    if (sharedPrediction && selectedFeed !== 'resolved' && (category === 'all' || sharedPrediction.category === category)) records.unshift(sharedPrediction);
    return records;
  }

  function recordsFor(category) {
    var keys = category === 'all' ? Object.keys(categories) : [category];
    var records = [];
    keys.forEach(function (key) {
      var config = categories[key];
      config.entries.forEach(function (entry, index) {
        records.push({
          id: key + '-' + (index + 1), category: key, categoryName: config.name, icon: config.icon,
          subject: entry[0], answer: entry[1], source: config.source,
          author: authors[(index + keys.indexOf(key)) % authors.length],
          confidence: 51 + ((index * 7 + key.length) % 43), followers: 820 + ((index + 3) * 719),
          days: 2 + ((index * 11 + key.length) % 96), index: index, scope: key === 'life' ? 'personal' : 'public', scopeLabel: key === 'life' ? '個人生活事件' : '公開事件'
        });
      });
    });
    if (category === 'all') records = records.filter(function (_, index) { return index % 5 === 0; });
    if (selectedFeed === 'hot') records.sort(function (a, b) { return b.followers - a.followers; });
    if (selectedFeed === 'new') records.sort(function (a, b) { return b.index - a.index; });
    if (selectedFeed === 'soon') records.sort(function (a, b) { return a.days - b.days; });
    if (selectedFeed === 'resolved') records.sort(function (a, b) { return b.confidence - a.confidence; });
    var remote = databaseRecords.filter(function (item) {
      return (!sharedPrediction || item.id !== sharedPrediction.id) && selectedFeed !== 'resolved' && (category === 'all' || item.category === category);
    });
    var combined = (sharedPrediction && selectedFeed !== 'resolved' && (category === 'all' || sharedPrediction.category === category) ? [sharedPrediction] : [])
      .concat(remote, userRecordsFor(category).filter(function (item) { return !item.shared; }), records);
    if (pinnedRecordId) {
      var pinned = combined.filter(function (item) { return item.id === pinnedRecordId; })[0];
      if (pinned) combined = [pinned].concat(combined.filter(function (item) { return item.id !== pinnedRecordId; }));
    }
    return combined.slice(0, category === 'all' ? 20 : 12);
  }

  function card(record, number) {
    var resolved = selectedFeed === 'resolved';
    var customRecord = record.user || record.shared || record.database;
    var status = resolved ? '✓ 模擬驗證命中' : record.verificationType === 'fog' ? '🌫 模糊預言' : record.scope !== 'public' ? '◇ 社群驗證' : '✓ 可自動驗證';
    var totalVotes = customRecord ? record.yesVotes + record.noVotes : 1200 + number * 137;
    var yesVotes = customRecord ? record.yesVotes : Math.round(totalVotes * record.confidence / 100);
    var noVotes = customRecord ? record.noVotes : totalVotes - yesVotes;
    var yesPercent = totalVotes ? yesVotes / totalVotes * 100 : 0;
    var noPercent = totalVotes ? 100 - yesPercent : 0;
    var title = customRecord ? escapeHtml(record.subject) : record.subject + '：' + record.answer;
    var safeSource = escapeHtml(record.source);
    var safeAuthor = escapeHtml(record.author);
    var scope = record.scope || 'public';
    var scopeLabel = record.scopeLabel || scopeNames[scope] || '公開事件';
    var cardClass = record.user ? 'prediction-card mock-card user-prediction-card' : record.shared ? 'prediction-card mock-card shared-prediction-card' : 'prediction-card mock-card';
    var cardAttribute = ' data-record-id="' + escapeHtml(record.id) + '" data-confidence="' + record.confidence + '" data-source="' + safeSource + '" data-category-name="' + escapeHtml(record.categoryName) + '" data-scope="' + scope + '" data-scope-label="' + escapeHtml(scopeLabel) + '" data-short-code="' + escapeHtml(record.shortCode || '') + '" data-author-id="' + escapeHtml(record.authorId || '') + '" data-database="' + (record.database ? 'true' : 'false') + '"';
    if (record.user) cardAttribute += ' data-user-id="' + escapeHtml(record.id) + '" tabindex="-1"';
    var badge = record.user ? '<span class="user-sealed-badge">✓ 已永久封存</span>' : record.shared ? '<span class="shared-link-badge">↗ 分享連結</span>' : record.database ? '<span class="shared-link-badge">● 資料庫</span>' : '<span class="demo-badge">模擬資料 #' + (number + 1) + '</span>';
    var action = record.user ? '<span class="own-prediction-label">你發布的預言</span>' : record.shared ? '<span class="own-prediction-label">由相關人士分享</span>' : '<button class="follow-button" type="button">＋ 追隨</button>';
    return '<article class="' + cardClass + '" data-category="' + record.category + '" data-feed="hot new soon resolved"' + cardAttribute + '>' +
      '<div class="card-top"><div class="card-tags"><span class="category-badge">' + record.icon + ' ' + escapeHtml(record.categoryName) + '</span><span class="scope-badge ' + scope + '">' + escapeHtml(scopeLabel) + '</span></div>' + badge + '</div>' +
      '<div class="forecaster compact"><div class="avatar green">' + safeAuthor.charAt(0) + '</div><div><strong>' + safeAuthor + '</strong><span>' + (record.user ? '已保存至資料庫 · 封存後不可修改' : record.shared ? '透過短連結開啟 · 票數為全站統計' : record.followers.toLocaleString() + ' 位追隨者 · 預測信用建立中') + '</span></div>' + action + '</div>' +
      '<h3>' + title + '</h3>' +
      '<div class="mock-answer"><strong>' + (resolved ? '命中' : record.confidence + '%') + '</strong><span>' + (resolved ? '模擬結算結果' : '預測信心') + '</span></div>' +
      '<div class="card-grid"><span><small>狀態</small><b>' + status + '</b></span><span><small>距離結算</small><b>' + record.days + ' 天</b></span><span><small>驗證來源</small><b>' + record.source + '</b></span></div>' +
      '<div class="belief" data-yes-votes="' + yesVotes + '" data-no-votes="' + noVotes + '" data-voted="' + (record.voted ? 'true' : 'false') + '">' +
        '<div class="belief-head"><span>你相信嗎？</span><small><b data-vote-count>' + totalVotes.toLocaleString() + '</b> 人已表態</small></div>' +
        '<div class="belief-buttons">' +
          '<button type="button" data-demo-vote="yes" style="--vote-share:' + yesPercent.toFixed(2) + '%" aria-label="相信，目前 ' + yesVotes.toLocaleString() + ' 人">' +
            '<i class="vote-fill" aria-hidden="true"></i><span class="vote-option"><strong>相信</strong><small><b data-option-count="yes">' + yesVotes.toLocaleString() + '</b> 人</small></span><b class="vote-percent" data-vote-percent="yes">' + yesPercent.toFixed(2) + '%</b>' +
          '</button>' +
          '<button type="button" data-demo-vote="no" style="--vote-share:' + noPercent.toFixed(2) + '%" aria-label="不相信，目前 ' + noVotes.toLocaleString() + ' 人">' +
            '<i class="vote-fill" aria-hidden="true"></i><span class="vote-option"><strong>不相信</strong><small><b data-option-count="no">' + noVotes.toLocaleString() + '</b> 人</small></span><b class="vote-percent" data-vote-percent="no">' + noPercent.toFixed(2) + '%</b>' +
          '</button>' +
        '</div><p class="vote-feedback" aria-live="polite"></p>' +
      '</div>' +
      '<footer class="card-footer"><span>' + (record.database ? '資料庫已同步 · 票數跨裝置合併' : '首次分享或投票時會建立正式紀錄') + '</span><span>' + safeSource + '</span><button class="share-prediction" type="button" data-share-prediction>分享短連結 ↗</button></footer></article>';
  }

  function persistUserVote(card, yes, no) {
    var id = card && card.getAttribute('data-user-id');
    if (!id) return;
    try {
      var saved = JSON.parse(window.localStorage.getItem(userPredictionsKey) || '[]');
      saved = saved.map(function (item) { if (item.id === id) { item.yesVotes = yes; item.noVotes = no; item.voted = true; } return item; });
      window.localStorage.setItem(userPredictionsKey, JSON.stringify(saved));
    } catch (_) {}
  }

  function formatCount(value) {
    return Number(value).toLocaleString();
  }

  async function ensureStoredPrediction(card) {
    var existingCode = card.getAttribute('data-short-code');
    if (existingCode) return { shortCode: existingCode, authorId: card.getAttribute('data-author-id') };
    var daysText = card.querySelector('.card-grid span:nth-child(2) b');
    var deadline = new Date(Date.now() + ((Number(daysText && daysText.textContent.replace(/[^0-9]/g, '')) || 30) * 86400000));
    var payload = {
      deviceId: getDeviceId(), recordId: card.getAttribute('data-record-id'), category: card.getAttribute('data-category'),
      raw: card.querySelector('h3').textContent.trim(), structured: card.querySelector('h3').textContent.trim(),
      authorName: card.querySelector('.forecaster strong').textContent.trim(), confidence: Number(card.getAttribute('data-confidence')) || 50,
      source: card.getAttribute('data-source') || '社群驗證', verificationLabel: card.getAttribute('data-source') || '社群驗證',
      verificationType: card.getAttribute('data-scope') === 'public' ? 'auto' : 'community', scope: card.getAttribute('data-scope') || 'public',
      condition: 'equal', deadline: deadline.toISOString().slice(0, 10)
    };
    var response = await fetch(apiUrl('/api/predictions/share'), { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
    var result = await response.json();
    if (!response.ok || !result.prediction) throw new Error(result.error || '無法建立短連結。');
    card.setAttribute('data-short-code', result.prediction.shortCode);
    card.setAttribute('data-author-id', result.prediction.authorId);
    card.setAttribute('data-database', 'true');
    return result.prediction;
  }

  async function copyShareLink(button) {
    var card = button.closest('.prediction-card');
    if (!card) return;
    var original = button.textContent;
    button.disabled = true;
    button.textContent = '正在建立短連結…';
    function done() {
      button.textContent = '✓ 連結已複製';
      button.classList.add('copied');
      window.setTimeout(function () { button.textContent = original; button.classList.remove('copied'); button.disabled = false; }, 2200);
    }
    try {
      var prediction = await ensureStoredPrediction(card);
      var url = publicUrl('/p/' + prediction.shortCode + '#discover');
      if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(url);
      else fallbackCopy(url, function () {});
      done();
    } catch (error) {
      button.textContent = '建立失敗，請重試';
      button.disabled = false;
      window.setTimeout(function () { button.textContent = original; }, 2400);
    }
  }

  function fallbackCopy(text, done) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    try { document.execCommand('copy'); done(); } finally { area.remove(); }
  }

  async function castVote(button) {
    var belief = button.closest('.belief');
    if (!belief || belief.getAttribute('data-voted') === 'true' || belief.getAttribute('data-busy') === 'true') {
      if (belief) {
        var existingFeedback = belief.querySelector('.vote-feedback');
        existingFeedback.textContent = belief.getAttribute('data-busy') === 'true' ? '正在送出你的一票…' : '你已經投過這一則預言。';
        existingFeedback.classList.remove('show');
        void existingFeedback.offsetWidth;
        existingFeedback.classList.add('show');
      }
      return;
    }

    belief.setAttribute('data-busy', 'true');
    var choice = button.getAttribute('data-demo-vote');
    var yesBefore = Number(belief.getAttribute('data-yes-votes'));
    var noBefore = Number(belief.getAttribute('data-no-votes'));
    var card = belief.closest('.prediction-card');
    var feedback = belief.querySelector('.vote-feedback');
    feedback.textContent = '正在同步全站票數…';
    feedback.classList.add('show');
    try {
      var stored = await ensureStoredPrediction(card);
      var response = await fetch(apiUrl('/api/predictions/' + stored.shortCode + '/votes'), {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ deviceId: getDeviceId(), choice: choice })
      });
      var result = await response.json();
      if (!response.ok || !result.prediction) throw new Error(result.error || '投票暫時無法送出。');
      var yesAfter = Number(result.prediction.yesVotes) || 0;
      var noAfter = Number(result.prediction.noVotes) || 0;
      var totalAfter = yesAfter + noAfter;
      var yesPercent = totalAfter ? yesAfter / totalAfter * 100 : 0;
      var noPercent = totalAfter ? 100 - yesPercent : 0;
      var actualChoice = result.choice || choice;
      var before = actualChoice === 'yes' ? yesBefore : noBefore;
      var after = actualChoice === 'yes' ? yesAfter : noAfter;
      var label = actualChoice === 'yes' ? '相信' : '不相信';
      belief.setAttribute('data-yes-votes', yesAfter);
      belief.setAttribute('data-no-votes', noAfter);
      belief.setAttribute('data-voted', 'true');
      belief.classList.add('vote-updated');
      belief.querySelector('[data-vote-count]').textContent = formatCount(totalAfter);
      belief.querySelector('[data-option-count="yes"]').textContent = formatCount(yesAfter);
      belief.querySelector('[data-option-count="no"]').textContent = formatCount(noAfter);
      belief.querySelector('[data-vote-percent="yes"]').textContent = yesPercent.toFixed(2) + '%';
      belief.querySelector('[data-vote-percent="no"]').textContent = noPercent.toFixed(2) + '%';
      var yesButton = belief.querySelector('[data-demo-vote="yes"]');
      var noButton = belief.querySelector('[data-demo-vote="no"]');
      yesButton.style.setProperty('--vote-share', yesPercent.toFixed(2) + '%');
      noButton.style.setProperty('--vote-share', noPercent.toFixed(2) + '%');
      yesButton.setAttribute('aria-label', '相信，目前 ' + formatCount(yesAfter) + ' 人');
      noButton.setAttribute('aria-label', '不相信，目前 ' + formatCount(noAfter) + ' 人');
      [yesButton, noButton].forEach(function (item) { item.setAttribute('aria-disabled', 'true'); });
      button.classList.add('selected');
      var burst = document.createElement('span');
      burst.className = 'vote-burst';
      burst.textContent = result.alreadyVoted ? '已投過' : '+1';
      burst.setAttribute('aria-hidden', 'true');
      button.appendChild(burst);
      feedback.textContent = result.alreadyVoted
        ? '系統確認你已投過：' + label + '；目前全站共 ' + formatCount(totalAfter) + ' 人表態。'
        : '已加入全站票數：' + label + ' ' + formatCount(before) + ' → ' + formatCount(after) + ' 人；目前共 ' + formatCount(totalAfter) + ' 人表態。';
      rememberVote(stored.shortCode, actualChoice);
      persistUserVote(card, yesAfter, noAfter);
    } catch (error) {
      feedback.textContent = error.message || '投票失敗，請稍後重試。';
    } finally {
      belief.removeAttribute('data-busy');
    }
  }

  async function toggleFollow(button) {
    if (button.disabled) return;
    var card = button.closest('.prediction-card');
    var original = button.textContent;
    button.disabled = true;
    button.textContent = '同步中…';
    try {
      var stored = await ensureStoredPrediction(card);
      var authorId = stored.authorId || card.getAttribute('data-author-id');
      var response = await fetch(apiUrl('/api/forecasters/' + encodeURIComponent(authorId) + '/follow'), {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ deviceId: getDeviceId() })
      });
      var result = await response.json();
      if (!response.ok) throw new Error(result.error || '無法更新追隨狀態。');
      button.classList.toggle('following', result.following);
      button.textContent = result.following ? '✓ 已追隨' : '＋ 追隨';
      button.title = '目前 ' + formatCount(result.followers) + ' 位追隨者';
    } catch (error) {
      button.textContent = '請稍後重試';
      window.setTimeout(function () { button.textContent = original; }, 1800);
    } finally { button.disabled = false; }
  }

  function render() {
    var feed = document.getElementById('prediction-feed');
    if (!feed) return;
    var records = recordsFor(selectedCategory);
    feed.innerHTML = '<div class="mock-data-note"><span><strong>正式資料庫已啟用</strong>　新預言、短連結、投票與追隨會跨裝置同步；其餘範例仍標示為模擬資料。</span><b>' + records.length + ' 則</b></div>' + records.map(card).join('');
  }

  function openSignalPrediction(button) {
    var category = button.getAttribute('data-signal-category');
    var recordId = button.getAttribute('data-signal-record');
    if (!categories[category] || !recordId) return;
    selectedCategory = category;
    selectedFeed = 'hot';
    pinnedRecordId = recordId;
    document.querySelectorAll('.topic').forEach(function (item) {
      item.classList.toggle('active', item.getAttribute('data-category') === category);
    });
    document.querySelectorAll('.feed-tabs [data-feed]').forEach(function (item) {
      item.classList.toggle('active', item.getAttribute('data-feed') === 'hot');
    });
    render();
    pinnedRecordId = '';
    window.requestAnimationFrame(function () {
      var target = document.querySelector('.prediction-card[data-record-id="' + recordId + '"]');
      if (!target) return;
      target.setAttribute('tabindex', '-1');
      target.classList.remove('attention');
      void target.offsetWidth;
      target.classList.add('attention');
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.setTimeout(function () {
        target.classList.remove('attention');
        if (!target.classList.contains('user-prediction-card')) target.removeAttribute('tabindex');
      }, 2400);
    });
  }

  function init() {
    document.querySelectorAll('[data-signal-record]').forEach(function (button) {
      button.addEventListener('click', function () { openSignalPrediction(button); });
    });
    document.querySelectorAll('.topic').forEach(function (button) {
      button.addEventListener('click', function () {
        selectedCategory = button.getAttribute('data-category') || 'all';
        document.querySelectorAll('.topic').forEach(function (item) { item.classList.toggle('active', item === button); });
        render();
      });
    });
    document.querySelectorAll('[data-feed]').forEach(function (button) {
      if (!button.closest('.feed-tabs')) return;
      button.addEventListener('click', function () {
        selectedFeed = button.getAttribute('data-feed') || 'hot';
        document.querySelectorAll('.feed-tabs [data-feed]').forEach(function (item) { item.classList.toggle('active', item === button); });
        render();
      });
    });
    var feed = document.getElementById('prediction-feed');
    if (feed) feed.addEventListener('click', function (event) {
      var share = event.target.closest('[data-share-prediction]');
      if (share) { copyShareLink(share); return; }
      var follow = event.target.closest('.follow-button');
      if (follow) { toggleFollow(follow); return; }
      var vote = event.target.closest('[data-demo-vote]');
      if (vote) castVote(vote);
    });
    window.addEventListener('foreseen:prediction-created', function (event) {
      if (event.detail && event.detail.shortCode) databaseRecords.unshift(predictionFromApi(event.detail, false));
      selectedCategory = 'all';
      selectedFeed = 'new';
      document.querySelectorAll('.topic').forEach(function (item) { item.classList.toggle('active', item.getAttribute('data-category') === 'all'); });
      document.querySelectorAll('.feed-tabs [data-feed]').forEach(function (item) { item.classList.toggle('active', item.getAttribute('data-feed') === 'new'); });
      render();
    });
    render();
    loadRemoteRecords().then(render);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
}());

