/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import useAxios from "@/services/useAxios";
import { Label } from "@/widgets/ui/label";
import { Input } from "@/widgets/ui/input";
import { Skeleton } from "@/widgets/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/widgets/ui/select";
import Board from "@/components/frontend/Board/Board";
import { SLOT_DURATIONS, DAYS } from "@/services/constants";
import AddTimings from "@/components/frontend/Doctor/EditTimings";
import { LoadSpinner } from "@/components/Icons";
import { updateUserInfo } from "@/redux/actions/userActions";
import { formatTime } from "@/func/time";

function Timings() {
  const api = useAxios();
  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector((state) => state.user);
  const [slotDuration, setSlotDuration] = useState(
    userInfo?.slot_duration || "10 mins"
  );
  const [schedules, setSchedules] = useState(userInfo?.schedules || []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleDurationChange = (e) => {
    setSlotDuration(e);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    api
      .put(`contexts/doctorInfo/${userInfo?.id}`, {
        slot_duration: slotDuration,
      })
      .then((response) => {
        setIsSubmitting(false);
        dispatch(updateUserInfo(response.data));
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.log(error);
      });
  };
  return (
    <Board>
      <div>
        <p className="font-bold text-xl mb-2 text-zinc-800">Schedule Timings</p>
        <form className="relative my-3" onSubmit={handleFormSubmit}>
          <Label>Timing Slot Duration</Label>
          {!loading ? (
            <div className="flex gap-2 my-1">
              <Select
                name="slot_duration"
                defaultValue={userInfo?.slot_duration}
                onValueChange={handleDurationChange}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SLOT_DURATIONS.map((duration, index) => (
                      <SelectItem key={index} value={duration}>
                        {duration}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <button
                disabled={isSubmitting}
                className="bg-primary text-white px-2 rounded-md text-sm w-[80px]"
              >
                {isSubmitting ? <LoadSpinner /> : "Update"}
              </button>
            </div>
          ) : (
            <div className="flex gap-2 my-1">
              <Skeleton className="w-[200px] h-10 bg-zinc-200" />
              <Skeleton className="w-[80px] h-10 bg-zinc-200" />
            </div>
          )}
        </form>
        <hr />
        <div className="p-3">
          <p className="font-bold text-lg text-zinc-700 mb-2">
            Slots Timings <AddTimings />
          </p>
          {!loading ? (
            userInfo?.schedules &&
            userInfo?.schedules.map((schedule, index) => (
              <div className="" key={index}>
                {schedule?.day}
                {formatTime(schedule?.start_time)}
                {formatTime(schedule?.end_time)}
              </div>
            ))
          ) : (
            <span>sdaf</span>
          )}
          <div className="grid grid-cols-4">
            <p className="">Monday</p>
            <Input />
          </div>
        </div>
      </div>
    </Board>
  );
}

export default Timings;
