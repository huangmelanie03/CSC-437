"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var cafes_svc_exports = {};
__export(cafes_svc_exports, {
  default: () => cafes_svc_default,
  getCafe: () => getCafe
});
module.exports = __toCommonJS(cafes_svc_exports);
var import_mongoose = require("mongoose");
const cafesSchema = new import_mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    rating: { type: String, required: true, trim: true },
    numbers: { type: String, required: true, trim: true },
    hours: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true }
  },
  { collection: "cafes_infos" }
);
const CafeModel = (0, import_mongoose.model)("cafeInfo", cafesSchema);
function index() {
  return CafeModel.find();
}
function create(json) {
  const t = new CafeModel(json);
  return t.save();
}
function get(cafeId) {
  return CafeModel.find({ cafeId }).then((list) => list[0]).catch(
    (err) => {
      throw `${cafeId} Not Found`;
    }
  );
}
function update(cafeId, cafes2) {
  return CafeModel.findOneAndUpdate({ cafeId }, cafes2, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${cafeId} not updated`;
    else return updated;
  });
}
function remove(cafeId) {
  return CafeModel.findOneAndDelete({ cafeId }).then(
    (deleted) => {
      if (!deleted) throw `${cafeId} not deleted`;
    }
  );
}
const cafes = {
  Philz: {
    name: "Philz Coffee",
    rating: "3.9/5.0",
    numbers: "(510) 980-9690",
    hours: "Monday: 5:30am-8:00pm <br> Tuesday: 5:30am-8:00pm <br> Wednesday: 5:30am-8:00pm <br> Thursday: 5:30am-8:00pm <br> Friday: 5:30am-8:00pm <br> Saturday: 6:00am-8:00pm <br> Sunday: 6:00am-8:00pm",
    address: "3359 Castro Valley Blvd, Castro Valley, CA 94546"
  },
  Nautical: {
    name: "Nautical Bean",
    rating: "4.7/5.0",
    numbers: "(805) 439-4683",
    hours: "Monday: 6:00am-4:00pm <br> Tuesday: 6:00am-4:00pm <br> Wednesday: 6:00am-4:00pm <br> Thursday: 6:00am-4:00pm <br> Friday: 6:00am-4:00pm <br> Saturday: 7:00am-4:00pm <br> Sunday: 7:00am-4:00pm",
    address: "2010 Parker St, San Luis Obispo, CA 93401"
  },
  Kaffein: {
    name: "Kaffein",
    rating: "4.6/5.0",
    numbers: "(805) 540-0512",
    hours: "Monday: 7:00am-3:00pm <br> Tuesday: 7:00am-3:00pm <br> Wednesday: 7:00am-3:00pm <br> Thursday: 7:00am-3:00pm <br> Friday: 7:00am-3:00pm <br> Saturday: 7:00am-3:00pm <br> Sunday: 7:00am-3:00pm",
    address: "1242 Monterey St STE 110, San Luis Obispo, CA 93401"
  },
  Scout: {
    name: "Scouts",
    rating: "4.7/5.0",
    numbers: "(805) 439-4683",
    hours: "Monday: 6:30am-6:30pm <br> Tuesday: 6:30am-6:30pm <br> Wednesday: 6:30am-6:30pm <br> Thursday: 6:30am-6:30pm <br> Friday: 6:30am-6:30pm <br> Saturday: 6:30am-6:30pm <br> Sunday: 6:30am-6:30pm",
    address: "880 Foothill Blvd, San Luis Obispo, CA 93405"
  }
};
function getCafe(name) {
  return cafes["Philz"];
}
var cafes_svc_default = { index, get, create, update, remove };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCafe
});
