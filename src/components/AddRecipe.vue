<template>
    <div class="add-recipe">
        <div class="row">
            <div class="col s4 bg"></div>
            <div class="col s8">
                <div class="container">
                    <div class="card">
                        <div class="card-content">
                            <h2>Add a new Recipe</h2>
                            <form @submit.prevent="addRecipe">
                                    <div class="input-field">
                                        <input  name="name" placeholder="Name" type="text" v-model="name">  
                                    </div>
                                    <div class="input-field field" v-for="(ing,index) in ingredients" :key="index">
                                        <input type="text" name="ingredient" placeholder="Ingredient" v-model="ingredients[index]">
                                        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
                                    </div>
                                     <div class="field add-ingredient">
                                        <input type="text" name="add-ingredient" placeholder="Add Ingredient (press space to add another )" @keydown.space="addIng" v-model="another">
                                    </div>
                                    <div class="input-field">
                                        <input  name="dsc" placeholder="Description" type="text" v-model="description">
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
                                    <div class="switch">
                                        <label>
                                            Don't Show
                                            <input type="checkbox" @change="check($event)">
                                            <span class="lever"></span>
                                            Show
                                        </label>
                                    </div>
                                    <div class="field center-align">
                                        <p v-if="feedback" class="red-text">{{ feedback }}</p>
                                        <button class="btn ">Add Recipe</button>
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
import slugify from 'slugify'
export default {
    name:'AddRecipe',
    data(){
        return{
            name: null,
            description: null,
            img_url: null,
            ingredients: [],
            another: null,
            feedback: null,
            slug: null,
            show: false,
            user_id: null,
            username:null
        }
    },
    methods:{
        addRecipe(){
            if(this.name && this.description){
                this.slug = slugify(this.name, {
                    replacemen: '-',
                    remove: /[$*_+~.();"!\-:@]/g,
                    lower: true
                })
                db.collection('recipes').add({
                    name: this.name,
                    ingredients: this.ingredients,
                    description: this.description,
                    img_url: this.img_url,
                    slug: this.slug,
                    show: this.show,
                    user_id: this.user_id
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
                this.ingredients.push(this.another);
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
                this.img_url = e.target.result;
                
            }
        },
        check(e){
            if(e.target.checked){
                this.show = true
            }else{
                this.show = false
            }
        }
    },
    created(){
        let user = firebase.auth().currentUser
        db.collection('users').where('user_id', '==', user.uid).get()
            .then(snapshot=>{
                snapshot.forEach((doc) =>{
                   this.user_id = doc.data().user_id
                   this.username = doc.id
                })
        })
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Source+Serif+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");

.add-recipe .card{
    margin-top: 10%;
}
.add-recipe .card h2{
    font-family: 'Dancing Script';
    margin: auto;
    text-align: center;
}
.add-recipe .bg{
    background: url('../assets/bg.jpg');
    background-repeat: no-repeat;
    background-size: contain;
    height: 925px;
    overflow-y: hidden;
}
.add-recipe form .delete{
    position: absolute;
    right: 0;
    bottom: 15px;
    color: rgb(192, 191, 191);
    cursor: pointer;
}
</style>