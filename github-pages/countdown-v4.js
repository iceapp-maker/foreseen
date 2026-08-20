/**
 * FORESEEN Countdown & Live Dashboard Module
 * Version: v4.1 (With interactive tag navigation)
 */

(function () {
  'use strict';

  // 預設首頁熱門預言數據
  const DASHBOARD_METRICS = [
    { id: 'pred-nvda', symbol: 'NVDA', text: 'NVDA · 72%', targetTime: '2026-12-31T23:59:59', title: 'NVIDIA 財報與 AI 晶片市場份額預測' },
    { id: 'pred-nba', symbol: 'NBA', text: 'NBA · 64%', targetTime: '2026-06-20T20:00:00', title: 'NBA 總冠軍賽系列賽預測' },
    { id: 'pred-btc', symbol: 'BTC', text: 'BTC · 51%', targetTime: '2026-11-15T00:00:00', title: 'Bitcoin 突破新高價格預測' }
  ];

  // 平滑滾動並高亮目標卡片
  function scrollToPrediction(keyword) {
    let targetCard = null;

    // 1. 優先比對 data-symbol、data-id 或 id
    targetCard = document.querySelector(`[data-symbol="${keyword}"], #${keyword.toLowerCase()}, #pred-${keyword.toLowerCase()}`);

    // 2. 若無精確 ID，則搜尋卡片文字內容
    if (!targetCard) {
      const cards = document.querySelectorAll('.prediction-card, .feed-card, .event-card, .feed-item');
      for (const card of cards) {
        const content = (card.textContent || '').toUpperCase();
        if (content.includes(keyword.toUpperCase())) {
          targetCard = card;
          break;
        }
      }
    }

    // 3. 執行滾動與視覺高亮
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetCard.classList.remove('highlight-pulse');
      void targetCard.offsetWidth; // 觸發 reflow 重新播放動畫
      targetCard.classList.add('highlight-pulse');
      setTimeout(() => {
        targetCard.classList.remove('highlight-pulse');
      }, 2500);
    } else {
      // 若找不到特定卡片，滾動至預言列表區域
      const feedContainer = document.querySelector('#feed, #feed-container, .feed-section, main');
      if (feedContainer) {
        feedContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // 倒數計時計算邏輯
  function updateCountdownDisplay() {
    const countdownEl = document.getElementById('main-countdown');
    if (!countdownEl) return;

    const now = new Date().getTime();
    // 預設倒數至目標事件時間（此處以今年底為基準）
    const target = new Date('2026-12-31T23:59:59').getTime();
    const diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl = document.getElementById('cd-mins');
    const secsEl = document.getElementById('cd-secs');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  // 初始化周圍儀表板標籤與點擊互動
  function initDashboardTags() {
    const orbitContainer = document.querySelector('.orbit-badges, .dashboard-metrics, .countdown-badges');
    
    // 如果頁面中已有預設標籤，為其綁定點擊跳轉事件
    const existingBadges = document.querySelectorAll('.orbit-badge, .metric-tag, [data-target-symbol]');
    if (existingBadges.length > 0) {
      existingBadges.forEach(badge => {
        badge.style.cursor = 'pointer';
        badge.addEventListener('click', function (e) {
          e.preventDefault();
          const symbol = this.getAttribute('data-target-symbol') || this.textContent.trim().split(/[\s·]/)[0];
          scrollToPrediction(symbol);
        });
      });
    } else if (orbitContainer) {
      // 若容器為空則動態產生標籤
      orbitContainer.innerHTML = '';
      DASHBOARD_METRICS.forEach(item => {
        const badge = document.createElement('div');
        badge.className = 'orbit-badge';
        badge.setAttribute('data-target-symbol', item.symbol);
        badge.title = `點擊查看 ${item.symbol} 相關預言`;
        badge.innerHTML = `<span>${item.text}</span>`;
        badge.addEventListener('click', (e) => {
          e.preventDefault();
          scrollToPrediction(item.symbol);
        });
        orbitContainer.appendChild(badge);
      });
    }

    // 全域事件委派作為保底監聽
    document.addEventListener('click', function (e) {
      const targetTag = e.target.closest('.orbit-badge, .metric-tag, .dashboard-tag');
      if (targetTag) {
        const text = targetTag.textContent || '';
        if (text.includes('NVDA')) scrollToPrediction('NVDA');
        else if (text.includes('NBA')) scrollToPrediction('NBA');
        else if (text.includes('BTC')) scrollToPrediction('BTC');
      }
    });
  }

  // 初始化啟動
  function init() {
    initDashboardTags();
    updateCountdownDisplay();
    setInterval(updateCountdownDisplay, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
