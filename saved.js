document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.mein-menu');
    const no_favorite = document.querySelector('.no-favorite');

    // Получаем данные из localStorage
    let savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];

    // Функция отрисовки всех карточек
    function renderCards() {
        container.innerHTML = ''; // очищаем контейнер перед отрисовкой

        if (savedCards.length === 0) {
            no_favorite.style.display = 'flex';
            return;
        }

        no_favorite.style.display = 'none';

        savedCards.forEach((card) => {
            const element = document.createElement('article');
            element.classList.add('list-item', 'secondary-list');

            const slides = card.images.map(imgSrc => {
                const fullImgSrc = imgSrc.startsWith('./img/')
                    ? `./balenciaga/img/${imgSrc.slice(6)}`
                    : imgSrc;
                return `<a href="${card.href}" class="swiper-slide"><img src="${fullImgSrc}" alt="${card.title}" /></a>`;
            }).join('');

            element.innerHTML = `
                <div class="swiper">
                    <div class="swiper-wrapper">
                        ${slides}
                    </div>
                    <div class="swiper-pagination"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                </div>
                <h3 class="oswald-medium">${card.title}</h3>
                <p class="montserrat-light">${card.colors} colors</p>
                <button class="delete-card"><svg viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-469.000000, -1041.000000)" fill="#000000"> <path d="M487.148,1053.48 L492.813,1047.82 C494.376,1046.26 494.376,1043.72 492.813,1042.16 C491.248,1040.59 488.712,1040.59 487.148,1042.16 L481.484,1047.82 L475.82,1042.16 C474.257,1040.59 471.721,1040.59 470.156,1042.16 C468.593,1043.72 468.593,1046.26 470.156,1047.82 L475.82,1053.48 L470.156,1059.15 C468.593,1060.71 468.593,1063.25 470.156,1064.81 C471.721,1066.38 474.257,1066.38 475.82,1064.81 L481.484,1059.15 L487.148,1064.81 C488.712,1066.38 491.248,1066.38 492.813,1064.81 C494.376,1063.25 494.376,1060.71 492.813,1059.15 L487.148,1053.48" id="cross" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg></button>
            `;

            // Обработчик удаления карточки
            element.querySelector('.delete-card').addEventListener('click', () => {
                // Удаляем по уникальному заголовку
                savedCards = savedCards.filter(saved => saved.title !== card.title);
                localStorage.setItem('savedCards', JSON.stringify(savedCards));
                renderCards(); // перерисовываем карточки
            });

            container.appendChild(element);

            // Инициализация Swiper для каждой карточки
            new Swiper(element.querySelector('.swiper'), {
                direction: 'horizontal',
                loop: true,
                pagination: {
                    el: element.querySelector('.swiper-pagination'),
                },
                navigation: {
                    nextEl: element.querySelector('.swiper-button-next'),
                    prevEl: element.querySelector('.swiper-button-prev'),
                },
            });
        });
    }

    renderCards(); // Запуск отрисовки
});
