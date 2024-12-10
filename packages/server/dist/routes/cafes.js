"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var import_express = __toESM(require("express"));
var import_cafes_svc = __toESM(require("../services/cafes-svc"));
const router = import_express.default.Router();
router.get("/", (_, res) => {
  import_cafes_svc.default.index().then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
router.get("/:cafeId", (req, res) => {
  const { cafeId } = req.params;
  import_cafes_svc.default.get(cafeId).then((cafes2) => res.json(cafes2)).catch((err) => res.status(404).send(err));
});
router.post("/", (req, res) => {
  const newCafe = req.body;
  import_cafes_svc.default.create(newCafe).then(
    (cafes2) => res.status(201).json(cafes2)
  ).catch((err) => res.status(500).send(err));
});
app.put("/:cafeId", (req, res) => {
  const { cafeId } = req.params;
  const newCafe = req.body;
  import_cafes_svc.default.update(cafeId, newCafe).then((cafes2) => res.json(cafes2)).catch((err) => res.status(404).end());
});
router.delete("/:cafeId", (req, res) => {
  const { cafeId } = req.params;
  import_cafes_svc.default.remove(cafeId).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
