import Paste from "../models/paste.model.js";

const handleCreatePaste = async (req, res, next) => {
  try {
    const { title, content, tag } = req.body;
    if (!title || !content || !tag) {
      return res.status(400).json({ message: "all fields are required" });
    }
    await Paste.create({
      title,
      content,
      tag,
      user: req.user.id,
    });
    return res.status(201).json({ message: "paste created successfully" });
  } catch (error) {
    console.log("handleCreatePaste error : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllpastes = async (req, res, next) => {
  try {
    const pastes = await Paste.find({ user: req.user.id }).sort({
      createdAt: -1,
    }); // newest pastes first
    return res.status(200).json(pastes);
  } catch (error) {
    console.log("getAllpastes error : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getPasteById = async (req, res, next) => {
  try {
    const pasteId = req.params.id;
   const paste = await Paste.findById(pasteId);
    if (!paste) return res.status(404).json({ message: "Paste not found" });
    return res.status(200).json(paste);
  } catch (error) {
    console.log("getPasteById error : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deletePaste = async (req, res, next) => {
  try {
    const pasteId = req.params.id;
    const deletedPaste = await Paste.findOneAndDelete({
      _id: pasteId,
      user: req.user.id,
    });

    if (!deletePaste) {
      return res.status(404).json({ message: "paste not found" });
    }
    return res.status(200).json({ message: "Paste deleted successfully" });
  } catch (error) {
    console.log("deletePaste error : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updatePaste = async (req, res, next) => {
  try {
    const pasteId = req.params.id;
    const { title, content, tag } = req.body;
    if (!title || !content || !tag) {
      return req.status(400).json({ message: "all fields are required" });
    }
    const updatePaste = await Paste.findOneAndUpdate(
      { _id: pasteId, user: req.user.id },
      { title, content, tag },
      { new: true, runValidators: true },
    );
    if (!updatePaste) {
      return res.status(404).json({ message: "Paste not found" });
    }
    return res
      .status(200)
      .json({ message: "Paste updated successfully", paste: updatePaste });
  } catch (error) {
    console.log("updatePaste error : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export {
  handleCreatePaste,
  getAllpastes,
  getPasteById,
  deletePaste,
  updatePaste,
};
