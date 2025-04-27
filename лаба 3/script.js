document.addEventListener('DOMContentLoaded', () => {
    // Найти форму обратной связи
    const form = document.querySelector('form');

    // Обработчик события onSubmit
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Отключить переход на другую страницу

        // Получение данных из полей формы
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Проверка обязательных полей
        if (!name || !email || !message) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }

        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Введите корректный email.');
            return;
        }

        // Вывод данных в консоль
        console.log('Имя:', name);
        console.log('Email:', email);
        console.log('Сообщение:', message);

        // Отображение сообщения об успешной отправке
        alert('Данные успешно обработаны и отправлены!');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const dropdownGames = document.getElementById('dropdown-games');
    const popularGames = ['Cyberpunk 2077', 'Elden Ring', 'Counter-Strike 2']; // Можно расширить список

    // Показываем выпадающий список при фокусе
    searchInput.addEventListener('focus', () => {
        updateDropdownList('');
        dropdownGames.style.display = 'block';
    });

    // Скрываем выпадающий список при потере фокуса
    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            dropdownGames.style.display = 'none';
        }, 200); // Небольшая задержка, чтобы клик на элемент списка успел сработать
    });

    // Фильтрация списка при вводе текста
    searchInput.addEventListener('input', (e) => {
        updateDropdownList(e.target.value);
    });

    // Обновление списка игр в выпадающем меню
    function updateDropdownList(filterText) {
        // Берем массив popularGames и фильтруем его
        // Для каждой игры проверяем, содержится ли введенный текст (без учета регистра)
        const filteredGames = popularGames.filter(game =>
            game.toLowerCase().includes(filterText.toLowerCase())
        );
        // Очищаем текущее содержимое выпадающего списка
        dropdownGames.innerHTML = '';
        // Если после фильтрации не осталось подходящих игр
        if (filteredGames.length === 0) {
            dropdownGames.innerHTML = '<div style="padding: 8px 12px;">Ничего не найдено</div>';
            return;
        }
        // Создаем новый список (ul) для отображения отфильтрованных игр
        const ul = document.createElement('ul');
        // Для каждой отфильтрованной игры
        filteredGames.forEach(game => {
            // Создаем элемент списка (li)
            const li = document.createElement('li');
            // Устанавливаем текст элемента равным названию игры
            li.textContent = game;
            // Добавляем обработчик клика на элемент списка
            li.addEventListener('click', () => {
                searchInput.value = game; // Подставляем выбранную игру в поле ввода
                dropdownGames.style.display = 'none'; // Скрываем список
            });
            // Добавляем созданный элемент в список
            ul.appendChild(li);
        });
        // Добавляем готовый список в выпадающее меню
        dropdownGames.appendChild(ul);
    }
});