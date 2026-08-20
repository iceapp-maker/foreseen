(function () {
'use strict';

if (window.__foreseenAppInitialized) return;
window.__foreseenAppInitialized = true;

const findOne = (selector, scope = document) => scope.querySelector(selector);
const findAll = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const toast = findOne('#toast');
const wizard = findOne('#prediction-wizard');
const appealDialog = findOne('#appeal-dialog');

const categoryNames = {
  stocks: '股票金融', sports: '球賽', crypto: '加密貨幣', world: '世界事件',
  tech: '科技科學', life: '生活與身邊事', other: '其他預言', politics: '政治選舉', entertainment: '娛樂', nature: '天氣自然'
};

const scopeNames = { public: '公開事件', group: '地區／群體事件', personal: '個人生活事件' };

let wizardStep = 1;
let wizardCategory = '';
let latestPredictionId = '';
const userPredictionsKey = 'foreseen_user_predictions_v1';
const deviceIdKey = 'foreseen_device_id_v1';

function apiUrl(path) {
  const origin = String(window.FORESEEN_API_ORIGIN || '').replace(/\/$/, '');
  return `${origin}${path}`;
}

function getDeviceId() {
  let id = '';
  try { id = localStorage.getItem(deviceIdKey) || ''; } catch {}
  if (!/^[A-Za-z0-9_-]{8,80}$/.test(id)) {
    id = `device_${crypto.randomUUID()}`;
    try { localStorage.setItem(deviceIdKey, id); } catch {}
  }
  return id;
}

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove('show'), 2300);
}

function openDialog(dialog) {
  if (!dialog || dialog.open) return;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
}

function closeDialog(dialog) {
  if (!dialog?.open) return;
  if (typeof dialog.close === 'function') dialog.close();
  else dialog.removeAttribute('open');
}

function loadUserPredictions() {
  try { return JSON.parse(localStorage.getItem(userPredictionsKey) || '[]'); }
  catch { return []; }
}

function saveUserPrediction(prediction) {
  const predictions = loadUserPredictions();
  predictions.unshift(prediction);
  try { localStorage.setItem(userPredictionsKey, JSON.stringify(predictions.slice(0, 30))); }
  catch { notify('瀏覽器無法保存資料，但仍可繼續測試本次流程。'); }
}

findAll('[data-close]').forEach((button) => button.addEventListener('click', () => closeDialog(findOne(`#${button.dataset.close}`))));
findAll('dialog').forEach((dialog) => dialog.addEventListener('click', (event) => {
  if (event.target === dialog) closeDialog(dialog);
}));

function showWizardStep(step) {
  wizardStep = step;
  findAll('.wizard-step', wizard).forEach((panel) => panel.classList.toggle('active', Number(panel.dataset.step) === step));
  const labels = ['選擇主題', '說出預言', '補齊條件', '確認封存'];
  findAll('.progress i', wizard).forEach((bar, index) => bar.classList.toggle('active', index < Math.min(step, 4)));
  findOne('#progress-text').textContent = step <= 4 ? `${step}／4 ${labels[step - 1]}` : '完成封存';
  findOne('.progress', wizard).style.visibility = step === 5 ? 'hidden' : 'visible';
}

function resetWizard() {
  wizardCategory = '';
  findOne('#raw-prediction').value = '';
  findOne('#prediction-count').textContent = '0';
  findOne('[data-wizard-next]').disabled = true;
  findOne('#target-input').value = '';
  findOne('#value-input').value = '';
  findOne('#confidence-input').value = '70';
  findOne('#confidence-value').textContent = '70%';
  findOne('#seal-consent').checked = false;
  findOne('#seal-button').disabled = true;
  latestPredictionId = '';
  showWizardStep(1);
}

findAll('[data-open-wizard]').forEach((button) => button.addEventListener('click', () => {
  resetWizard();
  openDialog(wizard);
}));

findAll('[data-wizard-category]').forEach((button) => button.addEventListener('click', () => {
  wizardCategory = button.dataset.wizardCategory;
  showWizardStep(2);
  setTimeout(() => findOne('#raw-prediction').focus(), 80);
}));

findOne('#raw-prediction').addEventListener('input', (event) => {
  const length = event.target.value.trim().length;
  findOne('#prediction-count').textContent = event.target.value.length;
  findOne('[data-wizard-next]').disabled = length < 8;
});

findAll('[data-example]').forEach((button) => button.addEventListener('click', () => {
  findOne('#raw-prediction').value = button.dataset.example;
  findOne('#raw-prediction').dispatchEvent(new Event('input'));
}));

function configureGuide() {
  const configs = {
    stocks: ['股票或指數', '例如：NVDA、台積電 2330', '價格或漲跌結果', '例如：250 USD'],
    crypto: ['幣種或指數', '例如：Bitcoin', '價格或漲跌結果', '例如：130,000 USD'],
    sports: ['比賽或隊伍', '例如：勇士 vs 湖人', '勝方或比分', '例如：勇士獲勝'],
    tech: ['科技事件或產品', '例如：載人飛行汽車', '明確成果', '例如：公開載人飛行30分鐘'],
    world: ['事件主體或地區', '例如：全球航空事件', '明確結果', '例如：大型客機墜海'],
    life: ['生活事件涉及的對象', '例如：家中的寵物、同事或家人', '你認為會發生什麼', '例如：一週內康復、月底以前離職'],
    other: ['預言涉及的對象', '例如：某座沿海城市', '你認為會發生什麼', '請盡量具體']
  };
  const config = configs[wizardCategory] || configs.other;
  findOne('#target-label').textContent = config[0];
  findOne('#target-input').placeholder = config[1];
  findOne('#value-label').textContent = config[2];
  findOne('#value-input').placeholder = config[3];
  if (wizardCategory === 'sports') findOne('#condition-input').value = 'equal';
  setScopeValue(['life', 'other'].includes(wizardCategory) ? 'personal' : 'public');
  updatePrivacyNote();
}

function getScopeValue() {
  return findOne('#scope-input').value || findOne('#scope-input').getAttribute('data-current-scope') || 'public';
}

function setScopeValue(value) {
  const input = findOne('#scope-input');
  input.setAttribute('data-current-scope', value);
  try { input.value = value; } catch {}
  findAll('option', input).forEach((option) => option.toggleAttribute('selected', option.value === value));
}

function updatePrivacyNote() {
  const input = findOne('#scope-input');
  if (input.value) input.setAttribute('data-current-scope', input.value);
  const scope = getScopeValue();
  const note = findOne('#privacy-note');
  note.hidden = scope === 'public';
  findOne('#privacy-note-copy').textContent = scope === 'group'
    ? '請勿填寫同學、同事或社群成員的真實姓名、班級、公司部門及聯絡方式。'
    : '請勿公開可辨識第三人的姓名、學校、地址、電話或健康資料；分享連結前也請再次確認。';
}

findOne('[data-wizard-next]').addEventListener('click', () => {
  configureGuide();
  showWizardStep(3);
});

findAll('[data-wizard-back]').forEach((button) => button.addEventListener('click', () => showWizardStep(Math.max(1, wizardStep - 1))));

findOne('#confidence-input').addEventListener('input', (event) => {
  findOne('#confidence-value').textContent = `${event.target.value}%`;
});
findOne('#scope-input').addEventListener('change', updatePrivacyNote);

function classifyPrediction() {
  const raw = findOne('#raw-prediction').value.trim();
  const target = findOne('#target-input').value.trim();
  const value = findOne('#value-input').value.trim();
  const date = findOne('#date-input').value;
  const confidence = findOne('#confidence-input').value;
  const scope = getScopeValue();
  const hasNumber = /\d/.test(raw + value);
  const structuredCategory = ['stocks', 'crypto', 'sports'].includes(wizardCategory);
  const enoughFields = target.length > 1 && value.length > 1 && Boolean(date);
  let type = 'fog';
  if (structuredCategory && enoughFields && (hasNumber || wizardCategory === 'sports')) type = 'auto';
  else if (enoughFields && date) type = 'community';
  if (scope !== 'public' && type === 'auto') type = 'community';

  const result = findOne('#analysis-result');
  result.className = `analysis-result ${type}-result`;
  const icon = type === 'auto' ? '✓' : type === 'community' ? '◇' : '🌫';
  const title = type === 'auto' ? '可以自動驗證' : type === 'community' ? '需要社群驗證' : '模糊預言';
  const copy = type === 'auto'
    ? '結果公布後，系統會依封存規則與指定資料來源自動結算。'
    : type === 'community'
      ? '條件已經足夠明確，但沒有可直接連線的結果來源；事件發生後由社群查證。'
      : '目前缺少足夠明確的結果條件，將以娛樂性質封存並由社群判斷是否應驗。';
  findOne('.analysis-icon', result).textContent = icon;
  findOne('#analysis-title').textContent = title;
  findOne('#analysis-copy').textContent = copy;
  findOne('#preview-category').textContent = categoryNames[wizardCategory] || '其他預言';
  findOne('#preview-verification').textContent = type === 'auto' ? '自動驗證' : type === 'community' ? '社群驗證' : '模糊預言／娛樂性質';
  findOne('#preview-confidence').textContent = `${confidence}%`;
  findOne('#preview-scope').textContent = scopeNames[scope] || '公開事件';

  const conditionText = { higher: '高於', lower: '低於', equal: '達成／發生', range: '介於' }[findOne('#condition-input').value || 'higher'];
  findOne('#structured-prediction').textContent = enoughFields
    ? `${target} 將在 ${date} 以前${conditionText}「${value}」。`
    : raw;
  result.dataset.type = type;
  showWizardStep(4);
}

findOne('[data-analyze]').addEventListener('click', classifyPrediction);
findOne('#seal-consent').addEventListener('change', (event) => findOne('#seal-button').disabled = !event.target.checked);
findOne('#seal-button').addEventListener('click', async () => {
  const sealButton = findOne('#seal-button');
  sealButton.disabled = true;
  const originalLabel = sealButton.innerHTML;
  sealButton.textContent = '正在封存到資料庫…';
  const type = findOne('#analysis-result').dataset.type || 'fog';
  const draft = {
    deviceId: getDeviceId(),
    category: wizardCategory || 'other',
    categoryName: categoryNames[wizardCategory] || '其他預言',
    raw: findOne('#raw-prediction').value.trim(),
    structured: findOne('#structured-prediction').textContent.trim(),
    target: findOne('#target-input').value.trim(),
    value: findOne('#value-input').value.trim(),
    condition: findOne('#condition-input').value,
    deadline: findOne('#date-input').value,
    confidence: Number(findOne('#confidence-input').value),
    verificationType: type,
    verificationLabel: findOne('#preview-verification').textContent,
    scope: getScopeValue(),
    scopeLabel: scopeNames[getScopeValue()] || '公開事件',
    createdAt: new Date().toISOString(),
    yesVotes: 0,
    noVotes: 0,
    voted: false
  };
  try {
    const response = await fetch(apiUrl('/api/predictions'), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(draft)
    });
    const payload = await response.json();
    if (!response.ok || !payload.prediction) throw new Error(payload.error || '資料庫暫時無法封存。');
    const prediction = { ...draft, ...payload.prediction, categoryName: draft.categoryName, user: true, voted: false };
    saveUserPrediction(prediction);
    latestPredictionId = prediction.id;
    window.dispatchEvent(new CustomEvent('foreseen:prediction-created', { detail: prediction }));
    findOne('#sealed-id').textContent = `P-${prediction.shortCode}`;
    showWizardStep(5);
    notify('預言已永久封存，短連結也已建立。');
  } catch (error) {
    notify(error.message || '封存失敗，請稍後再試。');
    sealButton.disabled = false;
  } finally {
    sealButton.innerHTML = originalLabel;
  }
});
findOne('[data-finish]').addEventListener('click', () => {
  closeDialog(wizard);
  findOne('#discover').scrollIntoView({ behavior: 'smooth' });
  if (latestPredictionId) {
    setTimeout(() => document.querySelector(`[data-user-id="${latestPredictionId}"]`)?.focus(), 450);
  }
});

findAll('.follow-button').forEach((button) => button.addEventListener('click', () => {
  const following = button.classList.toggle('following');
  button.textContent = following ? '✓ 已追隨' : '＋ 追隨';
  notify(following ? '之後會通知你這位預測者的新預言。' : '已取消追隨。');
}));

findAll('.belief-buttons button').forEach((button) => button.addEventListener('click', () => {
  const group = button.closest('.belief');
  if (findOne('.selected', group)) {
    notify('你已經表態過了。');
    return;
  }
  const yes = findOne('[data-percent="yes"]', group);
  const no = findOne('[data-percent="no"]', group);
  const yesValue = Number(yes.textContent.replace('%', ''));
  const selectedYes = button.dataset.vote === 'yes';
  yes.textContent = `${Math.min(99, Math.max(1, yesValue + (selectedYes ? 1 : -1)))}%`;
  no.textContent = `${100 - Number(yes.textContent.replace('%', ''))}%`;
  button.classList.add('selected');
  const count = findOne('[data-vote-count]', group);
  count.textContent = (Number(count.textContent.replaceAll(',', '')) + 1).toLocaleString('en-US');
  notify(selectedYes ? '已記錄：你相信這則預言。' : '已記錄：你不相信這則預言。');
}));

findAll('[data-appeal]').forEach((button) => button.addEventListener('click', () => {
  const community = button.dataset.appeal === 'community';
  findOne('#auto-appeal').hidden = community;
  findOne('#community-review').hidden = !community;
  findOne('#appeal-title').textContent = community ? '社群驗證' : '對判定提出異議';
  openDialog(appealDialog);
}));

findOne('#submit-appeal').addEventListener('click', () => {
  const selected = findOne('input[name="appeal"]:checked');
  if (!selected) {
    notify('請先選擇一項異議原因。');
    return;
  }
  closeDialog(appealDialog);
  notify('技術異議已登記，系統會重新比對封存規則與資料。');
});

findOne('#evidence-button').addEventListener('click', () => notify('事件期限尚未到，現在還不能提交結果證據。'));

}());

