import './index.css';

const HeaderElement = document.querySelector(".header");
const ModalElement = document.querySelector(".modal");

const BtnOne = document.querySelector(".btn-warning");
const BtnTwo = document.querySelector(".btn-success");
const BtnForm = document.querySelector(".btn-outline-light");
const BtnCloseModal = document.querySelector(".btn-outline-primary");

const cardsList = ".main__list";
const cardTemplate = ".card__template";
const cardContainer = ".card__container";
const cardTitle = ".card__title";

const cards = [
  {
    title: `01`,
    color: "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)",
    border: "solid",
  },
  {
    title: `02`,
    color: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
    border: "dashed",
  },
  {
    title: `03`,
    color: "linear-gradient(to top, #f43b47 0%, #453a94 100%)",
    border: "solid",
  },
];

class Card {
  constructor(item, selector) {
    this._title = item.title;
    this._color = item.color;
    this._border = item.border;
    this._selector = selector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(cardContainer)
      .cloneNode(true);
    return cardElement;
  }

  _getClassList(element) {
    element.style["background-image"] = `${this._color}`;
    element.style["border"] = `1px ${this._border} black`;
  }

  update(item, i) {
    console.log(item, i);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._getClassList(this._element);
    this._element.querySelector(cardTitle).textContent = this._title;
    return this._element;
  }
}

// Close Modal by ESC
function handleEscClose(e) {
  if (e.key === "Escape") {
    handleCloseModal();
  }
}

// Set Listener of ESC keydown
if (ModalElement.classList.contains("_active")) {
  document.addEventListener("keydown", handleEscClose);
  document.body.style["overflow"] = "hidden";
}

function toggleHeader() {
  HeaderElement.classList.toggle("_active");
}

function handleCloseModal() {
  ModalElement.classList.remove("_active");
  document.body.style["overflow"] = "visible";
  document.removeEventListener("keydown", handleEscClose);
}

class Section {
  constructor({ items, renderer, update }, containerSelector) {
    this._renderedCards = items;
    this._renderer = renderer;
    this._update = update;
    this._container = document.querySelector(containerSelector);
  }

  renderCards() {
    this._renderedCards.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.append(element);
  }

  updateCards() {
    this._container.innerHTML = "";
    this.renderCards()
  }
}

const itemsList = new Section(
  {
    items: cards,
    renderer: (i) => {
      const card = new Card(i, cardTemplate);
      const cardElement = card.generateCard();
      itemsList.addItem(cardElement);
    },
  },
  cardsList
);

itemsList.renderCards();

const swapLastCards = function () {
  if (cards.length === 1) return cards;
  // определяем index предпоследнего элемента
  let x = cards.length - 2;
  // определяем index последнего элемент
  let y = cards.length - 1;
  // обмен поледнего и предпоследнего обьекта
  cards.splice(y, 1, cards.splice(x, 1, cards[y])[0]);
  itemsList.updateCards();
  return cards;
};

function redirectToForm() {
  handleCloseModal();
  window.location.href = "./form.html";
}

BtnOne.addEventListener("click", toggleHeader);
BtnTwo.addEventListener("click", swapLastCards);
BtnForm.addEventListener("click", redirectToForm);
BtnCloseModal.addEventListener("click", handleCloseModal);
