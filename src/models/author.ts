import mongoose, { Document, model, Schema } from 'mongoose';

export interface IAuthor {
    name: string;
}

export interface IAuthorModel extends IAuthor, Document {}

const AuthorSchema: Schema = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export const Author = model<IAuthorModel>('Author', AuthorSchema);
