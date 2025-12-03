document.querySelector('.logo').addEventListener('click', function(){
  		document.querySelector('.nav').classList.toggle('open');
		})

const modal = document.querySelector('.modal-window');
const modalBox = document.querySelector('.modal-box');
const closeBtn = document.querySelector('.close-btn');
const checkbox = document.getElementById('doNotShow');

if (localStorage.getItem('hideModal') === 'true') {
    modal.style.display = 'none';
} else {
    modal.style.display = 'flex';
}

function closeModal() {
    modal.classList.remove('show');
    modal.style.display = 'none';

    if (checkbox.checked) {
        localStorage.setItem('hideModal', 'true');
    }
}

closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (event) => {
    if (!modalBox.contains(event.target)) {
        closeModal();
    }
});

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        localStorage.setItem('hideModal', 'true');
    } else {
        localStorage.removeItem('hideModal');
    }
});