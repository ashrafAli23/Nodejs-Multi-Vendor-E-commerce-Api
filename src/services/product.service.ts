import Products, { IProduct } from "../models/Products";
import Size, { ISize } from "../models/Size";
import { NotFoundError } from "../apiResponse/notFoundError";
import slug from "slugify";
import { ErrorResponse } from "../apiResponse/errorResponse";

/**
 * @desc    Query Product Using It's ID
 * @param   { String } id - Product ID
 * @returns { Object<product> }
 */
const getProductById = async (id: string): Promise<IProduct> => {
  const populateQuery = [{ path: "size", select: "size" }];

  const product = await Products.findById(id).populate(populateQuery);

  if (!product) {
    throw new NotFoundError("Product not found");
  }

  return product;
};

/**
 * @desc    Create new product
 * @param   { IProduct } body - Body object data
 * @param   { File } mainImg - Product main image
 * @param   { Files } subImages - Product images
 * @returns { Object<product> }
 */
const createProduct = async (
  body: IProduct,
  mainImg: any,
  subImages: any
): Promise<IProduct> => {
  // get images path
  const images = subImages.map((file: any) => file.path);

  let sizeIDs: Array<string> = [];

  await Promise.all(
    body.size.map(async (sizes: string) => {
      const sizeDoc = await Size.findOne({ sizes });
      if (!sizeDoc) {
        const size = await Size.create({ sizes });
        sizeIDs.push(size.id);
      } else {
        sizeIDs.push(sizeDoc.id);
      }
    })
  );

  const product = await Products.create({
    name: body.name,
    slug: slug(body.name, { lower: true }),
    description: body.description,
    price: Number(body.price),
    quantity: Number(body.quantity),
    mainImg: mainImg.path,
    images: images,
    color: body.color,
    size: sizeIDs,
    category: body.category,
    createdBy: body.createdBy,
  });

  return product;
};

/**
 * @desc    Update Product Details
 * @param   { String } id - Product ID
 * @param   { Object } body - Body object data
 * @returns { Object<product> }
 */
const updateProduct = async (id: string, body: any): Promise<IProduct> => {
  const product = await Products.findById(id);
  if (!product || body.createdBy !== product.createdBy) {
    throw new NotFoundError("Product not found");
  }

  const result = await Products.findByIdAndUpdate(id, body, { new: true });

  if (!result) {
    throw new ErrorResponse("Product failed to update");
  }
  return result;
};

/**
 * @desc    Update Product Size
 * @param   { String } id - Product ID
 * @param   { String } body - Seller ID
 * @returns { Object<size> }
 */
const updateProductSize = async (id: string, body: any): Promise<IProduct> => {
  const product = await Products.findById(id);
  if (!product || body.createdBy !== product.createdBy) {
    throw new NotFoundError("Product not found");
  }

  let sizeIds: Array<string> = product.size;
  const size = await Size.findOne({ size: body.size });
  if (!size) {
    const newSize = await Size.create(body);
    sizeIds.push(newSize.id);
  } else {
    sizeIds.push(size.id);
  }

  const result = await Products.findByIdAndUpdate(
    id,
    {
      size: sizeIds,
    },
    { new: true }
  );

  if (!result) {
    throw new ErrorResponse("Product failed to update");
  }
  return result;
};

/**
 * @desc    Delete Product Size
 * @param   { String } id - Product ID
 * @param   { Object } body - Body Object
 * @returns { void }
 */
const deleteProductSize = async (id: string, body: any): Promise<void> => {
  const product = await Products.findById(id);

  if (!product || product.createdBy !== body.createdBy) {
    throw new NotFoundError("Product Not Found");
  }

  const size = await Size.findOne({ size: body.size });

  if (!size) {
    throw new NotFoundError("Size Not Found");
  }

  const productSizes = product.size.filter((item) => item !== size.size);

  await product.updateOne({ size: productSizes }, { new: true });

  await Size.findOneAndDelete({ size: body.size });
};

/**
 * @desc    Update Product Main Image
 * @param   { String } id - Product ID
 * @param   { Object } body - Object data
 * @param   {  File  } mainImg - Product main image
 */
const updateProductMainImage = async (
  id: string,
  body: any,
  mainImg: any
): Promise<void> => {
  const product = await Products.findById(id);

  if (!product || body.createdBy !== product.createdBy) {
    throw new NotFoundError("Product Not Found");
  }

  await product.updateOne(
    { mainImg: mainImg.path },
    {
      new: true,
    }
  );
};

/**
 * @desc    Update Product Images
 * @param   { String } id - Product ID
 * @param   { Object } body - Body data
 * @param   { Files } subImages - Product images
 */
const updateProductImages = async (
  id: string,
  body: any,
  subImages: any
): Promise<void> => {
  const product = await Products.findById(id);
  // get images path
  const images = subImages.map((file: any) => file.path);

  if (!product || body.createdBy !== product.createdBy) {
    throw new NotFoundError("Product Not Found");
  }

  await product.updateOne(
    { images: images },
    {
      new: true,
    }
  );
};

/**
 * @desc    Delete Product Using It's ID
 * @param   { String } id - Product ID
 * @param   { Object } body - Body data
 */
const deleteProduct = async (id: string, body: any): Promise<void> => {
  const product = await Products.findById(id);

  if (!product || body.createdBy !== product.createdBy) {
    throw new NotFoundError("Product Not Found");
  }

  await Products.findByIdAndDelete(id);
};

export default {
  getProductById,
  createProduct,
  updateProduct,
  updateProductMainImage,
  updateProductImages,
  updateProductSize,
  deleteProduct,
  deleteProductSize,
};
