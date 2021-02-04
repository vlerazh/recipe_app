<template>
    <div class="login">
        <div class="row">
            <div class="col s5 login_bg">
            </div>
            <div class="col s7">
                <div class="card">
                    <div class="card-content">
                        <span class="card-title center">Login</span>
                        <form @submit.prevent="login" class="card-panel">
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
                            <p class="red-text center" v-if="feedback">{{ feedback}}</p>
                            <div class="filed center">
                                <button class="btn btn-large">Login</button>
                            </div>
                            <router-link :to="{ name: 'Signup'}"> <span class="teal-text lighten-2 signup">Don't have an account?</span></router-link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
export default {
    name: 'Login',
    data(){
        return{
            showPw: false,
            email: null,
            password: null,
            feedback: null
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
        login(){
            if(this.email && this.password){
                firebase.auth().signInWithEmailAndPassword(this.email,this.password)
                .then(cred =>{
                    //redirect te profile
                    console.log(cred.user)
                    this.$router.push({name : 'UserProfile', params:{id: ''}})
                }).catch(err =>{
                    console.log(err)
                    this.feedback = err.message
                })
             }
        }
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Source+Serif+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");

    .login .login_bg{
        background: url('../../assets/bg1.jpg');
        background-repeat: no-repeat;
        background-position: left;
        background-size: contain;
        height: 830px;  
    }
    .login .card{
        max-width: 700px;
        min-height: 500px;
        margin-top: 60px;
    }
    .login .card form{
        min-height: 400px;
    }
    .login .card .card-title{
        font-size: 3em;
        padding-bottom: 15px;
        font-family: 'Dancing Script';
        
    }
    .login .card form .field{
        margin: 25px 5px;
        position: relative;
    }
    .login .visibility{
        position: absolute;
        right: 0;
        top: 30px;
    }
    .login .btn{
        width: 40%;
        margin-top: 5%;
        font-family: 'Source Serif Pro', serif;
        font-size: 1.5em;
    }
    .login .signup{
        font-family: 'Source Serif Pro', serif;
        font-size: 1.1em;
        float: right;
        margin-top:20px ;
    }
</style>