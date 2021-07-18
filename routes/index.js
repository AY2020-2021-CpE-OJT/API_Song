const express = require('express');
const router = express.Router();
const Data = require('../models/model');

//post
router.post('/new', async (req,res)=>{

    const contact = new Data({
        lname : req.body.lname,
        fname : req.body.fname,
        phone_number : req.body.phone_number
    });

    await contact.save().then(contact => {
        res.send(contact);
    }).catch(error => {
        res.status(500).send("Fail to add");
    })
    res.end();

})

// Get all Data
router.get('/', async (req,res)=>{
    res.json(data = await Data.find());
})

//Get by Last name
router.get('/getByLname',async(req,res)=>{
    const data = await Data.find({lname:req.body.lname}).then(data => {
        res.json(data);
        });
    //res.json(data = await Data.findOne({lname : req.params.lname}));
})

//Get by First name
router.get('/getByFname',async(req,res)=>{
    res.json(data = await Data.find({fname: req.body.fname}));
})

//Get by Phone Number
router.get('/getByPhoneNumber', async(req,res)=>{
    res.json(data = await Data.findOne({phone_number: req.body.phone_number}));
})

// Delete Data
router.delete('/delete/:_id', async(req,res)=>{
    const deleteData = await Data.findByIdAndDelete(req.params._id);
    res.json(deleteData);
})

// Update
router.patch('/update/:_id', async(req,res)=>{
    const patch = await Data.findByIdAndUpdate(req.params._id,
        {
            lname: req.body.lname,
            fname: req.body.fname,
            phone_number: req.body.phone_number
        })
    res.json(patch);
})

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Data = require('../models/model');

// //post
// router.post('/new', async (req,res)=>{

//     contact = new Data({
//         name : {
//             lname : req.body.lname,
//             fname : req.body.fname
//         },

//         phone_number : req.body.phone_number
//     });

//     await contact.save().then(contact => {
//         res.send(contact);
//     }).catch(error => {
//         res.status(500).send("Fail to add");
//     })
//     res.end();

// })

// // Get all Data
// router.get('/', async (req,res)=>{
//     res.json(data = await Data.find());
// })

// //Get by Last name
// router.get('/getByLname/:lname',async(req,res)=>{
//     data = await Data.find({phone_number: req.params.lname}).then(data => {res.json(data)});
// })

// //Get by First name
// router.get('/getByFname/:fname',async(req,res)=>{
//     data = await Data.find({phone_number: req.params.fname}).then(data => {res.json(data)});
//     //res.json(data = await Data.findOne({fname: req.params.fname}));
// })

// //Get by Phone Number
// router.get('/getByPhoneNumber/:phoneNumber', async(req,res)=>{
//     data = await Data.find({phone_number: req.params.phone_number}).then(data => {res.json(data)});
// })

// // Delete Data
// router.delete('/delete/:lname', async(req,res)=>{
//     res.json(Delete = await Data.findOneAndDelete({lname: req.params.lname}));
// })

// // Update Last name
// router.put('/update/:lname', async(req,res)=>{
//     res.json(patch = await Data.findOneAndUpdate({lname: req.params.lname}));
// })

// // Update First name
// router.patch('/update/:fname', async(req,res)=>{
//     res.json(patch = await Data.fineOneAndupdate({fname: req.params.fname}));
// })

// // Update Phone number
// router.patch('/update/:fname', async(req,res)=>{
//     res.json(patch = await Data.fineOneAndupdate({phone_number: req.params.phone_number}));
// })

// module.exports = router;


// module.exports = (app) => {
//     //Get all data
//     app.get('/', async(req,res)=>{
//         const data = await Data.find();
//         res.json(data);
//     });

//     //Create new Data
//     app.post('/new', async(req,res)=>{
//         const new_Data = new Data(req.body);
//         const save_data = await new_Data.save();
//         res.json(save_Data);
//         res.end();
//     });

//     // Get specific Data
// app.get('/get/:lname',async(req,res)=>{
//     const data = await Data.findOne({lname: req.params.lname});
//     res.json(data);
//     res.end();
// });

// // Get specific Data
// app.get('/get/:fname',async(req,res)=>{
//     const data = await Data.findOne({fname: req.params.fname});
//     res.json(data);
//     res.end();
// });

// // Delete Data
// app.delete('/delete/:lname', async(req,res)=>{
//     const Delete = await Data.findOneAndDelete({lname: req.params.lname});
//     res.json(Delete);
//     res.end();
// });

// // Delete Data
// app.delete('/delete/:fname', async(req,res)=>{
//     const Delete = await Data.findOneAndDelete({fname: req.params.fname});
//     res.json(Delete);
//     res.end();
// });

// // Update Last name
// app.put('/update/:lname', async(req,res)=>{
//     const put = await Data.findOneAndUpdate({lname: req.params.lname});
//     res.json(patch);
//     res.end();
// });

// // Update First name
// app.patch('/update/:fname', async(req,res)=>{
//     const patch = await Data.fineOneAndupdate({fname: req.params.fname});
//     res.json(patch);
//     res.end();
// });

// // Upate Last name
// app.patch('/update/:fname', async(req,res)=>{
//     const patch = await Data.fineOneAndupdate({fname: req.params.fname});
//     res.json(patch);
//     res.end();
// });
// }