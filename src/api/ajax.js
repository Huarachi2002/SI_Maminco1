import axios from 'axios'
import { message } from 'antd'
import instance from '../utils/tokenUtils'

export function ajax(url, data = {}, type = 'GET') {
    return new Promise((resolve,reject)=>{
        let promise
        if (type === "GET") {
            promise = axios.get(url,{
                params: data
            })
        }else {
            promise = axios.post(url, data)
        }
        promise.then(response=>{
            resolve(response)
        }).catch(err=>{
            message.error("failed"+err.message)
        })
    })
    
}   

export function ajaxToken(url, data = {}, type = 'GET') {
    return new Promise((resolve,reject)=>{
        let promise
        if (type === "GET") {
            promise = instance.get(url,{
                params: data
            })
        }else {
            promise = instance.post(url, data)
        }
        promise.then(response=>{
            resolve(response)
        }).catch(err=>{
            message.error("failed "+err)
        })
    })
    
}   