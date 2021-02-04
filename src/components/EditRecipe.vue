<template>
    <div  v-if="recipe" class="edit-recipe">
        <div class="row">
            <div class="col s4 bg"></div>
            <div class="col s8">
                <div class="container">
                    <div class="card">
                        <div class="card-content">
                            <h2>Edit {{recipe.name }} Recipe</h2>
                            <form @submit.prevent="editRecipe">
                                    <div class="input-field">
                                        <input  name="name" placeholder="Name" type="text" v-model="recipe.name">  
                                    </div>
                                    <div class="input-field field" v-for="(ing,index) in recipe.ingredients" :key="index">
                                        <input type="text" name="ingredient" placeholder="Ingredient" v-model="recipe.ingredients[index]">
                                        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
                                    </div>
                                     <div class="field add-ingredient">
                                        <input type="text" name="add-ingredient" placeholder="Add Ingredient (press space to add another )" @keydown.space="addIng" v-model="another">
                                    </div>
                                    <div class="input-field">
                                        <input  name="dsc" placeholder="Description" type="text" v-model="recipe.description">
                                    </div>
                                   <div class="file-field input-field">
                                        <div class="btn">
                                            <span>File</span>
                                            <input type="file" accept="image/*" @change="onChange">
                                        </div>
                                        <div class="file-path-wrapper">
                                            <input class="file-path validate" type="text" placeholder="Upload image">
                                        </div>
                                    </div>
                                    <div class="field center-align">
                                        <p v-if="feedback" class="red-text">{{ feedback }}</p>
                                        <button class="btn ">Update Recipe</button>
                                    </div>
                            </form>
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
    name:'EditRecipe',
    data(){
        return {
            recipe: null,
            another: null,
            feedback: null,
            username: null
        }
    },
    created(){
        let ref= db.collection('recipes').where('slug','==',this.$route.params.recipe_slug)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.recipe = doc.data()
                this.recipe.id = doc.id
            })
        }).catch(err =>{
            console.log(err)
        })
        let user = firebase.auth().currentUser
        db.collection('users').where('user_id', '==', user.uid).get()
            .then(snapshot=>{
                snapshot.forEach((doc) =>{
                   this.username = doc.id
                   console.log(this.username)
                })
        })
    },
    methods:{
        editRecipe(){
            if(this.recipe.name && this.recipe.description){
                db.collection('recipes').doc(this.recipe.id).update({
                    name: this.recipe.name,
                    ingredients: this.recipe.ingredients,
                    description: this.recipe.description,
                    img_url: this.recipe.img_url,
                    slug: this.recipe.slug
                }).then(() =>{
                    this.$router.push({name: 'UserProfile' , params: { id: this.username}})
                }).catch(err =>{
                    console.log(err)
                })
                this.feedback = null
            }else{
                this.feedback = 'You must enter all data'
            }
        },
         addIng(){
            if(this.another){
                this.recipe.ingredients.push(this.another);
                this.another = null;
                this.feedback = null
            }else{
                this.feedback = 'You must enter ingredients'
            }
        },
        deleteIng(ing){
            this.ingredients = this.ingredients.filter(ingredient =>{
                return ingredient != ing
            })
        },
        onChange(e){
            if(!e.target.files.length) return;
            let file = e.target.files[0];
            let reader = new FileReader();

            reader.readAsDataURL(file)

            reader.onload = e=>{
                this.recipe.img_url = e.target.result;
                
            }
        },
    }
}
</script>

<style>
.edit-recipe form .delete{
    position: absolute;
    right: 0;
    bottom: 15px;
    color: rgb(192, 191, 191);
    cursor: pointer;
}
</style>