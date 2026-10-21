// Oneflow Interactive Script
document.addEventListener('DOMContentLoaded', () => {
  // Toast Helper
  const toast = document.getElementById('toast');
  function showToast(msg, bg = '#10b981') {
    toast.textContent = msg;
    toast.style.background = bg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // Counter Animation
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.ceil(count);
      }
    }, 30);
  });

  // Interactive Contract Builder
  const clientInput = document.getElementById('inputClientName');
  const projectSelect = document.getElementById('selectProjectType');
  const paymentSelect = document.getElementById('selectPaymentPlan');
  const sigInput = document.getElementById('inputSignatureName');
  const btnSign = document.getElementById('btnSignContract');

  const viewClient = document.getElementById('viewClientName');
  const viewService = document.getElementById('viewServiceName');
  const viewPrice = document.getElementById('viewPriceTag');
  const viewPayment = document.getElementById('viewPaymentSchedule');
  const clientSignStamp = document.getElementById('clientSignStamp');
  const signTextPlaceholder = document.getElementById('signTextPlaceholder');
  const signMetaPlaceholder = document.getElementById('signMetaPlaceholder');
  const docStatusBadge = document.getElementById('docStatusBadge');

  if (clientInput) {
    clientInput.addEventListener('input', e => {
      viewClient.textContent = e.target.value.trim() || 'Kompaniya nomi';
    });
  }

  if (projectSelect) {
    projectSelect.addEventListener('change', e => {
      const selectedOption = e.target.selectedOptions[0];
      const price = selectedOption.getAttribute('data-price');
      viewService.textContent = selectedOption.text.split('(')[0].trim();
      viewPrice.textContent = '$' + Number(price).toLocaleString() + ' USD';
    });
  }

  if (paymentSelect) {
    paymentSelect.addEventListener('change', e => {
      viewPayment.textContent = e.target.value;
    });
  }

  if (btnSign) {
    btnSign.addEventListener('click', () => {
      const sigVal = sigInput.value.trim();
      if (!sigVal) {
        showToast('Iltimos, elektron imzo maydoniga ismingizni yozing!', '#ef4444');
        sigInput.focus();
        return;
      }

      clientSignStamp.classList.add('done');
      signTextPlaceholder.textContent = sigVal;
      signMetaPlaceholder.textContent = 'Tasdiqlandi • ' + new Date().toLocaleTimeString('uz-UZ') + ' (256-bit SHA)';
      docStatusBadge.textContent = 'To'liq Imzolandi ✓';
      docStatusBadge.classList.add('signed-state');

      showToast('Shartnoma muvaffaqiyatli elektron imzolandi!');
    });
  }

  // ROI Calculator
  const rangeContracts = document.getElementById('rangeContracts');
  const rangeManagers = document.getElementById('rangeManagers');
  const lblContracts = document.getElementById('lblContractsCount');
  const lblManagers = document.getElementById('lblManagersCount');
  const resHours = document.getElementById('resSavedHours');
  const resMoney = document.getElementById('resSavedMoney');

  function updateROI() {
    const contracts = parseInt(rangeContracts.value);
    const managers = parseInt(rangeManagers.value);

    lblContracts.textContent = contracts + ' ta';
    lblManagers.textContent = managers + ' kishi';

    // Calculation logic: each contract saves ~0.75 hours; manager rate ~$36/hr
    const savedHoursYearly = Math.round(contracts * 12 * 0.75);
    const savedDollars = Math.round(savedHoursYearly * 36);

    resHours.textContent = savedHoursYearly.toLocaleString() + ' soat';
    resMoney.textContent = '$' + savedDollars.toLocaleString();
  }

  if (rangeContracts && rangeManagers) {
    rangeContracts.addEventListener('input', updateROI);
    rangeManagers.addEventListener('input', updateROI);
    updateROI();
  }

  // Modal Dialog
  const modal = document.getElementById('demoModal');
  const btnDemo = document.getElementById('btnRequestDemo');
  const btnStartFree = document.getElementById('btnStartFree');
  const btnLogin = document.getElementById('btnOpenLogin');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const formDemo = document.getElementById('formDemoRequest');

  function openModal() { modal.classList.add('active'); }
  function closeModal() { modal.classList.remove('active'); }

  if (btnDemo) btnDemo.addEventListener('click', openModal);
  if (btnStartFree) btnStartFree.addEventListener('click', openModal);
  if (btnLogin) btnLogin.addEventListener('click', openModal);
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeModal();
    });
  }

  if (formDemo) {
    formDemo.addEventListener('submit', e => {
      e.preventDefault();
      closeModal();
      showToast('So'rovingiz qabul qilindi! Menejerimiz tez orada bog'lanadi.');
      formDemo.reset();
    });
  }
});