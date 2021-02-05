<template>
    <div v-if="user" class="edit-profile">
        <div class="row">
            <div class="col s5" >
                <img :src="profile_pic"  class="profile_pic" >

            </div>
            <div class="col s7">
                <a class="waves-effect waves-light btn back" @click="back"><i class="material-icons left">arrow_back</i>Back</a>
                <div class="card">
                    <h2 class="card-title center">Edit {{user.name}}'s profile</h2>
                    <div class="card-content">
                        <form @submit.prevent="signup" class="card-panel">
                            <div class="row">
                                <div class=" col s5 field ">
                                    <label for="first_name">First Name</label>
                                    <input  id="first_name" type="text" v-model="user.name">
                                </div>
                                <div class=" col s5 field">
                                    <label for="last_name">Last Name</label>
                                    <input id="last_name" type="text" v-model="user.lastname">
                                    
                                </div>
                            </div>
                            <div class="field">
                                <label for="email">Email</label>
                                <input type="email" name="email" v-model="user.email">
                            </div>
                              
                          
                            <div class="row">
                            <div class="field col s6">
                                <label for="username">Username</label>
                                <input type="text" name="email" v-model="user.username" disabled>
                            </div>
                            
                              <div class="file-field input-field col s6">
                                <div class="btn">
                                    <span>File</span>
                                    <input type="file" @change="previewImage" accept="image/*">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" placeholder="Change profile picture" @change="previewImage" accept="image/*">
                                </div>
                                </div>
                            </div>
                            <p class="red-text center" v-if="feedback">{{ feedback}}</p>
                            <div class="filed center">
                                <button class="btn btn-large" @click="editUser">edit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
export default {
    name:'EditProfile',
    data(){
        return{
            user: null,
            profile_pic: null,
            feedback: null
        }
    },
    created(){
        let ref= db.collection('users').where('username','==',this.$route.params.id)
        ref.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.user = doc.data()
                this.user.id = doc.id
            })
        }).catch(err =>{
            console.log(err)
            this.feedback = err.message
        })
    },
    methods: {
        previewImage(event) {
            // Reference to the DOM input element
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                // create a new FileReader to read this image and convert to base64 format
                var reader = new FileReader();
                // Define a callback function to run, when FileReader finishes its job
                reader.onload = (e) => {
                    // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                    // Read image as base64 and set to imageData
                    this.profile_pic = e.target.result;
                }
                // Start the reader job - read file as a data url (base64 format)
                reader.readAsDataURL(input.files[0]);
            }
        },
          editUser(){
            if(this.user.name && this.user.lastname && this.user.email && this.user.username){
                db.collection('users').doc(this.user.id).update({
                    name: this.user.name,
                    lastname : this.user.lastname,
                    email: this.user.email,
                    username: this.user.username,
                    profile_img: this.profile_pic
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
        back(){
            return this.$router.go(-1)
        }
    
    }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Source+Serif+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap");
.edit-profile .profile_pic{
    width: 400px;
    margin: 130px 200px;
    border-radius: 50%;
}
.edit-profile .card{
        max-width: 900px;
        min-height: 600px;
        margin-top: 40px;
    }

.edit-profile .card .card-title{
    font-size: 3em;
    padding: 25px 0 0 0;
    font-family: 'Dancing Script';
}
.edit-profile .card .field{
    position: relative;
}
.edit-profile .visibility{
    position: absolute;
    right: 0;
    top: 30px;
}
.edit-profile .back{
    margin-top: 30px;
}
</style>