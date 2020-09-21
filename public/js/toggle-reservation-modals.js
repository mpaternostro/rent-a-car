const $modal = document.querySelector('.modal');
const $html = document.querySelector('html');
const $finishButtons = document.querySelectorAll('.finish-button');
const $unblockButtons = document.querySelectorAll('.unblock-button');
const $payButtons = document.querySelectorAll('.pay-button');
const $cancelButtons = $modal.querySelectorAll('.cancel-button');

const handleOpenModal = new Event('openModal', { bubbles: true });
const handleCloseModal = new Event('closeModal', { bubbles: true });

/**
 * @param {Event} evt
 */
function fillModal(evt) {
  const $modalTitle = $modal.querySelector('.modal-card-title');
  const $statusButton = $modal.querySelector('.status-button');
  const $modalContent = $modal.querySelector('.modal-content');
  const $modalForm = $modal.querySelector('.modal-form');
  const reservation = evt.target.closest('.reservation-data');
  const { id, status } = reservation.dataset;

  if (status === 'Confirmed') {
    $modalTitle.textContent = 'Finish Reservation';
    $statusButton.textContent = 'Finish';
    $modalContent.textContent = `Are you sure you want to mark Reservation with ID ${id} as Finished ?`;
    $modalForm.action = `/reservation/finish/${id}`;
  } else if (status === 'Finished') {
    $modalTitle.textContent = 'Unblock Reservation';
    $statusButton.textContent = 'Unblock';
    $modalContent.textContent = `Are you sure you want to unblock finished Reservation with ID ${id} ?`;
    $modalForm.action = `/reservation/unblock/${id}`;
  } else if (status === 'Pending') {
    $modalTitle.textContent = 'Pay Reservation';
    $statusButton.textContent = 'Pay';
    $modalContent.textContent = `Are you sure you want to mark Reservation with ID ${id} as Paid ?`;
    $modalForm.action = `/reservation/pay/${id}`;
  }
}

/**
 * @param {Event} event.target
 */
function clickAway({ target }) {
  if (target.classList.contains('modal-background')) target.dispatchEvent(handleCloseModal);
}

/**
 * @param {Event} event
 */
function escKey(event) {
  if (event.key === 'Escape') event.target.dispatchEvent(handleCloseModal);
}

/**
 * @param {Event} evt
 */
function openModal(evt) {
  evt.stopPropagation();
  fillModal(evt);
  $html.classList.add('is-clipped');
  $modal.classList.add('is-active');
  $html.addEventListener('click', clickAway);
  $html.addEventListener('keydown', escKey);
}

function closeModal() {
  $html.classList.remove('is-clipped');
  $modal.classList.remove('is-active');
  $html.removeEventListener('click', clickAway);
}

document.addEventListener('openModal', openModal);
document.addEventListener('closeModal', closeModal);

$finishButtons.forEach((btn) =>
  btn.addEventListener('click', ({ target }) => target.dispatchEvent(handleOpenModal))
);
$unblockButtons.forEach((btn) =>
  btn.addEventListener('click', ({ target }) => target.dispatchEvent(handleOpenModal))
);
$payButtons.forEach((btn) =>
  btn.addEventListener('click', ({ target }) => target.dispatchEvent(handleOpenModal))
);
$cancelButtons.forEach((btn) =>
  btn.addEventListener('click', ({ target }) => target.dispatchEvent(handleCloseModal))
);
