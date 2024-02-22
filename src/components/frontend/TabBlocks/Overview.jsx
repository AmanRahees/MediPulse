import PropTypes from "prop-types";
import { getYear, totalYears } from "@/func/days";

function Overview({ doctor }) {
  return (
    <div className="p-5">
      <h1 className="text-xl md:text-3xl">About Me</h1>
      <p className="mt-2">{doctor?.about}</p>
      <h1 className="text-xl md:text-3xl mt-7">Clinic Information</h1>
      <p className="mt-2 font-bold">
        <span className="font-light">Clinic Name: </span>
        {doctor?.clinic_name}
      </p>
      <p className="mt-2">
        <span className="font-light">Address: </span>
        {doctor?.clinic_address}
      </p>
      <div className="flex gap-2 my-5">
        {doctor?.clinic_images.map((image, idx) => (
          <img
            src={image?.clinic_image}
            alt=""
            className="w-[50px] rounded-md"
            key={idx}
          />
        ))}
      </div>
      {doctor?.education.length > 0 && (
        <>
          <h1 className="text-xl md:text-3xl mt-7">Education</h1>
          <div className="timeline">
            {doctor?.education.map((item, idx) => (
              <div className="tml_container" key={idx}>
                <p className="font-bold hover:text-ternary transition-colors duration-300 w-max">
                  {item?.degree}
                </p>
                <small className="block">{item?.institute}</small>
                <small>
                  {getYear(item?.date_from)} -
                  {!item.present ? getYear(item?.date_to) : " Present"}
                </small>
              </div>
            ))}
          </div>
        </>
      )}
      {doctor?.experience.length > 0 && (
        <>
          <h1 className="text-xl md:text-3xl mt-7">Eperience</h1>
          <div className="timeline">
            {doctor?.experience.map((item, idx) => (
              <div className="tml_container" key={idx}>
                <p className="font-bold hover:text-ternary transition-colors duration-300 w-max">
                  {item.position}
                </p>
                <small className="block">{item.hospital_name}</small>
                <small>
                  {getYear(item.date_from)} -
                  {!item.present ? getYear(item.date_to) : " Present"}
                  <span className="mx-1 text-[10px]">
                    • {totalYears(item.date_from)}
                  </span>
                </small>
              </div>
            ))}
          </div>
        </>
      )}
      {doctor?.awards.length > 0 && (
        <>
          <h1 className="text-xl md:text-3xl mt-7">Awards</h1>
          <div className="timeline">
            {doctor?.awards.map((item, idx) => (
              <div className="tml_container" key={idx}>
                <p className="font-bold hover:text-ternary transition-colors duration-300 w-max">
                  {item.award_name}
                </p>
                <small>{getYear(item.award_year)}</small>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

Overview.propTypes = {
  doctor: PropTypes.object.isRequired,
};

export default Overview;
