import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories:[],
    cart:[]
  },
  getters: {
    cartProducts(state){
      return state.cart.map(prod=>{
      let myProd = prod
      myProd.total = prod.count* prod.price
      // Lo de arriba es para calcular el total
      return myProd
    })
  },
  // Getters agregados según comentario en cuaderno
  cartCount(state){
    return state.cart.length
  },
  cartTotal(state, getters){
    return getters.cartProducts.reduce((total,prod)=>{
      return total + prod.total
    },0)
  }
  },
  mutations: {
    SET_CATEGORIES(state, categories){
      state.categories = categories
    },
    ADD_PRODUCT_TO_CART(state,product){
      // validar si el producto ya existe
      let exist = state.cart.some(p=>p.id==product.id)
      if(exist==false){
        state.cart.push(product)
      }
      else{
        state.cart.forEach(p=>{
          if(p.id==product.id){
            p.count+=1;
          }
        })
      }

      //si no existe lo agrego
  
      // si no, tengo que buscarlo y sumarle uno a la cantidad.
    },
    // Esta mutación es la 3era en ser creada y viene del cart. Recibe el id que se quiere borrar. También se crea una acción para esta mutación (ver en actions)
    REMOVE_PRODUCT_CART(state, idProduct){
      let index = state.cart.findIndex(p=>p.id==idProduct)
      state.cart.splice(index,1)

    },
    ADD_STOCK_PRODUCT_CART(state, idProduct){
      state.cart.forEach(p=>{
        if(p.id==idProduct){
          p.count+=1;
        }
      })
    },
    REMOVE_STOCK_PRODUCT_CART(state,idProduct){
      state.cart.forEach(p=>{
        if(p.id==idProduct && p.count>1){
          p.count-=1;
        }
      })
    }
  },
  actions: {
   async fetchCategories({commit}){
    try{
let response = await fetch("https://fakestoreapi.com/products/categories")
let categories = await response.json()
commit ('SET_CATEGORIES', categories)
    }
    catch(error){
      console.log(error)
    }
    },
    addProductCart({commit},product){
      commit('ADD_PRODUCT_TO_CART', product)
    },
    // Esta es la acción creada luego de crear la mutación. Ahora vamos a import en archivo Cart.vue y agregamos mapActions
    removeCartProduct({commit}, idProduct){
commit('REMOVE_PRODUCT_CART', idProduct) 
  },
  addStockCartProduct({commit}, idProduct){
    commit('ADD_STOCK_PRODUCT_CART', idProduct)
  },
  removeStockCartProduct({commit},idProduct){
commit('REMOVE_STOCK_PRODUCT_CART', idProduct)
  }
},
  modules: {
  }
})
