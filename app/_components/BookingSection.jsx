"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import GlobalApi from "../_services/GlobalApi";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import moment from "moment";

function BookingSection({ children, business }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTime, setselectedTime] = useState();
  const [bookedSlot, setBookedSlot] = useState([])
  const { data } = useSession();

  useEffect(() => {
    getTime();
  }, []);
useEffect(()=>{
  date&&businessBookedSlot()
},[date])

  const businessBookedSlot=()=>{
    GlobalApi.businessBookedSlot(business.businessList.id, moment(date).format('DD-MMM-yyyy')).then(res=>{
      console.log(res);
      setBookedSlot(res.bookings)
    })
  }

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: `${i}:00 AM`,
      });
      timeList.push({
        time: `${i}:30 AM`,
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: `${i}:00 AM`,
      });
      timeList.push({
        time: `${i}:30 AM`,
      });
    }
    setTimeSlot(timeList);
  };
  console.log(business);

  const saveBooking = () => {
    GlobalApi.createNewBooking(
      business.businessList.id,
      moment(date).format('DD-MMM-yyyy'),
      selectedTime,
      data.user.email,
      data.user.name
    ).then(
      (res) => {
        console.log(res);
        if (res) {
          setDate();
          setselectedTime("");
          toast("Service Booked Successfully");
        }
      },
      (e) => {
        toast("Error while creating booking");
      }
    );
  };

  const isSlotBooked=(time)=>{
    return bookedSlot.find(item=>item.time==time)
  }
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book an Service</SheetTitle>
            <SheetDescription>
              Select Date and Time to book an Service
              <div className="flex flex-col gap-5 items-baseline">
                <h2 className="mt-5 font-bold ">Select Date</h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border w-full px-10"
                />
              </div>
              <h2 className="my-5 font-bold ">Select Time Slot</h2>
              <div className="grid grid-cols-3 gap-3">
                {timeSlot.map((item, index) => (
                  <Button
                  disabled={isSlotBooked(item.time)}
                    key={index}
                    variant="outline"
                    className={`border rounded-full p-2 px-3 hover:bg-primary hover:text-white ${
                      selectedTime == item.time && "bg-primary text-white"
                    }`}
                    onClick={() => setselectedTime(item.time)}
                  >
                    {item.time}
                  </Button>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="mt-5">
            <SheetClose asChild>
              <div className="flex gap-5">
                <Button variant="ghost">Cancel</Button>
                <Button
                  disabled={!(selectedTime && date)}
                  onClick={() => saveBooking()}
                >
                  Book
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;
