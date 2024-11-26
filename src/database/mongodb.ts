import mongoose from 'mongoose';

export async function connectDB() {
   await mongoose.connect(
      'mongodb+srv://kuepa641:HGClFcnpC5y0fjJK@cluster0.vuekn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
   );
}
