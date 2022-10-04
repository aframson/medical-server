
/** REAL-TIME API
 * =======================================================================
 *  This is an example to recive userdata , update it and send back 
 *  response in realtime.
 * =======================================================================
 */
const local_connection =  require('../../../settings/configs/database/mysql/connection')



module.exports = userModel = (socket,io)=>{



    socket.on('fetch-doc',(d)=>{
        let query = `SELECT * FROM users WHERE type="doc"`
        local_connection.query(query, function (error, results, fields) {
            if (error) {
            } else {
               io.emit('fetch-doc',results) // send response to the listening channel 'get-user' 
            }
        });
    })





    
    socket.on('count-user',(d)=>{
        let query = `SELECT * FROM users WHERE type="user"`
        local_connection.query(query, function (error, results, fields) {
            if (error) {
            } else {
               let number  = results.length
               io.emit('count-user',number) // send response to the listening channel 'get-user' 
            }
        });
    })


    socket.on('count-doc',(d)=>{
        let query = `SELECT * FROM  users WHERE type="doc"`
        local_connection.query(query, function (error, results, fields) {
            if (error) {
                
            } else {
               let number  = results.length
               io.emit('count-doc',number) // send response to the listening channel 'get-user' 
            }
        });
        
        
    })


}