const Customer = require('../models/Customer');
const { db } = require('./index');
const addCustomer = async customer => {
	try {
		const savedCustomer = await Customer.create(customer);
		console.info(`Customer added to Database with ID ${savedCustomer._id}`);
	} catch (e) {
		console.log("Mongoose Error! Customer didn't added to Database");
	}
	db.close();
};
const updateCustomer = async (customer, id) => {
	try {
		await Customer.updateOne({ _id: id }, customer);
		console.info(`Customer with ID ${id} Updated Successfully`);
	} catch (e) {
		console.log("Mongoose Error! Customer didn't updated to Database");
	}
	db.close();
};

const removeCustomer = async id => {
	try {
		await Customer.deleteOne({ _id: id });
		console.info(`Customer with ID ${id} Removed Successfully`);
	} catch (e) {
		console.log("Mongoose Error! Customer didn't Deleted from Database");
	}
	db.close();
};

const findCustomer = async text => {
	try {
		const search = new RegExp(text, 'i');
		const results = await Customer.find({
			$or: [{ firstName: search }, { lastName: search }],
		});
		console.info(results);
		if (results.length > 0) {
			console.info(
				`Customers found with given name. Search Results ${results.length}`
			);
		} else {
			console.info(`No customers found with given name`);
		}
	} catch (e) {
		console.log("Mongoose Error! Can't find Customers on Database");
	}
	db.close();
};

module.exports = {
	addCustomer,
	updateCustomer,
	removeCustomer,
	findCustomer,
};
