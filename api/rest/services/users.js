
/** API MODELS
 * =======================================================================
 *  A  file consisting of all the request needed for an API endpont 
 * 
 *  this is an example with a dummy-data of users to get userdata on 
 * 
 *  GET /http://localhost:5050/users/fetch
 * 
 *  POST /http://localhost:5050/users/add  
 * 
 *  with a listerner of 'fetch-user' for realtime comunications
 *  kindly check documentaion for more details.
 * =======================================================================
 */
const express = require('express')
const router =  new express.Router()
const {basicAuth} = require('../../../settings/middlewares/index')
const local_connection = require('../../../settings/configs/database/mysql/connection')


module.exports = function userEndpoint(io) {
    
    // fetch user endpoint
    router.get('/fetch',basicAuth,async(req,res,next)=>{
       res.status(200).send(userData)
    })

   
    router.post('/add',basicAuth,async (req,res,next)=>{
        const {fname,lname,email,phone,specialty,dob,password,type} = req.body;
        let query = `INSERT INTO users(fname,lname,email,phone,specialty,dob,password,type) VALUES ('${fname}','${lname}','${email}','${phone}','${specialty}','${dob}','${password}','${type}')`
        local_connection.query(query, function (error, results, fields) {
            if (error) {
                res.status(404).send(error)
            } else {
                let query = type === 'doc'?`SELECT * FROM users WHERE type='doc'`:`SELECT * FROM users WHERE type='user'`;
                local_connection.query(query, function (error, results, fields) {
                    if (error) {
                        res.status(404).send(error)
                    } else {
                       res.status(200).send(results)
                       let number = results.length
                       if(type === 'doc'){
                        io.emit('count-doc',number)
                       }else{
                        io.emit('count-user',number)
                       }
                    }  
                });


               
            }
        });
    })

    router.post('/login',basicAuth,async (req,res,next)=>{
        const {email,password} = req.body;
        let query = `SELECT * FROM users WHERE email='${email}' AND password='${password}'`
        local_connection.query(query, function (error, results, fields) {
            if (error) {
                res.status(404).send(error)
            } else {
               res.status(200).send(results)
            }  
        });
    })

    return router; // make sure you return router
}