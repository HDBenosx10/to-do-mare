export const uniqID = {
    _id: 0,

    generate() {
        return this._id++
    }
}