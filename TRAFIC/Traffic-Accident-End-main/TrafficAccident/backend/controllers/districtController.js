const DistrictRepository = require('../repositories/districtRepository.js');


const createDistrict = async (req, res) => {
  const { districtName, streetName,location } = req.body;
  const coordinates = location ? location.coordinates || [0, 0] : [0, 0]; 
  const newDistrict = {
    districtName,
    streetName,
    location: {
      type: "Point",
      coordinates: coordinates , 
    }
  };
  const district = await DistrictRepository.create(newDistrict);
  if (!district) {
    return res.status(400).json({ error: 'Bad Request. District creation failed.' });
  }

  res.status(201).json(district);
};

const getDistricts = async (req, res) => {
  const districts = await DistrictRepository.getAll();
  res.status(200).json({
    count: districts.length,
    data: districts.map(district => ({
      _id: district._id,
      districtName: district.districtName,
      streetName: district.streetName,
      location: district.location, // Eğer location bilgisini almak istiyorsanız
    })),
  });
};

const getDistrictById = async (req, res) => {
  const  id  = req.params.id;
  const district = await DistrictRepository.getById(id);
  if (!district) {
    res.status(404);
    throw new Error('District not found');
  }
  res.status(200).json(district);
};

const updateDistrict = async (req, res) => {
  const id  = req.params.id;
  const { districtName,streetName,location } = req.body;
  const result = await DistrictRepository.update(id, { districtName,streetName,location },);
  if (!result) {
    res.status(404);
    throw new Error('District not found');
  }
  res.status(200).json({ message: 'District updated successfully', data: result });
};

const deleteDistrict = async (req, res) => {
  const id  = req.params.id;
  const result = await DistrictRepository.delete(id);
  if (!result) {
    res.status(404);
    throw new Error('District not found');
  }

  res.status(200).json({ message: 'District deleted successfully', data: result });
};

module.exports = {
  createDistrict,
  getDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict,
};
