import Image from "next/image";
import React from "react";

export default function BusinessDescription({ business }) {
  return (
    business?.businessList.name && (
      <div>
        <h2 className="font-bold text-[25px]">Description</h2>
        <p className="mt-4 text-lg text-gray-600">
          {business.businessList.about}
        </p>
        <h2 className="font-bold text-[25px] mt-8 ">Gallary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
          {business?.businessList.images?.map((item, index) => (
            <Image
              src={item?.url || "/default-person.svg"}
              key={index}
              width={700}
              height={200}
              className="rounded-lg"
            />
          ))}
        </div>
      </div>
    )
  );
}
