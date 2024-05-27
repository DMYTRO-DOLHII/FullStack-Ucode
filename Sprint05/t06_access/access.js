module.exports = class Access {
	constructor(mark_LXXXV) {
		this.mark_LXXXV = mark_LXXXV;

		return this.mark_LXXXV === null ? 'null' : this.mark_LXXXV === undefined ? 'undefined' : this.mark_LXXXV
	}
}