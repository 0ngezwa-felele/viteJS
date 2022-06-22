import axios from 'axios';

export default function App() {
    return {
        user:{
            username: null,
            password: null
        },
        logUser:{
            username: null,
            password: null
        },
        logged:[],

        registration() {
            console.log(this.user);
            axios
            .post('http://localhost:1420/api/register', this.user)
            .then((result)=>{
                console.log(result.data)
            })
            console.log(this.user);
        },

        login(){
            axios
            .post('http://localhost:1420/api/login', this.logUser)
            .then((result)=>{
                var  accessToken = result.data
                console.log(result.data);
                console.log( accessToken );
                if(accessToken == null){
                    return false
                }else{
                    
                }

            })
            console.log(this.logUser);
        }
    }

}