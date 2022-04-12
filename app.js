const http = require("http");
const fs = require("fs");
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const displayContent = require('./routes');
// const process = require('process');
// const port = process.env.PORT || 3000;

// const app = express();

// fs.writeFileSync("myText.txt", 'I want to eat sandiwitch')

const server = http.createServer( displayContent);

server.listen(3001);
