import { Schema, model } from "mongoose";
import{ cafes } from "../models/cafes";

const cafesSchema = new Schema<cafes>(
    {
        name: {type: String, required: true, trim: true},
        rating: {type: String, required: true, trim: true},
        numbers: {type: String, required: true, trim: true},
        hours: {type: String, required: true, trim: true},
        address: {type: String, required: true, trim: true}
    },
    {collection: "cafes_infos"}
);


const CafeModel = model<cafes>("cafeInfo", cafesSchema);

function index():Promise<cafes[]>{
    return CafeModel.find();
}

function get(cafeId:String): Promise<cafes>{
    return CafeModel.find({cafeId})
        .then((list)=>list[0])
        .catch((err)=>{
            throw`${cafeId} Not Found`;
        }
    );
}

export default {index, get};

const cafes = {
    Philz:{
        name: "Philz Coffee",
        rating: "3.9/5.0",
        numbers: "(510) 980-9690",
        hours:
            "Monday: 5:30am-8:00pm <br> Tuesday: 5:30am-8:00pm <br> Wednesday: 5:30am-8:00pm <br> Thursday: 5:30am-8:00pm <br> Friday: 5:30am-8:00pm <br> Saturday: 6:00am-8:00pm <br> Sunday: 6:00am-8:00pm",
        address: "3359 Castro Valley Blvd, Castro Valley, CA 94546"
    },

    Nautical:{
        name: "Nautical Bean",
        rating: "4.7/5.0",
        numbers: "(805) 439-4683",
        hours: 
            "Monday: 6:00am-4:00pm <br> Tuesday: 6:00am-4:00pm <br> Wednesday: 6:00am-4:00pm <br> Thursday: 6:00am-4:00pm <br> Friday: 6:00am-4:00pm <br> Saturday: 7:00am-4:00pm <br> Sunday: 7:00am-4:00pm",
        address: "2010 Parker St, San Luis Obispo, CA 93401"
    },

    Kaffein:{
        name: "Kaffein",
        rating: "4.6/5.0",
        numbers: "(805) 540-0512",
        hours:
            "Monday: 7:00am-3:00pm <br> Tuesday: 7:00am-3:00pm <br> Wednesday: 7:00am-3:00pm <br> Thursday: 7:00am-3:00pm <br> Friday: 7:00am-3:00pm <br> Saturday: 7:00am-3:00pm <br> Sunday: 7:00am-3:00pm",
        address: "1242 Monterey St STE 110, San Luis Obispo, CA 93401"
    },

    Scout:{
        name: "Scouts",
        rating: "4.7/5.0",
        numbers: "(805) 439-4683",
        hours:
            "Monday: 6:30am-6:30pm <br> Tuesday: 6:30am-6:30pm <br> Wednesday: 6:30am-6:30pm <br> Thursday: 6:30am-6:30pm <br> Friday: 6:30am-6:30pm <br> Saturday: 6:30am-6:30pm <br> Sunday: 6:30am-6:30pm",
        address: "880 Foothill Blvd, San Luis Obispo, CA 93405"
    }
};

export function getCafe(name: string): cafes {
    // return Philz regardless of which cafe is requested
    return cafes["Philz"];
}





