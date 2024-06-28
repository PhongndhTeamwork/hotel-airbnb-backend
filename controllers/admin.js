import { Service } from "../models/service.js";
import { User } from "../models/user.js";

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

export const getServiceDetail = (req, res) => {
  const { serviceId } = req.params;

  Service.getServiceDetail(res, serviceId);
};

export const updateService = (req, res) => {
  const { name } = req.body;
  const image = req.file;
  const imagePath = image?.path;
  const { serviceId } = req.params;

  Service.updateService(res, serviceId, name, imagePath);
};

export const deleteService = (req, res) => {
  const { serviceId } = req.params;

  Service.deleteService(res, serviceId);
};

export const getUser = (req, res) => {
  const { pageSize, pageNumber } = req.query;
  User.getUser(res, pageSize, pageNumber);
};
