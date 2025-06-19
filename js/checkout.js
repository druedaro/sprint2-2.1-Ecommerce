
document.getElementById('checkout-Form').addEventListener('submit', function(e) {
	e.preventDefault();
	
	const form = e.target;
	const inputs = form.querySelectorAll('input[required]');
	let isValid = true;
	
	inputs.forEach(input => {
		input.classList.remove('is-invalid', 'is-valid');
	});
	
	inputs.forEach(input => {
		if (!input.checkValidity()) {
			input.classList.add('is-invalid');
			isValid = false;
		} else {
			input.classList.add('is-valid');
		}
	});
	
	if (isValid) {
		const successModal = new bootstrap.Modal(document.getElementById('successModal'));
		successModal.show();
		
		setTimeout(() => {
			form.reset();
			inputs.forEach(input => {
				input.classList.remove('is-valid');
			});
		}, 2000);
	}
});
