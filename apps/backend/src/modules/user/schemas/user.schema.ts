import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class Stock {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  symbol: string;
}

export const StockSchema = SchemaFactory.createForClass(Stock);

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [StockSchema], default: [] }) // Define `stocks` as an array of Stock subdocuments
  stocks: Stock[];
}

export const UserSchema = SchemaFactory.createForClass(User);
