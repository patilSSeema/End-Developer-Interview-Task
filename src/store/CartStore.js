import { makeAutoObservable } from "mobx";

class CartStore {
  cart = [];
  name = [];

  constructor() {
    makeAutoObservable(this);
  }

  addToCart(product, ferryInfo, travelDate) {
    this.cart.push({ product, ferryInfo, travelDate });
  }
  getFerryName(ferryInfo) {
    this.name.push(ferryInfo);
  }

  get totalItems() {
    return this.cart.length;
  }
}

const cartStore = new CartStore();
export default cartStore;
