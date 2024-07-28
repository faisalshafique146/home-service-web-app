import { Button } from "@/components/ui/button";
import { Clock, Mail, MapPin, Share, User } from "lucide-react";
import Image from "next/image";
import React from "react";

function Businessinfo({ business }) {
  return business?.businessList.name&&(
    <div className="flex gap-4 items-center">
      <Image
        src={business.businessList?.images[0]?.url || "/default-person.svg"}
        alt={business.businessList.name}
        width={150}
        height={200}
        className="rounded-full h-[150px] object-cover"
      />
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col mt-4 md:mt-0 items-baseline gap-3">
          <h2 className="text-primary p-1 px-3 text-lg bg-purple-100 rounded-full">
            {business?.businessList.category?.name}
          </h2>
          <h2 className="text-[40px] font-bold ">
            {business.businessList.name}
          </h2>
          <h2 className="flex gap-2 text-lg text-gray-500">
            <MapPin />
            {business.businessList.address}
          </h2>
          <h2 className="flex gap-2 text-lg text-gray-500">
            <Mail />
            {business.businessList.email}
          </h2>
        </div>
        <div className="flex flex-col gap-5 items-end">
          <Button>
            <Share />
          </Button>
          <h2 className="flex gap-2 text-primary text-xl"><User/> {business.businessList.contactPerson}</h2>
          <h2 className="flex gap-2 text-gray-500 text-xl"><Clock/> Available 8:00 AM to 10:00 PM</h2>
        </div>
      </div>
    </div>
  );
}

export default Businessinfo;
