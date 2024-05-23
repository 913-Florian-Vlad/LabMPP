import mongoose, { Schema, Document } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IGames extends Document {
  id: number;
  name: string;
  genre: string;
  release_date: string;
  size: number;
  developer_id: string;
}

const GamesSchema: Schema = new Schema({
  id: { type: Number},
  name: { type: String, required: true },
  genre: { type: String, required: true },
  release_date: { type: String, required: true },
  size: { type: Number, required: true },
  developer_id: { type: Number, required: false },
});

GamesSchema.plugin(AutoIncrement, { inc_field: 'id' });

export const GamesModel = mongoose.model<IGames>('Games', GamesSchema);


