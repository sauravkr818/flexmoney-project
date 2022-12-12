# flexmoney-project

## This project is used to build an admission form for the Yoga Classes.

### Problem Statement:
Assume that you are the CTO for the outsourcing firm which has been chosen to build an
admission form for the Yoga Classes which happen every month.
Requirements for the admission form are:
- Only people within the age limit of 18-65 can enroll for the monthly classes and they will
be paying the fees on a month on month basis. I.e. an individual will have to pay the fees
every month and he can pay it any time of the month.
- They can enroll any day but they will have to pay for the entire month. The monthly fee is
500/- Rs INR.
- There are a total of 4 batches a day namely 6-7AM, 7-8AM, 8-9AM and 5-6PM. The
participants can choose any batch in a month and can move to any other batch next
month. I.e. participants can shift from one batch to another in different months but in
same month they need to be in same batch.

## HOSTED WEBSITE - https://yoga-classes123.netlify.app/

### Approach to the problem:

I have used the following technologies to built the website
- Frontend is built with **_React.js_**
- Backend is built with **_Node.js_**, **_Express.js_**
- Database - **_MongoDB_**

### Hosting
- Frontend - Netlify
- Backend - glitch
- Database - mongoDB cloud

### Workflow

![Flowchart Template](https://user-images.githubusercontent.com/71181112/207106118-3265f721-1fd8-4ca6-872b-418e6268b245.jpg)

#### Explanaiton of the workflow

First the user visits the homepage of the website, i.e., [https://yoga-classes.com](https://yoga-classes123.netlify.app/) where he will be asked to signup or login.
After successful signup, he will be pushed to the login screen where he can login and go the dashboard where he can see his details about the payment due and the class he have joined. If he have not done the payment then he will be asked to pay the payment by entering the class details and the payment details.


## Frontend

Project Structure


<img width="116" alt="Screenshot_20221212_223951" src="https://user-images.githubusercontent.com/71181112/207109473-4bee0c30-1ee3-4177-85ba-d9bcd0aa17e7.png">


I have made 5 components namely:

### Yogapage.js
This is the homepage of the website yogaclasses.
 
### signup.js
This is the signup page where users have to signup

### login.js
This is the login page where users have to login

### dashboard.js
This is the dashboard where users will see their infomation (name, email, payment related info)

### navbar.js
Navbar is a component used to show header.

### Packages installed


<img width="269" alt="Screenshot_20221212_224143" src="https://user-images.githubusercontent.com/71181112/207113338-81e34fb5-c4ea-41a7-bd18-c7fd2f75fbb5.png">




## Backend

### Packages installed



### Project Structure


![image](https://user-images.githubusercontent.com/71181112/207114808-92a45eee-338b-4676-b8ef-105596630b51.png)


### API ENDPOINTS

## Endpoint - ('/register')

Accepts parameters from the frontend like
- name
- email
- password
- confirm password
- phone
- date of birth
- gender

then the basic validation is done using the function validateRegisterInput() which takes the request body stated above and return if there is an error or not
Now if there is an error then an error response is send back to the frontend specifying the error.

Now if validation is correct then we will move forward and check whehter the email exists on the database or not.

 We have used findOne to check if it exists or not.
 If exists then return the response with **Email already exists**
 
``` 
User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
        return res.status(400).json({ email: "Email already exists" });
    }
    else{
    // Save the user in the database
    }
```

**IF USER DOES NOT EXIST**

Then save the user in the database in the collection called **users** and at the same time we will save the payment information of the user in a different collection called **membership**

[IMPORTANT]
- Hash the password before saving in the database so that admin of the database will also not able to see the password.
- For hashing I have used **bcryptjs** library to hash the password.

## Endpoint - ('/login')    

Accepts paramters from the frontend 
- email
- password

then the basic validation is done using the function validateLoginInput() which takes the request body stated above and return if there is an error or not
Now if there is an error then an error response is send back to the frontend specifying the error.

Now if validation is correct then we will move forward and check whehter the email exists on the database or not.

```
User.findOne({ email }).then((user) => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ err: "Email/Password is wrong" });
        }
        else{
            // check whether the password is correct or not
        }
```

##### Features:
- A **JWT** token is sent if password matches which contains information like expiry time of the token as well as name and email (here).
- This will help users to login without even filling the details in the login page.
- They will be redirected to the '/dashboard' if the token is correct.

## Endpoint - ('/payment')    

Accepts paramters like:
- batch
- amount_paid

then the basic validation is done using the function validatePaymentInput() which takes the request body stated above and return if there is an error or not
Now if there is an error then an error response is send back to the frontend specifying the error.

Now if validation is correct then we will move forward and check whehter the email exists on the database or not.

##### Features:
- **completePayment() function** - This is the function where approval of payment is done. In this function, there will be a **payment gateway** (ex- razorpay gateway) from which we will confirm whether out payment is done or not. As per the problem statement, I have not implemented this.
- **Assumptions** - **Payment is always successful**
- Cases:
- Case (i) Payment is failed then return as Payment failed
- Case (ii) If the subscription of the Yoga Classes crosses the month end then set all the fields rellated to the payment of the users to null.
```
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        payment_done: false,
                        amount_paid: null,
                        days_left: 0,
                        transaction_token: null,
                        start_date: null,
                        end_date: null,
                        batch: null,
```
- Case (iii) If someone tries to repay it then it will return with **Payment already Done**.
- Case (iv) Otherwise set the database such that now the payment is done. After this Payment information is updated in the database.
```
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        payment_done: payment_done,
                        amount_paid: amount_paid,
                        days_left: days_left,
                        transaction_token: transaction_token,
                        start_date: start_date,
                        end_date: end_date,
                        batch: batch,
```


## Database

### MongoDB
I have hosted my database in the mongoDB cloud.
There are two collections (tables) in my database:
- **users**
- **memberships**

#### Schema of Users Table


```
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    default: Date.now
  },
  date: {
    type: Date,
    default: Date.now
  }
```

#### Schema of memberships table

```
const memberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  payment_done: {
    type: Boolean,
    default: false,
  },
  amount_paid: {
    type: String,
    default: null,
  },
  transaction_token: {
    type: String,
    default: null
  },
  start_date: {
    type: Date,
    default: null
  },
  end_date: {
    type: Date,
    default: null
  },
  days_left: {
    type: Number,
    default: null
  },
  phone: {
    type: Number,
    required: true
  },
  batch: {
    type: String,
    default: null
  }
```

## ER Diagram of my database


<img width="658" alt="Screenshot_20221213_000522" src="https://user-images.githubusercontent.com/71181112/207162833-0dc6d654-22c7-4b87-b82c-9bd0e44e81e9.png">



<img width="735" alt="Screenshot_20221213_000812" src="https://user-images.githubusercontent.com/71181112/207162852-875aae52-cac3-4ad3-9e57-fcdd7ae0a111.png">





