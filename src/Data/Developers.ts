import mongoose, { Schema, Document } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IDevelopers extends Document {
  developer_id: number;
  name: string;
}

const DevelopersSchema: Schema = new Schema({
  developer_id: { type: Number},
  name: { type: String, required: true },
});

DevelopersSchema.plugin(AutoIncrement, { inc_field: 'developer_id' });

export const DevelopersModel = mongoose.model<IDevelopers>('Developers', DevelopersSchema);
