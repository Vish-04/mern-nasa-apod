const router = require("express").Router();
let User = require("../Models/userinfo.model.js")


//CRUD OPERATIONS
//fetches users
router.route("/").get((req, res) =>{
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error:" +err));
});


//adds users
router.route("/add").post((req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({username, password})

    newUser.save()
        .then(()=>{res.json("User Added")})
        .catch((err)=>{res.status(400).json("Error:" +err)})
})

// fetches user by username
router.route("/:username").get((req, res)=>{
    User.findOne({ username: req.params.username })
        .then((user) => {res.json(user)})
        .catch((err)=>{res.status(400).json("Error:" +err)});
})


// fetches user by id
router.route("/id/:id").get((req, res)=>{
    User.findById(req.params.id)
        .then((user) => {res.json(user)})
        .catch((err)=>{res.status(400).json("Error:" +err)});
})

// deletes user
router.route("/delete/:id").get((req, res)=>{
    User.findByIdAndDelete(req.params.id)
        .then(() => {res.json("User Deleted")})
        .catch((err)=>{res.status(400).json("Error:" +err)});
})

// updates user
router.route("/update/:id").post((req, res)=>{
    User.findByIdAndUpdate(req.params.id)
        .then((user) => {
            if (req.body.username != null){
                user.username = req.body.username;
            }
            if (req.body.password != null){
                user.password = req.body.password;

            }

            user.save()
                .then(()=>{res.json("User Updated")})
                .catch((err)=>{res.status(400).json("Error:" +err)});
        })
        .catch((err)=>{res.status(400).json("Error:" +err)});
})

module.exports = router;