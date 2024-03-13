import { Schema, model, Document } from 'mongoose';
import { compare, hash } from 'bcrypt';

interface User extends Document {
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return compare(candidatePassword, this.password);
};

userSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true,
});

userSchema.pre<User>('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  const saltRounds = 10;
  const hashedPassword = await hash(this.password, saltRounds);
  this.password = hashedPassword;
  next();
});

const UserModel = model<User>('User', userSchema);

export { User, UserModel };
