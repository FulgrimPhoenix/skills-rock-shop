import { IProduct } from "src/types/product.type";

interface Iinput {
  label: string;
  name: keyof IProduct;
  type: string;
  required: boolean;
  helperText: string;
}

export const INPUTS_LIST: Iinput[] = [
  {
    label: "Title",
    name: "title",
    type: "text",
    required: true,
    helperText: "Product name",
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    required: false,
    helperText: "Description of your product",
  },
  {
    label: "Price",
    name: "price",
    type: "number",
    required: true,
    helperText: "Price of your product",
  },
  {
    label: "Goods in stock",
    name: "remained",
    type: "text",
    required: true,
    helperText: "How many product samples you have?",
  },
  {
    label: "Product image url",
    name: "avatar",
    type: "text",
    required: false,
    helperText: "Photo of your product",
  },
];
