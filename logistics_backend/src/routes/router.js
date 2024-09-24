const express = require('express')
const router = express.Router()
const LogisticsService = require('../services/logisticsservice');
const logError = require('../utilities/errorLogger');

const logisticsService = new LogisticsService();

router.post('/register', async (req,res) => {
    try{
        response = logisticsService.register(req);
        res.send(response);
    }catch(err){
        logError(err);
    }
})

router.post('/login', async (req,res) => {
    try{
        const response = await logisticsService.login(req);
        res.send(response);
    }catch(err){
        logError(err);
    }
    
})

router.post('/contact', async (req,res) => {
    try{
        const response = await logisticsService.contact(req);
        res.send(response);
    }catch(err){
        logError(err);
    }
})


router.post('/quote', async (req, res) => {
    try{
        const response = await logisticsService.quote(req);
        res.send(response);
    }catch(err){
        logError(err);
    }
})

router.post('/subscribe', async (req, res) => {
    try{
        const response = await logisticsService.newsletter(req);
        res.send(response);
    }catch(err){
        logError(err);
    }
})

router.post('/track', async (req, res) => {
    try{
        console.log("router",req.body)
        const response = await logisticsService.track(req);
        res.send(response);
    }catch(err){
        logError(err);
    }
})

router.put('/updateTrack', async (req, res) => {
    try{
        const response = await logisticsService.updateTrack(req);
        res.send(response);
    }catch(err){
        logError(err);
    }
})

module.exports = router;
