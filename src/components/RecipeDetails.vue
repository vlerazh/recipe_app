<template>
    <div class="recipe-details" v-if="recipe">
        <div class="container">
            <div class="row">
                <div class="col s5 recipe_image">
                    <img :src="recipe.img_url" alt="">
                </div>
                <div class="col s7">
                    <h1 class="title">{{recipe.name}} details</h1>
                    <div class="row title_row">
                        <div class="col s6 ">
                            <h3 class="sub-title">Ingredients</h3>
                        </div>
                        <div class="col s6 ">
                            <h3 class="sub-title">Description</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s6 ing ">
                            <ul>
                                <li v-for="(ing,index) in recipe.ingredients" :key="index" class="ingredients">
                                    {{ ing }}
                                </li>
                            </ul>
                        </div>
                        <div class="col s6 desc">
                            <p class="dsc">{{ recipe.description}}</p>
                        </div>
                    </div>     
                </div> 
            </div>
            <div class="row review_row">
                <h4 class="review_title">Reviews:</h4>
                <form class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="textarea1" class="materialize-textarea" placeholder="Leave your review here.." v-model="newComment"></textarea>
                            <button class="btn" @click="addReview">Add Review</button>
                            <p v-if="feedback" class="red-text"> {{ feedback}}</p>
                        </div>
                        <div class="col s12">
                            <ul>
                                <li v-for="(comment,index) in comments" :key="index" >
                                    <div class="review-content">
                                        <p class="review">{{ comment.content}}</p>
                                        <p class="review_author">{{ comment.from }}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>     
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
    name:'RecipeDetails',
    data(){
        return{
            recipe: null,
            newComment: null,
            feedback: null,
            user: null,
            comments: []
        }
    },
    created(){
        let ref= db.collection('recipes').where('slug','==',this.$route.params.id)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.recipe = doc.data()
                this.recipe.id = doc.id
            })
        }).catch(err =>{
            console.log(err)
        })

        //get urrent user
        let reff = db.collection('users')

        reff.where("user_id", "==", firebase.auth().currentUser.uid).get()
        .then(snapshot => {
            snapshot.forEach(doc =>{
                this.user = doc.data()
                this.user.id = doc.id
            })
        })

        //get comments

        db.collection('comments').where('to', '==', this.$route.params.id)
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach(change =>{
                if(change.type == 'added'){
                    this.comments.unshift({
                        from: change.doc.data().from,
                        content: change.doc.data().content
                    })
                }
            })
        })

    },
    methods:{
        addReview(){
            if(this.user){
                if(this.newComment){
                    this.feedback= null
                    db.collection('comments').add({
                        from: this.user.id,
                        content: this.newComment,
                        time: Date.now(),
                        to: this.$route.params.id
                    }).then(() =>{
                        this.newComment =null
                    })
                }else{
                    this.feedback = 'You must enter a comment to add it'
                }
            }else{
                this.$router.push({ name: 'Login'})
            }
        }
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Source+Serif+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");

.recipe-details .recipe_image img{
    width: 450px;
    margin-top: 50px;
    border-radius: 5px;
    box-shadow: 0px 9px 19px #00000029;
}
.recipe-details .title{
    font-family: 'Dancing Script';
    text-transform: capitalize;
    text-align: center;
}
.recipe-details .title_row{
    border-bottom: 1px solid #F3C1A0;
}
.recipe-details .sub-title{
    font-family: 'Source Serif Pro', serif;
    margin-left: 15%;
    text-transform: capitalize;
    font-size: 25px;
    color: #E1B89D;
    font-weight: 600;
}
/* .recipe-details ul{
    height: 150px;
    /* overflow-y: scroll; 
} */
.recipe-details .ingredients{
    font-family: 'Source Serif Pro', serif;
    font-size: 20px;
    
}
.recipe-details .dsc{
    font-family: 'Source Serif Pro', serif;
    font-size: 20px;
}
.recipe-details .review_title{
    font-family: 'Source Serif Pro', serif;
    margin-bottom: 0;
}

.recipe-details .ing{
    border-right: 1px solid #F3C1A0;
    padding: 1% 3% 0;
}
.recipe-details .desc{
    padding: 1% 3% 0;
}
.recipe-details .review_row{
    margin-top: 10%;
}
.recipe-details .review-content{
    border-bottom: 1px solid #E1B89D ;
}
.recipe-details .review-content .review{
    font-family: 'Source Serif Pro', serif;
    font-size: 20px;
}
.recipe-details .review-content .review_author{
    font-family: 'Source Serif Pro', serif;
    font-size: 16px;
    color: gray;
}
</style>