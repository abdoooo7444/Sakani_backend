const { validationResult } = require("express-validator");

const { Resdential, Commercial, Property } = require('../models/properties');
const multer = require("multer");


// // add property for commercial,resdential properties
// const addProperty = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json(errors.array());
//     }
//     const newProperty = new Property(req.body);

//     try {
//         await newProperty.save();
//         res.status(201).json(newProperty);
//     } catch (err) {
//         res.status(404).json({ msg: err });
//            }

// }


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `property-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

const imgUpload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadProImg = imgUpload.single("photo");

const addResdential = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  
  if (req.file) {
    console.log('In the image if')
    req.body.imagePath = `http://${req.get("host")}/imgs/products/${
      req.file.filename
    }`;
  }
  const newResdential = new Resdential(req.body);
  const newProperty = new Property(req.body);
  try {
    await newProperty.save();
    await newResdential.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(404).json({ msg: err });
  }

}

const addCommercial = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const newCommercial = new Commercial(req.body);
  const newProperty = new Property(req.body);

  try {
    await newProperty.save();
    await newCommercial.save();
    res.status(201).json(newProperty);
  } catch (err) {
    res.status(404).json({ msg: err });
  }

}



const getallproperty = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
}

const getResdential = async (req, res) => {
  try {
    const properties = await Resdential.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
}
const getCommercial = async (req, res) => {
  try {
    const properties = await Commercial.find();
    res.json(properties);
  } catch (err) {

    res.status(500).json({ msg: 'Server error' });
  }


}


const getSingleProperty = async (req, res) => {
  try {
    const { searchParam } = req.params; 

    const query = {};
    if (searchParam) {
     
      if (!isNaN(searchParam)) {
        query.price = searchParam;
      } else {
        query.propertyaddress = searchParam;
      }
    } else {
      
      return res.status(400).json({ message: "Missing search parameter" });
    }

    const property = await Property.findOne(query);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    return res.status(400).json({ message: "Error", error });
  }
};
const getSingleCommercialByQuery = async (req, res) => {
  try {
    const { searchParam } = req.params;

    if (!searchParam) {
      return res.status(400).json({ message: "Missing query parameter" });
    }

    const query = {};
    if (!isNaN(searchParam)) {
      query.price = Number(searchParam);
    } else {
      query.propertyaddress = searchParam;
    }

    console.log(query);

    const property = await Commercial.find(query);
    console.log(property);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Return the property if found
    res.json(property);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};







const getSingleResdentialbyquery = async (req, res) => {
  try {
    const { searchParam } = req.params; // Access the parameter

    const query = {};
    if (searchParam) {
      if (!isNaN(searchParam)) {
        query.price = searchParam * 1 ;
      } else {
        query.propertyaddress = searchParam;
      }
    } else {
      // Handle case where no search parameter is provided (optional)
      return res.status(400).json({ message: "Missing search parameter" });
    }

    const property = await Resdential.find(query);
    console.log(property) ;

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    return res.status(400).json({ message: "Error", error });
  }
};






const updateproperty = async (req, res) => {
  const propertyID = req.params.propertyId;
  try {

    const PropertyUpdated = await Property.updateOne({ _id: propertyID }, { $set: { ...req.body } });
    res.status(200).json(PropertyUpdated);
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.msg })
  }

}

const deleteResdentiaal = async (req, res) => {
  const id = req.params.propertyId;
  try {
    const deletedProperty = await Resdential.findByIdAndDelete(id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found!" });
    }
    res.json(deletedProperty);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}

const deleteCommercial = async (req, res) => {
  const id = req.params.propertyId;
  try {
    const deletedProperty = await Commercial.findByIdAndDelete(id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found!" });
    }
    res.json(deletedProperty);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}






module.exports = {
  addCommercial,
  addResdential,
  getallproperty,
  getSingleProperty,
  getResdential,
  getCommercial,
  updateproperty,
  deleteResdentiaal, deleteCommercial,
  getSingleResdentialbyquery,
  getSingleCommercialByQuery,
  uploadProImg

}