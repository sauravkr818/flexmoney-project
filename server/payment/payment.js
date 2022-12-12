const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function completePayment(data) {
    
    const email = data.email;
    const amount = data.amount_paid;
    let success;
    const batch = data.batch;

    // -------------------------------------
    // api of razor pay
    

    // -------------------------------------
    // success will come from payment api 
    // let say payment is done then success = true
    success = 'true'; // taken true because payment gateway is not implemented as per assignment
    if(success === 'true'){
        
        let todayDate = new Date();
        let lastDayOfMonth = new Date(todayDate.getFullYear(), todayDate.getMonth()+1, 0);
        return{
            payment_done : true,
            amount_paid: amount,
            date: Date.now(),
            days_left: lastDayOfMonth.getDate() - todayDate.getDate(),
            transaction_token: 'abcdmn',
            start_date: todayDate,
            end_date: lastDayOfMonth,
            batch: batch,
        }
    }
    else{
        return{
            payment_done : false,
            amount_paid: null,
            date: null,
            days_left: 0,
            transaction_token: null,
            start_date: null,
        }
    }
  };