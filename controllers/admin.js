import { Service } from "../models/service.js";

export const createService = (req, res) => {
  const { name } = req.body;
  const image = req.file;
  const imagePath = image.path;
  const service = new Service(name, imagePath);
  service.createService(res);
};

export const getService = (req, res) => {
  Service.getService(res);
};

export const updateService = (req, res) => {
  const { name } = req.body;
  const image = req.file;
  const imagePath = image.path;
  const { serviceId } = req.params;

  Service.updateService(res, serviceId, name, imagePath);
};

export const deleteService = (req, res) => {
  const { serviceId } = req.params;

  Service.deleteHotel(res, serviceId);
};
