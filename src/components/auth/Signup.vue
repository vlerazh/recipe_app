<template>
    <div class="signup">
        <div class="row">
            <div class="col s5 signup_bg">
            </div>
            <div class="col s7">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title center">Signup</span>
                        <form @submit.prevent="signup" class="card-panel">
                            <div class="row">
                                <div class=" col s5 field ">
                                    <label for="first_name">First Name</label>
                                    <input  id="first_name" type="text" v-model="name">
                                </div>
                                <div class=" col s5 field">
                                    <label for="last_name">Last Name</label>
                                    <input id="last_name" type="text" v-model="lastname">
                                    
                                </div>
                            </div>
                            <div class="field">
                                <label for="email">Email</label>
                                <input type="email" name="email" v-model="email">
                            </div>
                                <div class="field">
                                <label for="password">Password</label>
                                <input :type="[showPw ?'text' : 'password']" name="password" v-model="password" @keyup="checkCapsLock">
                                <span v-if="showPw" class="material-icons visibility" @click="showPw =! showPw" >visibility</span>
                                <span v-if="!showPw" class="material-icons visibility" @click="showPw =! showPw" >visibility_off</span>
                            </div>
                            <div class="field">
                                <label for="username">Username</label>
                                <input type="text" name="email" v-model="username">
                            </div>
                            <p class="red-text center" v-if="feedback">{{ feedback}}</p>
                            <div class="filed center">
                                <button class="btn btn-large">signup</button>
                            </div>
                            <router-link :to="{ name: 'Login'}"> <span class="teal-text lighten-2 login">Already have an account?</span></router-link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import slugify from 'slugify'
import db from '@/firebase/init'
export default {
    name: 'Signup',
    data(){
        return{
            showPw: false,
            email: null,
            password: null,
            name: null,
            lastname:null,
            feedback: null,
            username: null,
            slug: null,
            profile_img: require('../../assets/defaultUser.jpg')
        }
    },
    methods: {
        checkCapsLock(){
            if (event.getModifierState("CapsLock")) {
              this.feedback = 'Caps lock is on'
            }else{
                this.feedback = null
            }
        },
        signup(){
            if(this.username && this.email && this.password){
                this.slug = slugify(this.username , {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })

                let ref = db.collection('users').doc(this.slug)
                ref.get().then(doc =>{
                    if(doc.exists){
                        this.feedback = "This username exists"
                    }else{
                        firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
                        .then(cred =>{
                            ref.set({
                                username: this.slug,
                                user_id: cred.user.uid,
                                name: this.name,
                                lastname: this.lastname,
                                email: this.email,
                                profile_img: this.profile_img
                            })
                        }).then(() =>{
                            this.$router.push({name : 'UserProfile', params: {id: doc.id}})
                        }).catch(err =>{
                            this.feedback = err.message
                        })
                    }
                })
            }
        }
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Source+Serif+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");

    .signup .signup_bg{
        background: url('../../assets/bg1.jpg');
        background-repeat: no-repeat;
        background-position: left;
        background-size: contain;
        height: 830px;  
    }
    .signup .card{
        max-width: 700px;
        min-height: 600px;
        margin-top: 60px;
    }
    .signup .card form{
        min-height: 570px;
    }
    .signup .card .card-title{
        font-size: 3em;
        padding-bottom: 15px;
        font-family: 'Dancing Script';
        
    }
    .signup .card form .field{
        margin: 15px 5px;
        position: relative;
    }
    .signup .visibility{
        position: absolute;
        right: 0;
        top: 30px;
    }
    .signup .btn{
        width: 40%;
        margin-top: 5%;
        font-family: 'Source Serif Pro', serif;
        font-size: 1.5em;
    }
    .signup .login {
        font-family: 'Source Serif Pro', serif;
        font-size: 1.1em;
        float: right;
        margin-top:20px ;
    }
</style>