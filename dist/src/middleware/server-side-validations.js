"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGame = void 0;
const validateGame = (req, res, next) => {
    const { name, genre, release_date, size } = req.body;
    if (!name || !genre || !release_date || !size) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (!size.toString().match(/^\d+$/)) {
        return res.status(400).json({ message: 'Size must be a number' });
    }
    if (!name.match(/^[A-Z]*/)) {
        return res.status(400).json({ message: 'Name must start with a capital letter' });
    }
    const dateRegex = /^(January|February|March|April|May|June|July|August|September|October|November|December) \d{1,2}, \d{4}$/;
    if (!release_date.match(dateRegex)) {
        return res.status(400).json({ message: "Date must be in the format 'Month Day, Year'" });
    }
    next();
};
exports.validateGame = validateGame;
