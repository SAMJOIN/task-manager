const express = require('express');
const { connectToDb, getDb } = require('./db');
const cors = require('cors');
const { ObjectId } = require('mongodb');


const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json()); // middlware чтобы читать данные из запроса
let db;

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, (err) => {
            err ? console.log(err) : console.log(`Listening port: ${PORT}`);
        });
        db = getDb();
    } else {
        console.log(`Connection error: ${err}`);
    }
});

const handlerError = (res, error) => {
    res.status(500).json({error});
}

// Получение списка тасков

app.get('/tasks', (req, res) => {
    const tasks = [];
    db
        .collection('tasks')
        .find()
        .forEach((task) => tasks.push(task))
        .then(() => {
            res
                .status(200)
                .json(tasks);
        })
        .catch(() => handlerError(res, 'Something goes wrong...'))
})

// Поиск по ID

app.get('/tasks/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) { // Проверка на валидность id
        db
            .collection('tasks')
            .findOne({ _id: new ObjectId(req.params.id) })
            .then((doc) => {
                res
                    .status(200)
                    .json(doc);
            })
            .catch(() => handlerError(res, 'Something goes wrong...'))
    } else {
        handlerError(res, 'Wrong id');
    }
})

// Удаление элемента

app.delete('/tasks/:id', (req, res) => {
    if (req.params.id) { // Проверка на валидность id
        db
            .collection('tasks')
            .deleteOne({ id: req.params.id })
            .then((result) => {
                res
                    .status(200)
                    .json(result);
            })
            .catch(() => handlerError(res, 'Something goes wrong...'))
    } else {
        handlerError(res, 'Wrong id');
    }
})

// Создание документа

app.post('/tasks', (req, res) => {
    db
    .collection('tasks')
    .insertOne((req.body))
    .then((doc) => {
        res
            .status(201)
            .json(doc);
    })
    .catch(() => handlerError(res, 'Something goes wrong...'));
})

// Обновление документа

app.patch('/tasks/:id', (req, res) => {
    if (req.params.id) { // Проверка на валидность id
        db
            .collection('tasks')
            .updateOne({ id: (req.params.id) },{ $set: req.body})
            .then((result) => {
                res
                    .status(200)
                    .json(result);
            })
            .catch(() => handlerError(res, 'Something goes wrong...'))
    } else {
        handlerError(res, 'Wrong id');
    }
})


// Тоже самое, но для notes

// Получение списка записей

app.get('/notes', (req, res) => {
    const notes = [];
    db
        .collection('notes')
        .find()
        .forEach((task) => notes.push(task))
        .then(() => {
            res
                .status(200)
                .json(notes);
        })
        .catch(() => handlerError(res, 'Something goes wrong...'))
})

// Удаление элемента

app.delete('/notes/:id', (req, res) => {
    if (req.params.id) { // Проверка на валидность id
        db
            .collection('notes')
            .deleteOne({ id: req.params.id })
            .then((result) => {
                res
                    .status(200)
                    .json(result);
            })
            .catch(() => handlerError(res, 'Something goes wrong...'))
    } else {
        handlerError(res, 'Wrong id');
    }
})

// Создание документа

app.post('/notes', (req, res) => {
    db
    .collection('notes')
    .insertOne((req.body))
    .then((doc) => {
        res
            .status(201)
            .json(doc);
    })
    .catch(() => handlerError(res, 'Something goes wrong...'));
})

// Обновление документа

app.patch('/notes/:id', (req, res) => {
    if (req.params.id) { // Проверка на валидность id
        db
            .collection('notes')
            .updateOne({ id: (req.params.id) },{ $set: req.body})
            .then((result) => {
                res
                    .status(200)
                    .json(result);
            })
            .catch(() => handlerError(res, 'Something goes wrong...'))
    } else {
        handlerError(res, 'Wrong id');
    }
})