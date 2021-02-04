<template>
    <div  v-if="user" class="profile">
        <div class="banner">
            <div class="banner_img">
            </div>
            <div class="container user_info">
                <div class="row">
                    <div class="col s4 image_div">
                        <img src="../../assets/defaultUser.jpg" alt="">
                    </div>
                    <div class="col s7 info_div">
                        <h3>{{user.name}} {{user.lastname}}</h3>
                        <p>{{user.email}}</p>
                        <router-link :to="{ name:'EditProfile' , params: {id:user.id}}" class="waves-effect waves-light btn"><i class="material-icons right">edit</i>Edit Profile</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="white user_recipes">
            <div class="container">
                <div class="nav-content">
                    <h2>Your recipe book</h2>
                        <router-link :to="{name: 'AddRecipe'}">
                            <a class="btn-floating btn-large waves-effect waves-light red add"><i class="material-icons">add</i></a>
                        </router-link>
                    <div class="row">
                    <div class="col s12 m5" v-for="recipe in recipes" :key="recipe.id">
                        <div class="card hoverable">
                        <div class="card-image">
                            <img :src= "recipe.img_url">
                            <a class="btn-floating halfway-fab waves-effect waves-light red delete" @click="deleteRecipe(recipe.id)"><i class="material-icons">delete</i></a>
                            <router-link :to="{name: 'EditRecipe', params: {recipe_slug: recipe.slug}}">
                            <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">edit</i></a>
                            </router-link>
                        </div>
                        <div class="card-content">
                            <span class="card-title">{{ recipe.name }}</span>
                            <ul class="ingredients">
                            <li v-for="(ing,index) in recipe.ingredients" :key="index">{{ ing }}</li>
                            </ul>
                            <p>{{ recipe.description}}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name: 'UserProfile',
    data(){
        return {
            profile: null,
            user:null,
            recipes: []
        }

    },
    created(){
        let ref = db.collection('users')
        console.log(ref)
        //get current user
        ref.where('user_id','==',firebase.auth().currentUser.uid).get()
        .then(snapshot => {
            snapshot.forEach(doc =>{ 
                this.user = doc.data(),
                this.user.id = doc.id
                console.log(this.user)
            })
        })

        //get recipes
        let recipeRef = db.collection('recipes')
        recipeRef.get()
         .then(snapshot => {
            snapshot.forEach(doc =>{ 
                let recipe = doc.data()
                recipe.id = doc.id
                if(recipe.user_id == firebase.auth().currentUser.uid){
                    this.recipes.push(recipe)
                }
            })
        })

    },
    methods:{
         deleteRecipe(id){
            db.collection('recipes').doc(id).delete()
            .then(()=>{
                this.recipes = this.recipes.filter(recipe =>{
                return recipe.id != id
                })
            })
        }
  
    }

}
</script>

<style >
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Source+Serif+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");

    .profile .banner_img{
        background-image: url('../../assets/bg2.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        height: 650px;
        width: 100%;
        opacity: 0.4;
    }
    .profile .banner{
        background: #009688;
        position: relative;
    }
    .profile .banner .user_info{
        position: absolute;
        top: 0;
        left: 20%;
        width: 100%;
    }
    .profile .banner .user_info .image_div img{
        width: 300px;
        border-radius:50% ;
        margin-top:25% ;
    }
    .profile .banner .user_info .info_div{
        font-family: 'Source Serif Pro', serif;
        color: #fff;
        margin-top: 10%;
    }
    .profile .banner .user_info .info_div h3{
        text-transform: uppercase;
        letter-spacing: 2px;
    }
    .profile .banner .user_info .info_div p{
        font-size: 20px;
        letter-spacing: 1px;
        text-decoration: underline;
    }
    .profile .user_recipes{
        position: absolute;
        width: 70%;
        margin: auto;
        right: 0;
        left: 0;
        top: 70%;
        border-radius: 15px;
    }
    .profile .user_recipes h2{
         font-family: 'Dancing Script';
         text-align: center;
         font-size: 5em;
    }
    .profile .user_recipes .add{
        float: right;
        
    }
    .profile .user_recipes a.delete{
        left:25px;
        bottom: -25px;
    }
</style>