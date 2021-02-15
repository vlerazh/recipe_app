<template>
<div class="wrapper">

  <Banner />
  <div class="index container" id="allRecipes">
      <h1 class="center-align">All Recepies</h1>
    
      <div class="row">
          <div class="col s12 m5" v-for="recipe in recipes" :key="recipe.id">
            <router-link :to="{ name: 'RecipeDetails', params:{ id: recipe.slug}}">
              <div class="card hoverable">
                <div class="card-image">
                  <img :src= "recipe.img_url">
                </div>
                <div class="card-content">
                  <span class="card-title">{{ recipe.name }}</span>
                  <ul class="ingredients">
                    <li v-for="(ing,index) in recipe.ingredients" :key="index">{{ ing }}</li>
                  </ul>
                  <p>{{ recipe.description}}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

import Banner from'@/components/Banner'
import db from '@/firebase/init'
export default {
  name: 'Index',
  components:{
    Banner
  },
  data () {
    return {
        recipes: [ ],
        
    }
  },
  created(){
    db.collection('recipes').get()
    .then(snapshot => {
      snapshot.forEach(doc =>{
        let recipe = doc.data()
        recipe.id = doc.id
        if(recipe.show){
          this.recipes.push(recipe)
        }
      })
    })
  },

   
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.index h1{
  font-family: 'Dancing Script', cursive;
  margin-top: 5%;
  display: inline-block;
  margin-left:40%;
}
.index .add{
  float: right;
margin-top: 5%;
}
.index .card{
  width: 300px;
  color: black;
}

  .index  .card-title{
    font-family: 'Source Serif Pro', serif;
    text-align: center;
    font-weight: 400;
  }
  .index .ingredients li{
    font-family: 'Source Serif Pro', serif;
    padding: 1%;
    text-transform: capitalize;
    font-weight:300 ;
    border-radius: 10px;
    font-size: 18px;
  }

</style>
