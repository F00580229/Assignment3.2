const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/playerdb', { useNewUrlParser: true, useUnifiedTopology: true });
const playerSchema = new mongoose.Schema({
    name: String,
    
});
const Player = mongoose.model('Player', playerSchema);


app.get('/players', (req, res) => {
    Player.find({}, (err, players) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(players);
        }
    });
});

app.post('/players', (req, res) => {
    const playerData = req.body;
    const player = new Player(playerData);
    player.save((err, newPlayer) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).json(newPlayer);
        }
    });
});

app.put('/players/:id', (req, res) => {
    const playerId = req.params.id;
    const updatedData = req.body;
    Player.findByIdAndUpdate(playerId, updatedData, { new: true }, (err, updatedPlayer) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(Playerupdated);
        }
    });
});

app.delete('/players/:id', (req, res) => {
    const playerId = req.params.id;
    Player.findByIdAndRemove(playerId, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json({ message: 'Player Removed' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});