const router = require("express").Router();
const Workout = require("../models/workout");


router.get("/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ])
        .sort({ _id: -1 })
        .then((results) => {
            res.json(results);
        })
        .catch((err => {
            res.json(err);
        }));
});

router.get("/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }
    ])
        .sort({ _id: -1 })
        .limit(7)
        .then((results) => {
            res.json(results);
        })
        .catch((err => {
            res.json(err);
        }));
});

router.put("/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(req.params.id, {
        $push: {
            exercises: req.body
        }
    })
        .then((results) => {
            res.json(results);
        })
        .catch((err => {
            res.json(err);
        }));
});

router.post("/workouts", (req, res) => {
    Workout.create({})
        .then((results) => {
            res.json(results);
        })
        .catch((err => {
            res.json(err);
        }));
});

module.exports = router;