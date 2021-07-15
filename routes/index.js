const express = require('express');
const router = express.Router();
const Data = require('../models/model');

//post
router.post('/new', async (req,res)=>{

    contact = new Data({
        name : {
            lname : req.body.Lname,
            fname : req.body.Fname
        },

        phone_number : req.body.Phone_number
    });

    await book.save().then(book => {
        res.send(book);
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
router.get('/get/:lname',async(req,res)=>{
    res.json(data = await Data.findOne({lname : req.params.Lname}));
    res.end();
})

//Get by First name
router.get('/get/:fname',async(req,res)=>{
    res.json(data = await Data.findOne({fname: req.params.Fname}));
    res.end();
})

// Delete Data
router.delete('/delete/:lname', async(req,res)=>{
    res.json(Delete = await Data.findOneAndDelete({lname: req.params.Lname}));
    res.end();
})

// Update Last name
router.put('/update/:lname', async(req,res)=>{
    res.json(patch = await Data.findOneAndUpdate({lname: req.params.Lname}));
    res.end();
})

// Update First name
router.patch('/update/:fname', async(req,res)=>{
    res.json(patch = await Data.fineOneAndupdate({fname: req.params.Fname}));
    res.end();
})

// Update Phone number
router.patch('/update/:fname', async(req,res)=>{
    res.json(patch = await Data.fineOneAndupdate({phone_number: req.params.Phone_number}));
    res.end();
})

module.exports = router;


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