//basic redis server
const { connect } = require('http2'); 
const net = require('net'); //can create a tcp server using net package
const parser = require('redis-parser'); //to parse all the data

const store = {} //object to store key:value pairs

const server = net.createServer(connection =>{
 console.log('client connected');

 connection.on('data', data => {
    const parser = new ParserError({
        returnReply: (reply) =>{
            const command = reply[0];
            switch(command){
                case 'set': { //to handle the set command
                    const key = reply[1];
                    const value = reply[2];
                    store[key] = value;
                    connect.write('OK\r\n');
                }
                break;

                case 'get': { //to set the get command
                    const key = reply[1];
                    const value = store[key];
                    if(!value) connect.write('$-1\r\n'); //if no key:value pair is present, then return -1 else return the value of key
                    else connection.write(`$${value.length}\r\n${value}\r\n`);
                }
            }
        },
        returnError: (err)=>{
          console.log('=>', err);
        }
    })
    parser.execute(data);
    connection.write('+OK\r\n');  //sending response to in the output
 } )
});

server.listen(8003, ()=> console.log('custom redis running on port 8003'))


//usage: set key value
//    get key  