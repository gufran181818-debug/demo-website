// SaaSInterface 2026 Core Interactions — Olive & White Edition

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Category Filtering with smooth stagger
  const filterPills = document.querySelectorAll('.category-pill');
  const saasCards = document.querySelectorAll('.saas-card-col');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const category = pill.getAttribute('data-category');

      saasCards.forEach((card, index) => {
        const itemCategory = card.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          card.style.display = 'block';
          card.style.animation = `fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.04}s forwards`;
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 2. Command Palette (Ctrl+K or Cmd+K)
  const cmdModalElement = document.getElementById('cmdModal');
  let cmdModal = null;
  if (cmdModalElement && window.bootstrap) {
    cmdModal = new bootstrap.Modal(cmdModalElement);
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdModal) {
        cmdModal.show();
      }
    }
  });

  const searchTriggers = document.querySelectorAll('.search-trigger-btn');
  searchTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      if (cmdModal) cmdModal.show();
    });
  });

  // Filter items in command palette
  const cmdInput = document.getElementById('cmdSearchInput');
  const cmdItems = document.querySelectorAll('.cmd-item');
  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      cmdItems.forEach(item => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
      });
    });
  }

  // 3. Quick View Modal for SaaS Interfaces
  const viewButtons = document.querySelectorAll('.btn-view-preview, .saas-thumb-wrapper');
  const previewModalElement = document.getElementById('previewModal');
  let previewModal = null;
  if (previewModalElement && window.bootstrap) {
    previewModal = new bootstrap.Modal(previewModalElement);
  }

  viewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const parentCard = btn.closest('.saas-card');
      if (!parentCard) return;

      const title = parentCard.querySelector('.saas-app-name')?.innerText.trim() || 'Interface Preview';
      const category = parentCard.querySelector('.saas-tag')?.innerText.trim() || 'SaaS UI';
      const caption = parentCard.querySelector('.saas-caption')?.innerText.trim() || '';
      const imgSrc = parentCard.querySelector('.saas-thumb')?.src || '';

      const modalTitle = document.getElementById('modalPreviewTitle');
      const modalTag = document.getElementById('modalPreviewTag');
      const modalImg = document.getElementById('modalPreviewImg');
      const modalDesc = document.getElementById('modalPreviewDesc');

      if (modalTitle) modalTitle.innerText = title;
      if (modalTag) modalTag.innerText = category;
      if (modalImg) modalImg.src = imgSrc;
      if (modalDesc) modalDesc.innerText = caption;

      if (previewModal) previewModal.show();
    });
  });

  // 4. Like / Bookmark Toggle with Olive glow
  const bookmarkButtons = document.querySelectorAll('.btn-bookmark');
  bookmarkButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const icon = btn.querySelector('i');
      if (icon) {
        if (icon.classList.contains('bi-bookmark')) {
          icon.classList.remove('bi-bookmark');
          icon.classList.add('bi-bookmark-fill');
          icon.style.color = 'var(--olive-bright)';
          icon.style.filter = 'drop-shadow(0 0 8px var(--olive-glow))';
        } else {
          icon.classList.remove('bi-bookmark-fill');
          icon.classList.add('bi-bookmark');
          icon.style.color = '';
          icon.style.filter = '';
        }
      }
    });
  });

  // 5. Pricing Toggle (Monthly / Annual)
  const billingToggle = document.getElementById('billingToggle');
  if (billingToggle) {
    billingToggle.addEventListener('change', () => {
      const isAnnual = billingToggle.checked;
      const proPrice = document.getElementById('proPrice');
      const teamPrice = document.getElementById('teamPrice');

      if (isAnnual) {
        if (proPrice) proPrice.innerText = '$19';
        if (teamPrice) teamPrice.innerText = '$49';
      } else {
        if (proPrice) proPrice.innerText = '$24';
        if (teamPrice) teamPrice.innerText = '$59';
      }
    });
  }

  // 6. Subtle 3D Card Depth Tilt on Hover
  const tiltCards = document.querySelectorAll('.saas-card, .bento-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});
