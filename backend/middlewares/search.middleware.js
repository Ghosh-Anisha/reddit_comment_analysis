const SearchModel = require('../models/search.js');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const spawn = require("child_process").spawn;

// Function to spawn a python process
const runScript = (req, res) =>{
    // console.log(process.env.PATH_TO_ML_MODEL, req.file.path)
    return spawn('python', [
        `${process.env.PATH_TO_MODEL}`,
        "--subreddit",
        `${req.subreddit}`,
    ]);
}

// Post Image to server

exports.postImage = (req, res, next) => {
    const searchModel = new SearchModel({
        _id: new mongoose.Types.ObjectId(),
        subReddit: req.subreddit
    });
    searchModel
        .save()
        .then(result => {
            const subprocess = runScript(req, res);
            // console.log('AAA');
            var responseFromPythonFile = "";
            var error = ""

            subprocess.stdout.on('data', (data) => {
                responseFromPythonFile = data.toString();
                console.log(data)
                // console.log(responseFromPythonFile)
            });

            subprocess.stderr.on('error', (err) => {
                error = err;
                // console.log(error)

            });
            subprocess.stderr.on('close', () => {
                // console.log('printing test')
                const status = error ? 400 : 201;
                res.status(status).json({
                    createdProfiles: {
                        _id: result._id,
                    },
                    pythonFileResponse: responseFromPythonFile,
                    error: error
                })
            });
        })
        .catch(err => {
            res.status(400).json({
                error: err,
            })
        })
};