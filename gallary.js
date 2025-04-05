// gallery.js
 
const goBackBtn = document.createElement('button');
goBackBtn.innerHTML = `
            <svg fill="#000000" height="50px" width="100px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 242.133 242.133" xml:space="preserve" transform="rotate(-45)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_9_" d="M237.739,216.526L62.73,41.517l15.91-15.91c4.29-4.29,5.573-10.742,3.252-16.347C79.57,3.655,74.1,0,68.033,0 H15.001c-8.284,0-15,6.716-15,15v53.033c0,6.067,3.655,11.537,9.26,13.858c1.856,0.769,3.805,1.142,5.737,1.142 c3.904,0,7.741-1.524,10.61-4.394l15.91-15.91l175.009,175.01c2.929,2.929,6.768,4.394,10.606,4.394 c3.839,0,7.678-1.464,10.606-4.394C243.597,231.881,243.597,222.384,237.739,216.526z"></path> </g></svg>
`
goBackBtn.classList.add('go-back-btn');
goBackBtn.addEventListener('click', () => {
    history.back();
});
document.querySelector('main').prepend(goBackBtn);



function updateContent(colorName, commonInfo, colorsData) {
    const selectedColor = colorsData.find((item) => item.colorName === colorName);
    
    if (selectedColor) {
        // Обновляем галерею изображений
        new MainMenu(selectedColor.colorName, selectedColor.images).render();
        
        // Обновляем текстовую информацию
        const itemInfo = document.querySelector(".item-info");
        itemInfo.querySelector("h2").textContent = selectedColor.name;
        itemInfo.querySelector(".descr p:nth-child(1)").textContent = "Price:";
        itemInfo.querySelector(".descr ul").innerHTML = `
            <li>Excellent Quality - ${selectedColor.prices.excellent}</li>
            <li>Good Quality - ${selectedColor.prices.good}</li>
            <li>Middle Quality - ${selectedColor.prices.middle}</li>
        `;
        itemInfo.querySelector(".descr p:nth-child(3)").textContent = `Sizes: ${commonInfo.sizes}`;
        itemInfo.querySelector(".descr p:nth-child(4)").textContent = commonInfo.shipping;
    }
}

// Функция для смены изображения галереи
class MainMenu {
    constructor(colorName, images) {
        this.colorName = colorName;
        this.images = images;
    }

    render() {
        const parentContainer = document.querySelector(".galary");
        parentContainer.innerHTML = `
            <div>
                <a data-fancybox="gallery" data-src="${this.images[0]}">
                    <img src="${this.images[0]}" alt="" />
                </a>
            </div>
            <div>
                ${this.images
                    .slice(1)
                    .map(
                        (img) => `
                    <a data-fancybox="gallery" data-src="${img}">
                        <img src="${img}" alt="" />
                    </a>
                `)
                    .join("")}
            </div>
        `;
        Fancybox.bind('[data-fancybox="gallery"]', {});
    }
}

// Добавление обработчиков для смены цветов
function setColorButtons(colorsData, commonInfo) {
    const colorButtonsContainer = document.querySelector(".colors");
    colorButtonsContainer.innerHTML = colorsData.map((color) => `
        <button class="${color.colorName}"></button>
    `).join('');

    const colorButtons = document.querySelectorAll(".colors button");

    colorButtons.forEach((button) => {
        button.addEventListener("click", () => {
            updateContent(button.classList[0], commonInfo, colorsData);  // Класс кнопки соответствует названию цвета
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // для плавной прокрутки
              });
        });
    });
}

// Инициализация при загрузке страницы
function initializePage(colorsData, commonInfo) {
    updateContent("black", commonInfo, colorsData);  // Показываем первую галерею по умолчанию
    setColorButtons(colorsData, commonInfo);
}
