import * as customerService from '../services/customer.service.js';

export const createCustomer = async (req, res, next) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
};

export const getCustomers = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await customerService.getCustomers(page, limit);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getCustomerById = async (req, res, next) => {
  try {
    const customer = await customerService.getCustomerById(
      Number(req.params.id)
    );
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

export const updateCustomer = async (req, res, next) => {
  try {
    const customer = await customerService.updateCustomer(
      Number(req.params.id),
      req.body
    );
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

export const deleteCustomer = async (req, res, next) => {
  try {
    const result = await customerService.deleteCustomer(
      Number(req.params.id)
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};
