export type ProductItem = {
  id: number;
  name: string;
  idProduct?: number;
  quantity?: number;
  price?: number;
  subtotal?: number;
};

export type ClientSelectOption = {
  rut: number;
  name: string;
};

export type SelectOption = {
  id: number;
  value: string;
};

export type BranchOfficeOption = {
  id: number;
  name: string;
  currency: string;
};
