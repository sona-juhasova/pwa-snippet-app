import { mongoose } from "mongoose";

const { Schema } = mongoose;

const snippetsSchema = new Schema({
  title: String,
  date:Date,
  description: String,
  code_snippet: String,
  language: String,
  favourite : Boolean

});

export const models = [
  {
    name: "CodeSnippet",
    schema: snippetsSchema,
    collection: "code-snippets",
  },
];
