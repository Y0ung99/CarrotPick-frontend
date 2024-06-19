export default class Difficulty {
  constructor() {
    this.selectors = document.querySelectorAll('.set__value');
    this.setBgs = document.querySelectorAll('.set__bg');
    this.set = {
      "music": 100,
      "effect": 100,
      "duration": 1,
      "carrot": 1,
      "bug": 1,
    }
  }
  selectorInit() {
    this.selectors.forEach(selector => {
      const dataValue = selector.dataset.value;
      selector.style.left = `${this.set[dataValue]}%`;
      const description = selector.parentNode.parentNode.querySelector(('.description'));
      description.innerText = `${dataValue.toUpperCase()}: ${this.set[dataValue]}`;
    });
  }

  bgOnclick() {
    this.setBgs.forEach(bg => {
      const bgRect = bg.getBoundingClientRect();
      bg.addEventListener('click', (e) => {
        const selector = e.target.querySelector('.set__value');
        const offsetX = e.clientX - bgRect.left;
        const width = bgRect.width;
        const percentage = (offsetX / width) * 100;
        const dataValue = selector.dataset.value;
        this.set[dataValue] = percentage.toFixed(0);
        selector.style.left = `${percentage}%`;
        this.selectorInit();
        return this.set;
      });
    });
  }
}