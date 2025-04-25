import Ticket from "../components/BookingPageComponents/TicketStepComponents/ticketComponent";

const TicketStep = ({ tickets }) => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7">
          <svg
            viewBox="0 0 32 32"
            fill="#6C6CFFFF"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title />
            <g data-name="Layer 51" id="Layer_51">
              <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z" />
              <path d="M23.29,10.29,14,19.59l-5.29-5.3a1,1,0,1,0-1.42,1.42l6,6a1,1,0,0,0,1.42,0l10-10a1,1,0,0,0-1.42-1.42Z" />
            </g>
          </svg>
        </div>
        <h2 className="text-[#6C6CFFFF] font-semibold text-xl">
          Your flight is booked successfully!
        </h2>
      </div>
      <p className="text-neutral-600 mb-10">
        Present E-ticket and valid indentification at check-in
      </p>
      {/*Generated tickets*/}
      <div className="mb-10 flex flex-col gap-10">
        {tickets.map((ticket, index) => (
          <div key={index}>
            <Ticket ticketInfo={ticket} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TicketStep;
