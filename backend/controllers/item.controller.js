import Item from "../models/item.model.js";
import createError from "../utils/createError.js";

// Create a new item
export const createItem = async (req, res, next) => {
  const { itemName, userId, img, price, description,category,userName } = req.body;
  // console.log("here");
  try {
    const newItem = new Item({
      itemName,
      userId,
      userName,
      img,
      price,
      description,
      category,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    next(createError(500, "Failed to create item."));
  }
};

// Get all items
export const getAllItems = async (req, res, next) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (err) {
    next(createError(500, "Failed to fetch items."));
  }
};

// Get a specific item by ID
export const getItemById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const item = await Item.findById(id);

    if (!item) {
      return next(createError(404, "Item not found."));
    }

    res.status(200).json(item);
  } catch (err) {
    next(createError(500, "Failed to fetch item."));
  }
};

// Update an item by ID
export const updateItem = async (req, res, next) => {
  const { id } = req.params;
  const { itemName, userId, img, price, description } = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { itemName, userId, img, price, description },
      { new: true }
    );

    if (!updatedItem) {
      return next(createError(404, "Item not found."));
    }

    res.status(200).json(updatedItem);
  } catch (err) {
    next(createError(500, "Failed to update item."));
  }
};

// Delete an item by ID
export const deleteItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedItem = await Item.findByIdAndDelete(id);

    if (!deletedItem) {
      return next(createError(404, "Item not found."));
    }

    res.status(200).json({ message: "Item deleted successfully." });
  } catch (err) {
    next(createError(500, "Failed to delete item."));
  }
};
export const getItemsByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from route parameters

    const items = await Item.find({ userId });
    // Check if items exist for the user
    if (!items) {
      return res.status(404).json({ message: 'No items found for this user' });
    }

    // Send the found items as a response
    res.json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ message: 'Server error while fetching items' });
  }
};