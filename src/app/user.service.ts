import { Injectable } from '@angular/core'

interface user{
    uid?: string
    username?: string
    nombre?: string
    apellido?: string,
    telefono?: string,
    placas?: string,
    password?: string,
    url?: string
}

@Injectable()
export class UserService{
    private user: user


    constructor(){

    }

    setUser(user: user){
        this.user = user
    }

    getUID(){
        return this.user.uid
    }
}