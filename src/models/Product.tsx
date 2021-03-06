export default interface Product {
  id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
  discount: number;
  quantity: number;
  rare: boolean;
}
