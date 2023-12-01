const tg = window.Telegram.WebApp;

const flowers = [
    {
        name: "Flower 1",
        price: "3.99",
        image: "img/flower_in_a_pot_01.svg"
    },

    {
        name: "Flower 2",
        price: "6.99",
        image: "img/flower_in_a_pot_02.svg"
    },

    {
        name: "Flower 3",
        price: "9.99",
        image: "img/flower_in_a_pot_03.svg"
    },

    {
        name: "Flower 4",
        price: "15.99",
        image: "img/flower_in_a_pot_04.svg"
    },

    {
        name: "Flower 5",
        price: "29.99",
        image: "img/flower_in_a_pot_05.svg"
    },

    {
        name: "Flower 6",
        price: "29.99",
        image: "img/flower_in_a_pot_06.svg"
    }
];

const shoppingCart = {};

const flowerGrid = document.querySelector(".flower-grid");

const saveButton = document.getElementById("save");


flowers.forEach(flower => {
    const div = document.createElement("div");
    div.className = "flower";
    div.innerHTML = `
        <div class="flower-image">
            <img src="${flower.image}">
        </div>
        <div class="flower-text">
            <p>${flower.name} · ${flower.price}$</p>
        </div>
        <div class="flower-buttons">
            <button class="flower-buttons_add">ADD</button>
            <button class="flower-buttons_minus">-</button>
            <span class="flower-buttons_counter">1</span>
            <button class="flower-buttons_plus">+</button>
        </div>
    `;
    flowerGrid.appendChild(div);
});


const addButtons = document.querySelectorAll(".flower-buttons_add");
const minusButtons = document.querySelectorAll(".flower-buttons_minus");
const plusButtons = document.querySelectorAll(".flower-buttons_plus");
const counterButtons = document.querySelectorAll(".flower-buttons_counter");
const divsFlower = document.querySelectorAll(".flower");


addButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        button.style.display = "none";
        minusButtons[index].style.display = "inline-block";
        plusButtons[index].style.display = "inline-block";
        counterButtons[index].style.display = "inline-block";

        const name = flowers[index].name;
        shoppingCart[name] = 1;
        saveButton.style.display = "block";
    });
});


plusButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        counterButtons[index].textContent = Number(counterButtons[index].textContent) + 1;
        let tagP = divsFlower[index].children[1].querySelector("p");
        tagP = tagP.textContent;
        tagP = tagP.split(" · ");
        shoppingCart[tagP[0]] += 1;
    });
});


minusButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        let tagP = divsFlower[index].children[1].querySelector("p");
        tagP = tagP.textContent;
        tagP = tagP.split(" · "); 
        if (Number(counterButtons[index].textContent == 1)) {
            addButtons[index].style.display = "inline-block";
            button.style.display = "none";
            plusButtons[index].style.display = "none";
            counterButtons[index].style.display = "none";
            delete shoppingCart[tagP[0]];
        } else {
            counterButtons[index].textContent = Number(counterButtons[index].textContent) - 1;
            shoppingCart[tagP[0]] -= 1;
        }

        if (Object.entries(shoppingCart).length == 0) {
                saveButton.style.display = "none";
        };
    });
});


saveButton.addEventListener("click", () => {
    const data = JSON.stringify(shoppingCart);
    tg.sendData(data);
    console.log(data);
});
