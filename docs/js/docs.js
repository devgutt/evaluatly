
const ham = document.getElementById('menu-ham');
const list = document.getElementById('menu-list');

ham.addEventListener('click', function (e) {
    e.preventDefault();
    list.style.display = list.style.display != 'none' ? 'none' : 'block';
});

