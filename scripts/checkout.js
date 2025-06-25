const checkoutForm = document.getElementById('checkout-Form');
const successModal = new bootstrap.Modal(document.getElementById('successModal'));

checkoutForm.addEventListener('submit', function (event) {
  event.preventDefault();

  successModal.show();

  setTimeout(() => {
    checkoutForm.reset();
  }, 2000);
});
