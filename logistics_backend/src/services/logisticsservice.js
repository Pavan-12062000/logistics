const DbConnection = require('../dbconnection/dbconnection-data');
const logError = require('../utilities/errorLogger');
const dbConnectionInstance = new DbConnection();  

class LogisticsService {
    async register(req) {
        const params =  JSON.parse(req.body.params);
        let response;
            const username = params.username;
            const email = params.email;
            const password = params.password;
            const role = params.role;
            try{
                response = await dbConnectionInstance.register(username, email, password, role);
                return response;
            }catch(err){
                logError(err);
            }
    }
    async login(req){
        const params =  JSON.parse(req.body.params);
        let response;
        const email = params.email;
        const password = params.password;
        try{
            response = await dbConnectionInstance.login(email, password);
            return response;
        }catch(err){
            logError(err);
        }
        
    }
    async contact(req){
        const params = JSON.parse(req.body.params);
        let response;
        const firstname = params.firstname;
        const lastname = params.lastname;
        const email = params.email;
        const comments = params.comments;
        try{
            response = await dbConnectionInstance.contact(firstname, lastname, email, comments);
            return response;
        }catch(err){
            logError(err);
        }
    }

    async quote(req){
        const params = JSON.parse(req.body.params);
        let response;
        const flag = params.flag;
        try{
            const shipmentFrom = params.shipmentFrom;
            const shipmentTo = params.shipmentTo;
            const weight = params.weight;
            if(flag == 'loggedIn'){
                const username = params.username
                response = await dbConnectionInstance.loggedInQuote(username, shipmentFrom, shipmentTo, weight);
                return response;
            }else{
                const firstname = params.firstName;
                const lastname = params.lastName;
                const email = params.email;
                console.log("else loop", firstname, lastname, email, shipmentFrom, shipmentTo, weight);
                response = await dbConnectionInstance.quote(firstname, lastname, email, shipmentFrom, shipmentTo, weight);
                return response;
            }
            
        }catch(err){
            logError(err);
        }
    }

    async newsletter(req){
        const params = JSON.parse(req.body.params);
        let response;
        const email = params.email;
        try{
            response = await dbConnectionInstance.newsletter(email);
            return response;
        }catch(err){
            logError(err);
        }
    }

    async track(req){
        console.log("req", req.body)
        const params = JSON.parse(req.body.params);
        console.log("params", params);
        let response;
        const trackingId = params.trackingId;
        try{
            response = await dbConnectionInstance.track(trackingId);
            return response;
        }catch(err){
            logError(err);
        }
    }

    async updateTrack(req){
        const params = JSON.parse(req.body.params);
        let response;
        const trackingId = params.trackingId;
        const status_code = params.status_code;
        try{
            response = await dbConnectionInstance.updateTrack(trackingId, status_code);
            return response;
        }catch(err){
            logError(err);
        }
    }
}
  
module.exports = LogisticsService;