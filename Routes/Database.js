const express = require("express");
const router = express.Router();
const GuestReservation = require("../Models/GuestReservation");

const months = [ "Jan", "Feb", "March", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

const dateToday = new Date;
const month = months[dateToday.getMonth()]
const regToday = new RegExp(month,"i")

//ROUTES

router.get("/", paginatedResults(GuestReservation), async (req,res)=>{
    res.json(res.paginatedResults)
    
})

router.get("/findSpecific", searchResults(GuestReservation,"name"), async (req,res) =>{
    res.json(res.searchResults)
    
})



router.get("/currentMonthFilter",currentMonthFilter(), async (req,res) =>{
    res.json(res.response)
    

})
router.get("/findSpecificFilteredByMonth",searchResultsFilteredByMonth(GuestReservation), async (req,res) =>{
    res.json(res.searchResults)
    

})

//to hoist
function paginatedResults(model) {
    return async (req,res,next) =>{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        
        const startIndex = (page-1) * limit;
        const endIndex = page * limit;
        const maxDocs = await model.estimatedDocumentCount()
        const results = {};

        results.current = {
            page: page
        }
    
        if(endIndex < maxDocs ){
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
       
        if (startIndex > 0){
            results.prev = {
                page: page - 1,
                limit: limit
            }
        }
        try{
            results.results = await model.find().sort({"name":1}).limit(limit).skip(startIndex)
            results.counter = maxDocs
            results.totalPage = Math.ceil(results.counter/limit)
            res.paginatedResults = results
            
            next()
        }catch (e){
            res.status(500).json({message: e.message})
        }
       
        
      
    }
}

function searchResults(model,field){
    return async (req,res,next) =>{
        const searchedInfo = req.query.search;
        let myRe = new RegExp(searchedInfo,"i")
        let data = {}
        let query = {}
        query[field] = myRe
        
        try{ 
        data.result = await model.find(query)
        res.searchResults = data.result
        next()
        }catch(err){
            console.log(err);
        }
    }
}
function searchResultsFilteredByMonth(model){
    return async (req,res,next) =>{
        const searchedInfo = req.query.search;
        let myRe = new RegExp(searchedInfo,"i")
        let data = {}
        
        try{ 
        data.result = await model.find({"name":myRe},{"date":regToday})
        res.searchResults = data.result
        next()
        }catch(err){
            console.log(err);
        }
    }
}

function currentMonthFilter(){
    return async (req,res,next) =>{
        const data = {}
        try{
            data.list = await GuestReservation.find({"date":regToday})
            res.response = data.list
            next()
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = router;