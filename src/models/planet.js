const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

/**
 * Model => planetSchema
 *
 * | RDBMS    | MONGODB     |
 * |----------|-------------|
 * | Database | Database    |
 * | Tables   | Collections |
 * | Rows     | Documents   |
 * | Columns  | Fields      |
 *
 */

/**
 * planetSchema:
 *
 * -> Id: int
 * -> Name: String
 * -> Climate: String
 * -> Ground: String
 *
 */

const planetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        climate: {
            type: String,
            required: true,
        },
        ground: {
            type: String,
            required: true,
        },
        quantity_movies: {
            type: Number,
            required: false,
        },
    },
    { timestamps: true }
);

planetSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Planet", planetSchema);
