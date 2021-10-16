// data
const products = [
  { id: 1, description: "Macbook Pro Mi-2012", price: 250, img: 'assets/img/macbookpro.JPG'},
  { id: 2, description: 'PC Gamer', price: 500, img: 'assets/img/pcgamer.JPG'},
  { id: 3, description: 'Macbook Air 2012', price: 150, img: 'assets/img/macbookair.JPG'},
  { id: 4, description: 'PC Packard Bell (bureau)', price: 350, img: 'assets/img/packardbell.JPG'},
  { id: 5, description: 'iMac Fin 2013', price: 400, img: 'assets/img/imac2013.JPG'},
  { id: 6, description: 'iMac 2006', price: 60, img: 'assets/img/imac2006.JPG'},
  { id: 7, description: 'PC Dell (travail)', price: 450, img: 'assets/img/delltravail.JPG'},
  { id: 8, description: 'Dell XPS 15 L-502x', price: 700, img: 'assets/img/dellxps.JPG'},
  { id: 9, description: 'HP Pavillon 17', price: 230, img: 'assets/img/hp.JPG'},
  { id: 10, description: 'HP Pavillon DV6-6B71SF', price: 290, img: 'assets/img/hpblack.JPG'},
  { id: 11, description: 'iPTV (Toutes chaînes TV)', price: 80, img: 'assets/img/iptv.JPG'},
  { id: 12, description: 'HP 840 G3', price: 350, img: 'assets/img/hp840.JPG'},
];

const Home = {
  template: '#home',
  name: 'Home',
  data: () => {
    return {
      products,
      searchKey: '',
      liked: [],
      cart: []
    }
  },
  computed: {
    filteredList(){
      return this.products.filter((product) => {
        return product.description.toLowerCase().includes(this.searchKey.toLowerCase());
      })
    },
    getLikeCookie(){
      let cookieValue = JSON.parse($cookies.get('like'));
      cookieValue == null ? this.liked = [] : this.liked = cookieValue
    },
    cartTotalAmount(){
      let total = 0;
      for (let item in this.cart){
        total = total + (this.cart[item].quantity * this.cart[item].price)
      }
      return total;
    },
    itemTotalAmount(){
      let itemTotal = 0;
      for (let item in this.cart){
        itemTotal = itemTotal + (this.cart[item].quantity);          
      }
      return itemTotal;
    }
  },
  methods: {
    setLikeCookie(){
      document.addEventListener('input', () => {
        setTimeout(() => {
          $cookies.set('like', JSON.stringify(this.liked));
        }, 300);
      })
    },
    addToCart(product){
      // check if already in array
      for (let i = 0; i < this.cart.length; i++){
        if (this.cart[i].id === product.id) {
          return this.cart[i].quantity++
        }
      }
      this.cart.push({
        id: product.id,
        img: product.img,
        description: product.description,
        price: product.price,
        quantity: 1
      })
    },
    cartPlusOne(product){
      product.quantity = product.quantity + 1;
    },
    cartMinusOne(product, id){
      if (product.quantity == 1) {
        this.cartRemoveItem(id);
      } else {
        product.quantity = product.quantity -1;
      }
    },
    cartRemoveItem(id){
      this.$delete(this.cart, id)
    }
  },
  mounted: () => {
    this.getLikeCookie;
  }
}
const UserSettings = {
  template: '<h1>User Settings</h1>',
  name: 'UserSettings'
}
const WishList = {
  template: '<h1>Wish List</h1>',
  name: 'WishList'
}
const ShoppingCart = {
  template: '<h1>Shopping Cart</h1>',
  name: 'ShoppingCart'
}

// router
const router = new VueRouter({
  routes: [
    { path: '/', component: Home, name: 'Home' },
    { path: '/user-settings', component: UserSettings, name : 'UserSettings' },
    { path: '/wish-list', component: WishList, name: 'WishList' },
    { path: '/shopping-cart', component: ShoppingCart, name: 'ShoppingCart' },
  ]
})

const vue = new Vue({
  router
}).$mount('#app');
