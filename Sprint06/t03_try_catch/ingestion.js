const EatException = require('./eat-exception');

class Ingestion {
	products = [];
	day_of_diet = 0;
	constructor(meal_type, id) {
		this.meal_type = meal_type;
		this.id = id;
	}

	setProduct(product) {
		this.products.push(product);
	}

	getFromFridge(productName) {
		const product = this.products.find(p => p.name === productName);
		if (!product) {
			throw new Error(`Product ${productName} not found`);
		}
		if (product.isJunkFood()) {
			throw new EatException('No more junk food, dumpling');
		}
	}

	getProductInfo(productName) {
		const product = this.products.find(p => p.name === productName);
		if (!product) {
			throw new Error(`Product ${productName} not found`);
		}
		return product;
	}
}

module.exports.Ingestion = Ingestion;
