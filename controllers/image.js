const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '582f8b0a701c41e1849ded66cfb63075'
});

const handleApiCall = (req, res) =>{
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err=>res.status(400).json('unable to work with API'))
};


const handleImage = (req, res, knex) => {
    const {id} = req.body;
    knex('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0].entries);
    })
    .catch(err=>res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage:handleImage,
    handleApiCall: handleApiCall
}