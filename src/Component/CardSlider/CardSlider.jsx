import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Mousewheel, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Define the card data (extracted from the provided HTML)
const cards = [
  {
    imgSrc: 'https://media.timeout.com/images/106196295/image.jpg',
    title: 'Sunny Outdoor Restaurant Patio',
    text: 'A vibrant outdoor dining area with frilled pink umbrellas, lush green plants in colorful pots, curved booths, marble tables, and a checkered tile floor under a clear blue sky, creating a cozy and inviting ambiance for al fresco meals.',
  },
  {
    imgSrc: 'https://www.foodandwine.com/thmb/i0PF1kTaLedLZjlVTIAbrdD9Nag=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Best-US-Restaurants-for-Ambiance-Merois-FT-BLOG0423-072da39cb8104eb8b07d1f49c42f1dce.jpg',
    title: 'Vibrant Tropical Restaurant Oasis',
    text: 'A chic restaurant interior with turquoise tiled walls, arched mirrors showing city skylines, vibrant potted plants, patterned pink-and-white banquettes, blue velvet benches, wooden lattice chairs, brass-topped tables set for dining, and a multicolored checkered floor beneath soft pendant lights and a draped ceiling.',
  },
  {
    imgSrc: 'https://s3-media0.fl.yelpcdn.com/bphoto/UAUZ5zTeVUh_wITnl5qikw/l.jpg',
    title: 'Ultimate Steak Feast Platter',
    text: 'In sun-drenched Fort Lauderdale, a small beachside steakhouse was born from a sailor\'s dream in the 1980s. Weathering hurricanes and tourist waves, it became a haven for locals sharing tales over grilled meats. One fateful evening, amid a power outage, the owner improvised a massive platter of seared ribeyes, T-bones, and hearty sides—fostering bonds that turned the spot into a community legend, where every bite echoes stories of resilience and seaside joy',
  },
  {
    imgSrc: 'https://cdn.pixabay.com/photo/2018/11/30/08/37/burger-3847279_1280.jpg',
    title: 'The Stacked Flavor Fortress Burger',
    text: 'In DelishBite\'s cozy kitchen, our founder tinkered late one night, drawing from childhood backyard grills. He doubled juicy beef patties, seared them with a secret spice blend, melted cheddar for that oozy pull, then stacked crisp lettuce, ripe tomatoes, and onions on a toasted bun. Born from a hunger for perfection, this towering creation became our bestseller, embodying layers of family tradition and bold innovation in every savory bite.',
  },
  {
    imgSrc: 'https://cdn.pixabay.com/photo/2013/12/14/08/13/ice-228388_1280.jpg',
    title: 'Decadent Waffle Ice Cream Bliss',
    text: 'On a golden summer evening at DelishBite, this sundae emerged from patio experimentation: hot waffles crisped to caramel perfection, crowned with velvety vanilla scoops that melt into rivers of warm chocolate. The first bite cracks through sugary edges, flooding taste buds with buttery crunch, creamy chill, and deep cocoa richness—balancing sweet ecstasy and cool relief for an addictive, soul-satisfying finish that keeps you savoring every indulgent spoonful.',
  },
];

// CardSlider Component (using original class names for CSS matching)
const CardSlider = () => {
  const pagination = {
    el: '.card-slider-pagination',
    clickable: true,
  };

  return (
    <div className="about-container">
      <div className="card-slider">
        <Swiper
          modules={[Pagination, EffectFade, Mousewheel, Autoplay]}
          direction="horizontal"
          slidesPerView={1}
          spaceBetween={30}
          effect="fade"
          loop={true}
          mousewheel={{ invert: false }}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          pagination={pagination}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index} className="card-slider-item">
              <div className="card-slider-img">
                <img
                  src={card.imgSrc}
                  alt={card.title}
                  className="swiper-lazy"
                />
              </div>
              <div className="card-slider-content">
                <h1 className="card-slider-title">{card.title}</h1>
                <p className="card-slider-text">{card.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="card-slider-pagination"></div>
      </div>
    </div>
  );
};

export default CardSlider;