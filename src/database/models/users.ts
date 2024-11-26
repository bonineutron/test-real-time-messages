import mongoose from 'mongoose';

const schema = new mongoose.Schema({
   username: String,
   password: String,
   role: Number
});

export default mongoose.models.users || mongoose.model('users', schema);
