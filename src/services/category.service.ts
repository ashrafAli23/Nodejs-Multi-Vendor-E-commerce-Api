import Category, { ICategory } from "../models/Category";
import { ErrorResponse } from "../apiResponse/errorResponse";
import { NotFoundError } from "../apiResponse/notFoundError";

/**
 * @desc    Create New Category
 * @param   { Object } body - Body object data
 * @param   { Object } image - Category image
 * @returns { Object<category> }
 */
const createCategoy = async (
  body: ICategory,
  image: any
): Promise<ICategory> => {
  const data = {
    name: body.name,
    parentId: body.parentId,
    description: body.description,
    icon: image.path,
  };
  const category = await Category.create(data);

  return category;
};

/**
 * @desc    Update Category Details
 * @param   { String } id - Category ID
 * @param   { Object } body - Category details
 * @returns { Object<category> }
 */
const updateCategory = async (
  id: string,
  body: ICategory
): Promise<ICategory> => {
  const category = await Category.findByIdAndUpdate(id, body, { new: true });
  if (!category) {
    throw new ErrorResponse("Update category failed");
  }
  return category;
};

/**
 * @desc    Update Category Image
 * @param   { String } id - Category ID
 * @param   { Object } image - Category image
 * @returns { Object<category> }
 */

const updateCategoryImage = async (
  id: string,
  image: any
): Promise<ICategory> => {
  const category = await Category.findByIdAndUpdate(
    id,
    { icon: image.path },
    {
      new: true,
    }
  );

  if (!category) {
    throw new ErrorResponse("Update category icon failed");
  }
  return category;
};

/**
 * @desc    Find Category Using It's ID
 * @param   { String } id - Category ID
 * @returns { Object<category> }
 */

const findById = async (id: string): Promise<ICategory> => {
  const category = await Category.findById(id);

  if (!category) {
    throw new NotFoundError("No category found");
  }
  return category;
};

/**
 * @desc    Delete Category
 * @param   { String } id - Category ID
 * @returns { void }
 */

const deleteCategory = async (id: string): Promise<void> => {
  await Category.findByIdAndDelete(id);
};

export default {
  createCategoy,
  updateCategory,
  updateCategoryImage,
  deleteCategory,
  findById,
};
