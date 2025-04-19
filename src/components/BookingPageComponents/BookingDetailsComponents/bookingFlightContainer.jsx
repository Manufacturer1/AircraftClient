import BookingFlightDetails from "./bookingFlightDetails";
import airplaneIcon from "../../../images/airplane.svg";

const BookingFlightContainer = ({ bookingFlightDetails }) => {
  const { flights, ...itineraryDetails } = bookingFlightDetails;

  return (
    <section className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex gap-3 mb-3">
        <img src={airplaneIcon} />
        <h2 className="text-neutral-700 font-bold text-lg">
          {itineraryDetails.itineraryOrigin} -{" "}
          {itineraryDetails.itineraryDestination}
        </h2>
      </div>
      <hr className="border-solid border-neutral-300 mb-3" />

      <div className="flex flex-col gap-10">
        {flights.map((flight, index) => (
          <BookingFlightDetails
            key={index}
            bookingFlightDetails={{
              ...itineraryDetails,
              ...flight,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default BookingFlightContainer;
