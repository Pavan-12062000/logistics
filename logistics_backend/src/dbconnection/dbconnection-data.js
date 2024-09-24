const getDbConnection = require('../dbconnection/dbconnection')
let getDbConnectionInstance = new getDbConnection();
const queryConstantsInstance = require('../queryconstants/queryconstants');
const logError = require('../utilities/errorLogger');

class DbConnection{
    async register(username, email, password){
        let client;
        try{
            client = await getDbConnectionInstance.getConnection();
            let query = queryConstantsInstance.register;
            let params =[username, email, password, role];
            console.log(query, params);
            const response = await client.query(query, params);
            return response;
        }catch (error) {
            logError(error);
            throw error;
        }finally{
            if(client){
                await client.end();
            }
        }
    }

    async login(email, password){
        let client;
        try{
            client = await getDbConnectionInstance.getConnection();
            let query = queryConstantsInstance.login;
            let params =[email, password];
            console.log(query, params);
            const response = await client.query(query, params);
            return response.rows;
        }catch (error) {
            logError(error);
            throw error;
        }finally{
            if(client){
                await client.end();
            }
        }
    }

    async contact(firstname, lastname, email, comments){
        let client;
        try{
            client = await getDbConnectionInstance.getConnection();
            let query = queryConstantsInstance.contact;
            let params = [firstname, lastname, email, comments];
            const response = await client.query(query, params);
            return response.rows;
        }catch(error){
            logError(error);
            throw error;
        }finally{
            if(client){
                await client.end();
            }
        }
    }

    async loggedInQuote(username, shipmentFrom, shipmentTo, weight){
        let client;
        try{
            client = await getDbConnectionInstance.getConnection();
            let query1 = queryConstantsInstance.getDetailsWithUsername;
            let params1 = [username];
            const response1 = await client.query(query1, params1);
            const firstname = response1.rows[0].firstname;
            const lastname = response1.rows[0].lastname;
            const email = response1.rows[0].email;
            let query2 = queryConstantsInstance.quote
            const emailcheck = false;
            let params2 = [firstname, lastname, email, shipmentFrom, shipmentTo, weight, emailcheck]
            console.log("query2", query2, params2);
            const response2 = await client.query(query2, params2);
            console.log("response2", response2);
            return response2;
        }catch(error){
            logError(error);
            throw error;
        }finally{
            if(client){
                await client.end();
            }
        }
    }

    async quote(firstname, lastname, email, shipmentFrom, shipmentTo, weight){
        let client;
        try{
            client = await getDbConnectionInstance.getConnection();
            let query = queryConstantsInstance.quote;
            const emailcheck = false;
            let params = [firstname, lastname, email, shipmentFrom, shipmentTo, weight, emailcheck];
            console.log("query", query, params);
            const response = await client.query(query, params);
            console.log("response", response);
            return response;
        }catch(error){
            logError(error);
            throw error
        }finally{
            if(client){
                await client.end();
            }
        }
    }

    async mail(email, shipmentFrom, shipmentTo, weight){

    }

    async newsletter(email){
        let client;
        try{
            client = await getDbConnectionInstance.getConnection();
            let query1 = queryConstantsInstance.emailexists;
            let query2 = queryConstantsInstance.newsletter;
            let params = [email];
            const response = await client.query(query1, params);
            if(response.rows.length == 1){
                return {message: "Email already subscribed",
                        data: response};
            }else{
                const response1 = await client.query(query2, params);
                console.log("response1", response1);
                return response1;
            }
        }catch(error){
            logError(error);
            throw error;
        }finally{
            if(client){
                await client.end();
            }
        }
    }

    async track(trackingId){
        let client;
        try{
            client = await getDbConnectionInstance.getConnection();
            let query = queryConstantsInstance.track;
            let params = [trackingId];
            const response = await client.query(query, params);
            console.log("response", response, response.rows);
            return response.rows;
        }catch(error){
            logError(error);
            throw error;
        }finally{
            if(client){
                await client.end();
            }
        }
    }

    async updateTrack(trackingId, status_code){
        let client;
        try{
            client = await getDbConnectionInstance.getConnection();
            let query = queryConstantsInstance.updateTrack;
            let status = ''
            if(status_code == 2){
                status = 'Order Packed'
            } else if (status_code == 3){
                status = 'Shipment in Progress'
            } else if (status_code == 4){
                status = 'Shipment arrived to nearest hub'
            } else if (status_code == 5){
                status = 'Out for delivery'
            } else if (status_code == 6){
                status = 'Shipment Delivered'
            } else if (status_code >6){
                status = 'Shipment Delivered',
                status_code = 6
            }
            let params = [trackingId, status_code, status];
            const response = await client.query(query, params);
            return response;
        }catch(error){
            logError(error);
            throw error;
        }finally{
            if(client){
                await client.end();
            }
        }
    }
}

module.exports = DbConnection;