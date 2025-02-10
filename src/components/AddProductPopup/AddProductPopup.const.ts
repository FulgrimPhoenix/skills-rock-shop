interface Iinput {
  label: string;
  name: string;
  type: string;
  required: boolean;
}

export const INPUTS_LIST: Iinput[] = [
  {
    label: "Title",
    name: "title",
    type: "text",
    required: true,
  },
  {
    label: "Description",
    name: "description",
    type: "text",
    required: false,
  },
  {
    label: "Price",
    name: "price",
    type: "number",
    required: true,
  },
  {
    label: "Goods in stock",
    name: "remained",
    type: "text",
    required: true,
  },
  {
    label: "Product image url",
    name: "avatar",
    type: "text",
    required: false,
  },
];
