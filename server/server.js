const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// ==== MODELS =====

const { User } = require('./models/user');
const { Brand } = require('./models/brand');
const { Wood } = require('./models/wood');
const { Product } = require('./models/product');

// ==== Middleware =====
const { auth } = require('./middleware/auth');
const { admin } = require('./middleware/admin');

// ======================================
//          PRODUCTS
// ======================================

// By Sold
app.get('/api/product/articles', (request, response) => {
	let order = request.query.order ? request.query.order : 'asc';
	let sortBy = request.query.sortBy ? request.query.sortBy : '_id';
	let limit = request.query.limit ? parseInt(request.query.limit) : 100;

	Product.find().populate('brand').populate('wood').sort([ [ sortBy, order ] ]).limit(limit).exec((err, articles) => {
		if (err) return response.status(400).send(err);
		response.send(articles);
	});
});

app.get('/api/product/articles_by_id', (request, response) => {
	let type = request.query.type;
	let items = request.query.id;

	if (type === 'array') {
		let ids = request.query.id.split(',');
		items = [];
		items = ids.map((items) => {
			return mongoose.Types.ObjectId(items);
		});
	}

	Product.find({ _id: { $in: items } }).populate('brand').populate('wood').exec((err, docs) => {
		return response.status(200).send(docs);
	});
});

app.post('/api/product/article', auth, admin, (request, response) => {
	const product = new Product(request.body);

	product.save((err, doc) => {
		if (err) return response.json({ success: false, err });
		response.status(200).json({
			success: true,
			article: doc
		});
	});
});

// ======================================
//          WOOD
// ======================================

app.post('/api/product/wood', auth, admin, (request, response) => {
	const wood = new Wood(request.body);

	wood.save((err, doc) => {
		if (err) return response.json({ success: false, err });
		response.status(200).json({
			success: true,
			wood: doc
		});
	});
});

app.get('/api/product/woods', (request, response) => {
	Wood.find({}, (err, woods) => {
		if (err) return response.status(400).send(err);
		response.status(200).send(woods);
	});
});

// ======================================
//          BRAND
// ======================================

app.post('/api/product/brand', auth, admin, (request, response) => {
	const brand = new Brand(request.body);

	brand.save((err, doc) => {
		if (err) return response.json({ success: false, err });
		response.status(200).json({
			success: true,
			brand: doc
		});
	});
});

app.get('/api/product/brands', (request, response) => {
	Brand.find({}, (err, brands) => {
		if (err) return response.status(400).send(err);
		response.status(200).send(brands);
	});
});

// ======================================
//          USERS
// ======================================

// ==== Authenticate ====
app.get('/api/user/auth', auth, (request, response) => {
	response.status(200).json({
		isAdmin: request.user.role === 0 ? false : true,
		isAuth: true,
		email: request.user.email,
		firstname: request.user.firstname,
		lastname: request.user.firstname,
		role: request.user.role,
		cart: request.user.cart,
		history: request.user.history
	});
});

// ==== Register ====
app.post('/api/users/register', (request, response) => {
	const user = new User(request.body);

	user.save((err, doc) => {
		if (err) return response.json({ success: false, err });
		response.status(200).json({
			success: true
		});
	});
});

// ==== Login ====
app.post('/api/users/login', (request, response) => {
	User.findOne({ email: request.body.email }, (err, user) => {
		if (!user) return response.json({ loginSuccess: false, message: 'Details are incorrect' });

		user.comparePassword(request.body.password, (err, isMatch) => {
			if (isMatch) return response.json({ loginSuccess: false, message: 'Details are incorrect' });

			// get token
			user.generateToken((err, user) => {
				if (err) return response.status(400).send(err);
				response.cookie('w_auth', user.token).status(200).json({
					loginSuccess: true
				});
			});
		});
	});
});

// ==== logout ====
app.get('/api/users/logout', auth, (request, response) => {
	User.findOneAndUpdate({ _id: request.user._id }, { token: '' }, (err, doc) => {
		if (err) return response.json({ success: false, err });
		return response.status(200).send({
			success: true
		});
	});
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
	console.log(`Server running on ${port}`);
});
