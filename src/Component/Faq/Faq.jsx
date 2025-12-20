import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const faqs = [
  {
    q: "What types of cuisine does DelishBite offer?",
    a: `Oh, where do we start? At DelishBite, we're passionate about fast-casual feasts that tantalize your taste buds! From juicy stacked burgers and zesty tacos to cheesy pepperoni pizzas, crispy chicken fries, fresh salads, creamy pastas, and irresistible desserts like tiramisu or chocolate cake—we blend timeless traditions with fun, innovative twists. What's your craving today? 🍔🌮🍕`,
  },
  {
    q: "How does DelishBite ensure food quality and safety?",
    a: `We prioritize food safety by using fresh, high-quality ingredients sourced from trusted suppliers. Our kitchen follows strict hygiene protocols, and all staff are trained in food handling standards to maintain the highest level of quality.`,
  },
  {
    q: "Can I order online for pickup?",
    a: `Absolutely! You can place orders for pickup through our website's order page. Simply select your items, choose the pickup option, and we'll have your order ready at the specified time.`,
  },
  {
    q: "Is DelishBite suitable for large groups or events?",
    a: `Totally! We adore hosting big crews and even offer catering for your shindigs. For groups over 6, snag a reservation ahead via our site or phone to lock in space. Let's turn your gathering into a feast to remember! 🥂`,
  },
  {
    q: "How can I make a reservation at DelishBite?",
    a: `Booking a spot is a breeze! Head to our website's reservation page, pop in your name, email, phone, party size, date, and time—or give us a quick call. We'll roll out the red carpet for your unforgettable dining adventure. Pro tip: Add any special notes, like a birthday surprise! 🎉`,
  },
  {
    q: "Does DelishBite have a loyalty program?",
    a: `Oh, we love rewarding our regulars! Join our loyalty program to rack up points on every bite, then redeem for sweet discounts or free goodies. Sign up super quick on our site or app—your next perk is just a meal away! 🎁`,
  },
];

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="my-16 md:my-20 w-full flex flex-col items-center">
      <h2 className="relative w-fit mt-6 mb-6 text-4xl md:text-5xl lg:text-6xl text-primary-dark font-satisfy transition-transform duration-300 ease-in-out
      hover:scale-[1.05] cursor-pointer transform text-center mx-auto
      after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary-dark after:transform after:scale-x-0 after:origin-center after:transition-transform after:duration-300 after:ease-in-out hover:after:scale-x-110">
        FAQ
      </h2>

      <div className="w-full max-w-5xl px-2 md:px-4 lg:px-8 flex flex-col gap-4 md:gap-6">
        {faqs.map((faq, idx) => (
          <div key={idx}>
            <button
              className={`w-full flex justify-between items-center border-l-4 rounded-lg outline-none text-md md:text-xl lg:text-2xl py-5 px-4 
                font-medium transition-all duration-500 cursor-pointer ${
                  openIdx === idx
                    ? "border-primary-light text-primary-dark bg-gray-50"
                    : "border-primary text-text-primary-muted"
                }`}
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <span>{faq.q}</span>
              <span
                className={`
                  ml-4 font-bold text-lg transition-transform duration-300 
                  ${openIdx === idx ? "rotate-[135deg]" : ""}
                  text-primary-dark
                `}
              >
                <FontAwesomeIcon icon={faPlus} className="text-sm md:text-md lg:text-lg" />
              </span>
            </button>
            <div
              className={`overflow-hidden transition-max-height duration-300 ${openIdx === idx ? "max-h-96" : "max-h-0"}`}
            >
              <div
                className={`w-[98%] mb-2 mx-auto text-base border-t-0 md:text-lg text-zinc-900 py-5 px-4 bg-gray-100 border border-primary-light rounded-b-lg`}
              >
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
