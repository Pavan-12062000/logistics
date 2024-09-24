class queryConstants{

    register = `insert into user_details (username, firstname, email, password, role) values ($1, $2, $3, $4, $5)`;

    login = `select username, firstname, email, role from user_details where email = $1 and password = $2`;

    contact = `insert into contact (firstname, lastname, email, comments, timestamp) values ($1, $2, $3, $4, now())`;

    getDetailsWithUsername = `select firstname, lastname, email from user_details where username = $1`;

    quote = `insert into quote (firstname, lastname, email, shipmentfrom, shipmentto, weight, emailcheck, timestamp) values 
    ($1, $2, $3, $4, $5, $6, $7, now())`

    emailexists = `select email from newsletter where email = $1`;

    newsletter = `insert into newsletter (email, createdat) values ($1, now())`;

    track = `select * from track_order where tracking_id = $1`;

    updateTrack = `update track_order set status = $3, status_code = $2, updated_timestamp = now() where tracking_id = $1`;
}

module.exports = new queryConstants();