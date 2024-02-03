/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { ScrollArea } from "@/widgets/ui/scroll-area";
import { Checkbox } from "@/widgets/ui/checkbox";
import { Slider } from "@/widgets/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "@/widgets/ui/accordion";
import "./filter.css";

function FilterBox(props) {
  return (
    <div className="_filterBox lg:sticky lg:top-[90px] rounded-md border border-sky-100">
      <div className="p-3 border-b border-sky-100 bg-[#F2F6F6]">
        <h1 className="font-bold text-zinc-800 text-lg">Filter</h1>
      </div>
      <Accordion type="multiple" collapsible="true" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-zinc-800 hover:no-underline px-5 py-4">
            Specialist
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="w-full h-[200px] px-5">
              {props?.specialities.map((item, index) => (
                <div className="my-2" key={index}>
                  <Checkbox className="data-[state=checked]:bg-primary border-gray-300 data-[state=checked]:border-primary mr-2" />
                  <label htmlFor="">{item.speciality_name}</label>
                </div>
              ))}
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-zinc-800 hover:no-underline px-5 py-4">
            Gender
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="w-full px-5">
              <div className="my-2">
                <Checkbox className="data-[state=checked]:bg-primary border-gray-300 data-[state=checked]:border-primary mr-2" />
                <label htmlFor="">Male</label>
              </div>
              <div className="my-2">
                <Checkbox className="data-[state=checked]:bg-primary border-gray-300 data-[state=checked]:border-primary mr-2" />
                <label htmlFor="">Female</label>
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-zinc-800 hover:no-underline px-5 py-4">
            Consultation Fee
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="w-full px-5">
              <Slider
                defaultValue={[300, 5000]}
                min={300}
                max={5000}
                step={50}
                tooltp="klsdjf"
                className="my-3 w-[99%]"
                onValueChange={(e) => console.log(e[0], e[1])}
              />
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {/* <div className="flex justify-end gap-2 py-4 px-5">
        <button className="border text-sm py-1 px-3 rounded-md text-secondary border-secondary">
          Reset
        </button>
        <button className="border text-sm py-1 px-3 rounded-md bg-secondary text-white">
          Apply
        </button>
      </div> */}
    </div>
  );
}

export default FilterBox;
