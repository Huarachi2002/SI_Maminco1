import store from 'store'
const USER_KEY = 'user_key'

const storageUtils = {
    // guardar datos de user
    saveUser(user){
        store.set(USER_KEY,user)
    },
    // leer datos de user
    getUser(){
       return store.get(USER_KEY) || {}
    },
    // delete datos de user
    removeUser(){
        store.remove(USER_KEY)
    }
}
export default storageUtils