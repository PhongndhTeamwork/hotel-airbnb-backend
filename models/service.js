import database from "../utils/database.js";

export class Service {
   constructor(name, imagePath) {
      this.name = name;
      this.imagePath = imagePath;
   }

   //!CREATE SERVICE
   createService(res) {
      database
         .insert({
            name: this.name,
            image_path: this.imagePath,
         })
         .into("service")
         .then(() => {
            console.log("Success");
            res.json("Success");
         })
         .catch((err) => {
            console.log(err);
            res.status(400).json("Error!");
         });
   }

   //! GET SERVICE
   static getService(res) {
      database("service")
         .select("*")
         .then((allServices) => {
            res.status(200).json(allServices);
         })
         .catch((err) => {
            console.log(err);
            res.json("Error");
         });
   }

   //! GET SERVICE DETAIL
   static getServiceDetail(res, serviceId) {
      database("service")
         .where("id", "=", serviceId)
         .select("*")
         .then((service) => {
            res.status(200).json(service);
         })
         .catch((err) => {
            console.log(err);
            res.json("Error");
         });
   }

   //!UPDATE SERVICE
   static updateService(res, serviceId, name, imagePath) {
      const updateData = {
         name: name,
      };
      if (imagePath !== null) {
         updateData.image_path = imagePath;
      }
      database("service")
         .where("id", "=", serviceId)
         .update(updateData)
         .returning("*")
         .then((data) => {
            res.json(data);
         })
         .catch((err) => {
            console.log(err);
            res.status(400).json("Error!");
         });
   }

   //!DELETE SERVICE
   static deleteService(res, serviceId) {
      database("hotel_service")
         .where("service_id", "=", serviceId)
         .del()
         .then(() => {
            database("service")
               .where("id", "=", serviceId)
               .del()
               .then(() => {
                  res.json("Deleted!");
               })
               .catch(() => {
                  console.log(err);
                  res.status(400).json("Error!");
               });
         })
         .catch((err) => {
            console.log(err);
            res.status(400).json("Error!");
         });
   }

   //! ADD SERVICE TO HOTEL - hotelier
   static addService(res, serviceId, hotelId, hotelierId) {
      // First, check if the hotel belongs to the hotelier
      database
         .select("hotelier_id")
         .from("hotel")
         .where("id", hotelId)
         .then((rows) => {
            if (rows.length === 0) {
               // Hotel not found
               res.json("Hotel not found");
            } else if (rows[0].hotelier_id !== hotelierId) {
               // Hotel does not belong to the hotelier
               res.json("Unauthorized");
            } else {
               // Hotel belongs to the hotelier, proceed with adding the service
               return database
                  .insert({
                     service_id: serviceId,
                     hotel_id: hotelId,
                  })
                  .into("hotel_service");
            }
         })
         .then(() => {
            res.json("Success");
         })
         .catch((err) => {
            console.log(err);
            res.json("Error");
         });
   }

   //! GET SERVICE - hotelier
   static getServiceByHotelier(res, hotelId) {
      database("hotel_service")
         .join("service", "service.id", "=", "hotel_service.service_id")
         .where("hotel_id", "=", hotelId)
         .select("service.*")
         .then((services) => {
            res.json(services);
         })
         .catch((err) => {
            console.log(err);
            res.json("Error");
         });
   }

   // //! UPDATE SERVICE - hotelier
   // static updateServiceByHotelier(res, serviceId,hotelId, hotelierId, newServiceId){
   //   database("hotel_service")
   //   .join("hotel", "hotel.id","=","hotel_service.hotel_id")
   //   .where("hotel.hotelier_id","=",hotelierId)

   // }

   //! DELETE ALL SERVICES
   static deleteAllServicesByHotelier(res, hotelId, hotelierId) {
      database("hotel_service")
         .join("hotel", "hotel.id", "=", "hotel_service.hotel_id")
         .where("hotel.hotelier_id", "=", hotelierId)
         .andWhere("hotel_service.hotel_id", "=", hotelId)
         .del()
         .then(() => {
            res.json("Deleted");
         })
         .catch((err) => {
            console.log(err);
            res.json("Error");
         });
   }

   //! DELETE SERVICE - hotelier
   static deleteServiceByHotelier(res, serviceId, hotelId, hotelierId) {
      database("hotel")
         .where("id", "=", hotelId)
         .select("hotelier_id")
         .then((rows) => {
            if (rows.length == 0) {
               res.json("Hotel not found");
            } else if (rows[0].hotelier_id !== hotelierId) {
               res.json("Unauthorized");
            } else {
               return database("hotel_service")
                  .where("service_id", "=", serviceId)
                  .del();
            }
         })
         .then(() => {
            res.json("Deleted");
         })
         .catch((err) => {
            console.log(err);
            res.json("Error");
         });
   }
}
