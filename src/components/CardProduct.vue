<template>
   <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <!-- <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template> -->

    <v-img
      height="250"
      :src="product.image"
    ></v-img>

    <v-card-title class="title">{{  product.title }}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0">

        <v-rating
          :value="product.rating.rate"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          {{ product.rating.rate }} ({{ product.rating.count }})
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        $ {{ product.price }}
      </div>

      <!-- <div>{{ product.description }}</div> -->
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
        
      <v-btn
        color="green darken-2"
        text
        @click="add"
      >
      <v-icon>mdi-cart</v-icon>
        Agregar
      </v-btn>
    </v-card-actions>
    <div class="text-center">
    <!-- <v-btn
      dark
      color="red darken-2"
      @click="snackbar = true"
    > -->
      <!-- Open Snackbar
    </v-btn> -->
     <!-- Paso 1: botón de vuetify eliminado  -->

    <v-snackbar
      v-model="snackbar"
      :multi-line="multiLine"
      color="green"
    >
      {{ product.title }} Agregado al Carrito
      <v-icon>mdi-cart-plus</v-icon>
      <!-- Paso 2: Esta parte fue modificada para que funcione el snackbar para nuestros fines -->

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
  </v-card>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'card-component',
props: {
    product:{
        type:Object,
        required: true
    }
},
    data: function(){
        return {
            loading: false,
            selection: 1,
            // Paso 3: la data de abajo corresponde a la data agregada desde el snackbar de vuetify
            multiLine: true,
            snackbar: false,
            // text: `I'm a multi-line snackbar.`,
        }
    },
    // computed: {},
methods: {
    ...mapActions(['addProductCart']),
    add () {
        let prod = {
            id:this.product.id,
            title:this.product.title,
            price:this.product.price,
            count:1,
        }
        this.addProductCart(prod)
        // Paso 4: para levantar el alert cada vez que agreguemos productos al carrito
        this.snackbar=true
        // this.loading = true
        // setTimeout(() => (this.loading = false), 2000)
      },
    }
  
    // watch: {},
    // components: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    // -- End Lifecycle Methods
}
</script>

<style scoped>
.title{
    min-height:160px;
}
    
</style>