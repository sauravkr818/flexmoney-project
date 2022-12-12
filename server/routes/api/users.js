const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validatePaymentInput = require("../../validation/payment");
const completePayment = require("../../payment/payment");
// Load User model
const User = require("../../models/user");
const Member = require("../../models/member");


const getById = async (req, res, next) => {
    //console.log(req);
    const email = req.body.email; // here in params.id id is bookId. 
    let member;
    try{
        // member = await Member.findById(id);

        Member.findOne({ email }).then((memb) => {
            // Check if memb exists
            if (!memb) {
                return res.status(404).json({ err: "Email not found" });
            }
            else{
                res.status(200).json(memb);
            }
        });
    }
    catch(err) {
        console.log(err);
    }

}

router.post('/dashboard', getById);



router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).json({ err: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                gender: req.body.gender,
                dob: req.body.dob,
            });

            const newMember = new Member({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) => {
                            console.log(user)
                            return res.json(user)
                        })
                        .catch((err) => console.log(err));

                    newMember
                        .save()
                        .then((member) => res.json(member))
                        .catch((err) => console.log(err));
                });
            });
        }
    });
});

router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then((user) => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ err: "Email/Password is wrong" });
        }

        // completePayment function

        // Check password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    email: user.email,

                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926, // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ err: "Email/Password is wrong"  });
            }
        });
    });
});

router.post("/payment", (req, res) => {
    // Form validation
    
    const { errors, isValid } = validatePaymentInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    // Find user by email
    Member.findOne({ email }).then((user) => {
        
        // Check if user exists
        if (!user) {
            return res.status(404).json({ err: "Email/Password is wrong"  });
        }

        // completePayment function ()

        const {
            payment_done,
            amount_paid,
            date,
            days_left,
            transaction_token,
            start_date,
            end_date,
            batch,
        } = completePayment(req.body);

        
        if (payment_done === false && amount_paid === null) {
            return res.status(404).json({ err: "Payment failed"  });
        } else if (
            payment_done === true &&
            amount_paid !== null &&
            transaction_token !== null
        ) {


            if (user.start_date !== null && user.end_date !== null && (user.start_date).getMonth() !== (user.end_date).getMonth()) {
                const id = user._id;
                Member.findByIdAndUpdate(
                    id,
                    {
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
                    },
                    function (err, result) {
                        if (err) {
                            res.status(404).json({ err: `Payment Failed - ${err}` });
                        } else {
                            res.status(200).json({ result });
                        }
                    }
                );
            }
            else if (user.payment_done === true && user.transaction_token !== null && user.amount_paid!==null) {
                return res.status(404).json({ err: "Payment already done" });
            }
            else if (user.payment_done === false && user.transaction_token === null && user.amount_paid ===null) {
                const id = user._id;
                Member.findByIdAndUpdate(
                    id,
                    {
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
                    },
                    function (err, result) {
                        if (err) {
                            res.status(404).json({ err: `Payment Failed - ${err}` });
                        } else {
                            result = {
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
                            }
                            res.status(200).json({ result });
                        }
                    }
                );
            }
        }
    });
});

module.exports = router;
