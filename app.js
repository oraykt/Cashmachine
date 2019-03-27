const express = require('express');
const findMultiple = require('./helper/findMultiple');
const app = express();

const availableNodes = [100, 50, 20, 10];

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/request/:amount', (req, res, next) => {
    try {
        let userInput = req.params.amount;
        const resultArr = [];
        if (!userInput) {
            res.send(resultArr);
        }
        if (userInput < 0) throw "InvalidArgumentException";
        availableNodes.forEach((node, index) => {
            let tempDiv = findMultiple(index, userInput, availableNodes);
            if (tempDiv) {
                userInput -= tempDiv * node;
                do {
                    resultArr.push(node);
                    tempDiv--;
                } while (tempDiv !== 0)
            }
        });
        res.send(resultArr);
    } catch (exception) {
        res.send(exception);
    }
});

app.listen(3000, () => {
    console.log('App is listening 3000 of port');
});