"use strict";
import express from "express";
import Sequelize from 'sequelize';
import squel from 'squel';
import wga from 'wga';
const app = express();


let sequelize = new Sequelize(
	'test',
	'root',
	'',
	{
		'dialect':'mysql',
		'host':'localhost',
		'port':3306
	}
);

let User = sequelize.define('student',{
	name:{type: Sequelize.STRING},//数据类型
	age:{type: Sequelize.INTEGER}
});



app.get('/',(req, res, next) => {
	res.send("hello baby");
	next();
});

app.get('/students', wga(function* (req, res) {
	let stds = yield User.findAll();
	res.json(stds);
}))

app.use((req, res, next) => {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

let server = app.listen(8081,() => {
	let host = server.address().address;
	let port = server.address().port;
	console.log("服务启动成功，访问地址为 http://%s:%s",host,port);
});