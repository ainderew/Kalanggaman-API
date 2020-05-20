const express = require("express");
const router = express.Router();
const GuestReservation = require("../Models/GuestReservation");

router.get("/", paginatedResults(GuestReservation), async (req,res)=>{
    res.json(res.paginatedResults)
    
})

function paginatedResults(model) {
    return async (req,res,next) =>{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
    
        const startIndex = (page-1) * limit;
        const endIndex = page * limit;
    
        const results = {};
    
        results.next = {
            page: page + 1,
            limit: limit
        }
        if (startIndex > 0){
            results.prev = {
                page: page - 1,
                limit: limit
            }
        }
        try{
            results.results = await model.find().limit(limit).skip(startIndex).exec()
            res.paginatedResults = results.results
            next()
        }catch (e){
            res.status(500).json({message: e.message})
        }
       
        
      
    }
}
module.exports = router;