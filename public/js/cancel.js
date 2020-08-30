/* eslint-disable no-undef */
function cancelForm() {
  window.history.back();
}

document.querySelector('.cancel-button').addEventListener('click', cancelForm);
