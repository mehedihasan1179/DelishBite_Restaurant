// const blogPosts = [
//   {
//     id: 1,
//     imageUrl: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f",
//     date: "June 15, 2023",
//     author: "John Doe",
//     title: "Exploring Seasonal Flavors",
//     description:
//       "Learn about our new fall menu featuring fresh, locally-sourced ingredients that bring warmth to every bite.",
//     readMoreLink: "pesto-pasta",
//     isFavorite: false,
//     fullContent: (
//       <>
//         <div
//           className="min-h-screen font-sans"
//           style={{
//             backgroundColor: "#f7e8d9",
//             fontFamily: '"Segoe UI", sans-serif',
//           }}
//         >
//           <div
//             className="container max-w-5xl mx-auto p-5 md:p-8 shadow-lg rounded-lg"
//             style={{
//               backgroundColor: "#fefefe",
//             }}
//           >
//             <p
//               className="content-text text-base leading-relaxed mb-6 text-justify"
//               style={{ color: "#222" }}
//             >
//               Imagine stepping into our warm, inviting restaurant, where soft
//               lighting and gentle music create the perfect ambiance for an
//               unforgettable meal. Our signature gravy-based sabzee is a
//               celebration of vibrant flavors, crafted to delight your senses and
//               leave you craving more.
//             </p>

//             {/* <img 
//                         src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f" 
//                         alt="Sabzee Dish" 
//                         className="dish-image w-full h-auto rounded-lg mb-8 md:mb-12 shadow-sm" 
//                     /> */}

//             <h2
//               className="section-title text-3xl font-semibold mt-8 md:mt-12 mb-4"
//               style={{ color: "#222" }}
//             >
//               Ingredients
//             </h2>
//             <ul className="ingredients-list list-disc pl-8 md:pl-10 mb-8 md:mb-12">
//               <li className="ingredient-item text-base mb-1.5 leading-tight">
//                 5-6 cups chopped vegetables (cut into uniformly sized pieces)
//               </li>
//               <li className="ingredient-item text-base mb-1.5 leading-tight">
//                 ¼ cup chopped cilantro (optional)
//               </li>

//               <li className="ingredient-item ingredient-item--bold font-bold mt-2.5 mb-1.5 leading-tight">
//                 For the masala:
//               </li>

//               <li className="ingredient-item text-base mb-1.5 leading-tight">
//                 ¼ cup ghee or oil
//               </li>
//               <li className="ingredient-item text-base mb-1.5 leading-tight">
//                 2 medium onions, thinly sliced/chopped
//               </li>
//               <li className="ingredient-item text-base mb-1.5 leading-tight">
//                 ¼ cup finely chopped fresh ginger
//               </li>
//               <li className="ingredient-item text-base mb-1.5 leading-tight">
//                 5-6 cloves garlic, chopped
//               </li>
//               <li className="ingredient-item text-base mb-1.5 leading-tight">
//                 1 rounded teaspoon turmeric
//               </li>
//               <li className="ingredient-item text-base mb-1.5 leading-tight">
//                 ½ teaspoon crushed red chiles or cayenne
//               </li>
//               <li className="ingredient-item text-base mb-1.5 leading-tight">
//                 1 teaspoon cumin seeds
//               </li>
//               <li className="ingredient-item text-base mb-1.5 leading-tight">
//                 2-3 teaspoons ground coriander
//               </li>
//               <li className="ingredient-item text-base mb-1.5 leading-tight">
//                 ½ teaspoon black pepper
//               </li>
//               <li className="ingredient-item text-base mb-1.5 leading-tight">
//                 2 tomatoes, peeled and chopped
//               </li>
//               <li className="ingredient-item text-base mb-1.5 leading-tight">
//                 1 teaspoon salt
//               </li>
//             </ul>

//             <h3
//               className="text-2xl md:text-3xl font-semibold mt-12 md:mt-16 mb-4"
//               style={{ color: "#e67e22" }}
//             >
//               Fresh and Fast: Your New Favorite Pesto Recipe
//             </h3>
//             <p
//               className="content-text text-base leading-relaxed mb-6 text-justify"
//               style={{ color: "#222" }}
//             >
//               This dish is all about celebrating fresh ingredients with minimal
//               fuss. Start by bringing a large pot of heavily salted water to a
//               rolling boil—it should taste like the sea! Toss in your pasta and
//               cook it until it's perfectly al dente. While that's happening,
//               you'll want to get your pesto ready. For the sauce, I like to
//               lightly toast my pine nuts in a dry pan until they're golden
//               brown. This really brings out their flavor. Then, in a food
//               processor, combine the toasted pine nuts, fresh basil leaves,
//               peeled garlic cloves, a generous pinch of salt, and a dash of
//               black pepper. Begin to pulse the ingredients, slowly drizzling in
//               the olive oil until you have a smooth, emulsified sauce. Finish it
//               with a good handful of grated cheese and pulse just until
//               combined. Before you drain the pasta, make sure to reserve about a
//               cup of that starchy cooking water. It's liquid gold! Drain the
//               pasta and immediately add it back to the hot pot. Toss in your
//               pesto, a handful of cherry tomatoes (some whole, some halved), and
//               a splash of that reserved pasta water. The pasta water will help
//               the sauce cling to every single noodle. Give it a final toss and
//               you're ready to plate.
//             </p>

//             <h3
//               className="text-2xl md:text-3xl font-semibold mt-12 md:mt-16 mb-4"
//               style={{ color: "#e67e22" }}
//             >
//               The Chef's Garden Pesto Pasta
//             </h3>
//             <p
//               className="content-text text-base leading-relaxed mb-6 text-justify"
//               style={{ color: "#222" }}
//             >
//               This dish is a masterpiece of simplicity and elegance, with each
//               strand of tagliatelle or fettuccine coated in a velvety pesto
//               sauce, crafted from fragrant fresh basil leaves, nutty pine nuts,
//               and savory Parmesan or Pecorino, blended with olive oil for a
//               silky finish. The subtle kick of garlic and a pinch of black
//               pepper elevate every bite, while halved cherry tomatoes add a
//               burst of juicy sweetness. Topped with delicate shavings of
//               Parmesan and a fresh basil sprig, the dish is as beautiful as it
//               is delicious. Our attentive servers are here to guide you, perhaps
//               suggesting the perfect pasta shape or sharing the story behind our
//               hand-picked ingredients, ensuring a tailored experience. Savor
//               each twirl of pasta, letting the vibrant flavors and inviting
//               aromas draw you in. One taste of this pesto pasta will have you
//               ordering it again before the meal is over.
//             </p>
//           </div>
//         </div>
//       </>
//     ),
//   },
//   {
//     id: 2,
//     imageUrl:
//       "https://www.reluctantgourmet.com/wp-content/uploads/2009/08/r2-chef-instructor-student.jpeg",
//     date: "June 15, 2023",
//     author: "John Doe",
//     title: "Behind the Kitchen Doors",
//     description:
//       "Get a glimpse into the passion and creativity of our chefs as they craft your favorite dishes.",
//     readMoreLink: "./blogs/kitchen-doors",
//     isFavorite: false,
//   },
//   {
//     id: 3,
//     imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
//     date: "June 15, 2023",
//     author: "John Doe",
//     title: "Elevating Your Dining Experience",
//     description:
//       "Discover tips to make your visit unforgettable, from wine pairings to ambiance.",
//     readMoreLink: "./blogs/dining-experience",
//     isFavorite: false,
//   },
//   {
//     id: 4,
//     imageUrl: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9",
//     date: "June 22, 2023",
//     author: "John Doe",
//     title: "Chef’s Special Creations",
//     description:
//       "Explore the art of flavor as our chefs blend innovation and tradition in every dish.",
//     readMoreLink: "./blogs/special-creations.html",
//     isFavorite: false,
//   },
//   {
//     id: 5,
//     imageUrl: "https://images.unsplash.com/photo-1498575207490-3e66ebd1bdbb",
//     date: "July 1, 2023",
//     author: "John Doe",
//     title: "The Art of Perfect Plating",
//     description:
//       "Understand how presentation turns an ordinary meal into a masterpiece.",
//     readMoreLink: "./blogs/plating-art.html",
//     isFavorite: false,
//   },
//   {
//     id: 6,
//     imageUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601",
//     date: "July 12, 2023",
//     author: "John Doe",
//     title: "Wine Pairing Simplified",
//     description:
//       "Learn how to pair wines with your favorite meals like a true connoisseur.",
//     readMoreLink: "./blogs/wine-pairing",
//     isFavorite: false,
//   },
//   {
//     id: 7,
//     imageUrl: "https://images.unsplash.com/photo-1529692236671-f1dc28bd3a3b",
//     date: "July 25, 2023",
//     author: "John Doe",
//     title: "Farm to Table Freshness",
//     description:
//       "See how our partnerships with local farms bring authentic freshness to your plate.",
//     readMoreLink: "./blogs/farm-fresh.html",
//     isFavorite: false,
//   },
//   {
//     id: 8,
//     imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061",
//     date: "August 5, 2023",
//     author: "John Doe",
//     title: "Savoring Summer Desserts",
//     description:
//       "Cool off with our irresistible collection of fruity and creamy summer desserts.",
//     readMoreLink: "./blogs/summer-desserts.html",
//     isFavorite: false,
//   },
//   {
//     id: 9,
//     imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
//     date: "August 18, 2023",
//     author: "John Doe",
//     title: "Grill Master’s Secrets",
//     description:
//       "Uncover pro grilling techniques to make your next barbecue unforgettable.",
//     readMoreLink: "./blogs/grill-secrets.html",
//     isFavorite: false,
//   },
//   {
//     id: 10,
//     imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
//     date: "September 2, 2023",
//     author: "John Doe",
//     title: "Perfect Pasta Every Time",
//     description:
//       "Discover how to cook and season pasta dishes that taste like Italy in a bowl.",
//     readMoreLink: "./blogs/perfect-pasta.html",
//     isFavorite: false,
//   },
//   {
//     id: 11,
//     imageUrl: "https://images.unsplash.com/photo-1493770348161-369560ae357d",
//     date: "September 15, 2023",
//     author: "John Doe",
//     title: "The Magic of Breakfast",
//     description:
//       "Find out how a simple breakfast can set the tone for a productive and happy day.",
//     readMoreLink: "./blogs/magic-breakfast.html",
//     isFavorite: false,
//   },
//   {
//     id: 12,
//     imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
//     date: "October 3, 2023",
//     author: "John Doe",
//     title: "Autumn’s Comfort Dishes",
//     description:
//       "Warm up with our favorite comfort recipes perfect for crisp autumn evenings.",
//     readMoreLink: "./blogs/autumn-dishes.html",
//     isFavorite: false,
//   },
// ];

const blogPosts = [
  {
    id: 1,
    category: "Recipes",
    imageUrl: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f",
    date: "June 15, 2023",
    author: "John Doe",
    title: "Exploring Seasonal Flavors",
    description:
      "Learn about our new fall menu featuring fresh, locally-sourced ingredients that bring warmth to every bite.",
    readMoreLink: "pesto-pasta",
    isFavorite: false,
    fullContent: (
      <>
        <div
          className="min-h-screen font-sans"
          style={{
            backgroundColor: "#f7e8d9",
            fontFamily: '"Segoe UI", sans-serif',
          }}
        >
          <div
            className="container max-w-5xl mx-auto p-5 md:p-8 shadow-lg rounded-lg"
            style={{
              backgroundColor: "#fefefe",
            }}
          >
            <p
              className="content-text text-base leading-relaxed mb-6 text-justify"
              style={{ color: "#222" }}
            >
              Imagine stepping into our warm, inviting restaurant, where soft
              lighting and gentle music create the perfect ambiance for an
              unforgettable meal. Our signature gravy-based sabzee is a
              celebration of vibrant flavors, crafted to delight your senses and
              leave you craving more.
            </p>

            {/* <img 
                        src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f" 
                        alt="Sabzee Dish" 
                        className="dish-image w-full h-auto rounded-lg mb-8 md:mb-12 shadow-sm" 
                    /> */}

            <h2
              className="section-title text-3xl font-semibold mt-8 md:mt-12 mb-4"
              style={{ color: "#222" }}
            >
              Ingredients
            </h2>
            <ul className="ingredients-list list-disc pl-8 md:pl-10 mb-8 md:mb-12">
              <li className="ingredient-item text-base mb-1.5 leading-tight">
                5-6 cups chopped vegetables (cut into uniformly sized pieces)
              </li>
              <li className="ingredient-item text-base mb-1.5 leading-tight">
                ¼ cup chopped cilantro (optional)
              </li>

              <li className="ingredient-item ingredient-item--bold font-bold mt-2.5 mb-1.5 leading-tight">
                For the masala:
              </li>

              <li className="ingredient-item text-base mb-1.5 leading-tight">
                ¼ cup ghee or oil
              </li>
              <li className="ingredient-item text-base mb-1.5 leading-tight">
                2 medium onions, thinly sliced/chopped
              </li>
              <li className="ingredient-item text-base mb-1.5 leading-tight">
                ¼ cup finely chopped fresh ginger
              </li>
              <li className="ingredient-item text-base mb-1.5 leading-tight">
                5-6 cloves garlic, chopped
              </li>
              <li className="ingredient-item text-base mb-1.5 leading-tight">
                1 rounded teaspoon turmeric
              </li>
              <li className="ingredient-item text-base mb-1.5 leading-tight">
                ½ teaspoon crushed red chiles or cayenne
              </li>
              <li className="ingredient-item text-base mb-1.5 leading-tight">
                1 teaspoon cumin seeds
              </li>
              <li className="ingredient-item text-base mb-1.5 leading-tight">
                2-3 teaspoons ground coriander
              </li>
              <li className="ingredient-item text-base mb-1.5 leading-tight">
                ½ teaspoon black pepper
              </li>
              <li className="ingredient-item text-base mb-1.5 leading-tight">
                2 tomatoes, peeled and chopped
              </li>
              <li className="ingredient-item text-base mb-1.5 leading-tight">
                1 teaspoon salt
              </li>
            </ul>

            <h3
              className="text-2xl md:text-3xl font-semibold mt-12 md:mt-16 mb-4"
              style={{ color: "#e67e22" }}
            >
              Fresh and Fast: Your New Favorite Pesto Recipe
            </h3>
            <p
              className="content-text text-base leading-relaxed mb-6 text-justify"
              style={{ color: "#222" }}
            >
              This dish is all about celebrating fresh ingredients with minimal
              fuss. Start by bringing a large pot of heavily salted water to a
              rolling boil—it should taste like the sea! Toss in your pasta and
              cook it until it's perfectly al dente. While that's happening,
              you'll want to get your pesto ready. For the sauce, I like to
              lightly toast my pine nuts in a dry pan until they're golden
              brown. This really brings out their flavor. Then, in a food
              processor, combine the toasted pine nuts, fresh basil leaves,
              peeled garlic cloves, a generous pinch of salt, and a dash of
              black pepper. Begin to pulse the ingredients, slowly drizzling in
              the olive oil until you have a smooth, emulsified sauce. Finish it
              with a good handful of grated cheese and pulse just until
              combined. Before you drain the pasta, make sure to reserve about a
              cup of that starchy cooking water. It's liquid gold! Drain the
              pasta and immediately add it back to the hot pot. Toss in your
              pesto, a handful of cherry tomatoes (some whole, some halved), and
              a splash of that reserved pasta water. The pasta water will help
              the sauce cling to every single noodle. Give it a final toss and
              you're ready to plate.
            </p>

            <h3
              className="text-2xl md:text-3xl font-semibold mt-12 md:mt-16 mb-4"
              style={{ color: "#e67e22" }}
            >
              The Chef's Garden Pesto Pasta
            </h3>
            <p
              className="content-text text-base leading-relaxed mb-6 text-justify"
              style={{ color: "#222" }}
            >
              This dish is a masterpiece of simplicity and elegance, with each
              strand of tagliatelle or fettuccine coated in a velvety pesto
              sauce, crafted from fragrant fresh basil leaves, nutty pine nuts,
              and savory Parmesan or Pecorino, blended with olive oil for a
              silky finish. The subtle kick of garlic and a pinch of black
              pepper elevate every bite, while halved cherry tomatoes add a
              burst of juicy sweetness. Topped with delicate shavings of
              Parmesan and a fresh basil sprig, the dish is as beautiful as it
              is delicious. Our attentive servers are here to guide you, perhaps
              suggesting the perfect pasta shape or sharing the story behind our
              hand-picked ingredients, ensuring a tailored experience. Savor
              each twirl of pasta, letting the vibrant flavors and inviting
              aromas draw you in. One taste of this pesto pasta will have you
              ordering it again before the meal is over.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 2,
    category: "Recipes",
    imageUrl: "https://eatingarounditaly.com/wp-content/uploads/2023/03/spaghetti-pasta-al-pomodoro.jpg",
    date: "December 15, 2025",
    author: "Chef Antonio Verdi",
    title: "Mastering Al Dente: Perfect Italian Pasta Every Time",
    description:
      "Learn the secrets to cooking pasta al dente like a true Italian, with tips on timing, sauce pairing, and authentic seasoning.",
    readMoreLink: "/blogs/perfect-pasta",
    isFavorite: false,
  },
  {
    id: 3,
    category: "Behind the Scenes",
    imageUrl: "https://www.shutterstock.com/image-photo/tokyo-japan-january-11th-2025-600nw-2651774543.jpg",
    date: "November 20, 2025",
    author: "Alex Chen",
    title: "Behind the Kitchen Doors: A Day in Our Chef's Life",
    description:
      "Get an exclusive glimpse into the passion, chaos, and creativity that happens behind the scenes in our bustling kitchen.",
    readMoreLink: "/blogs/kitchen-doors",
    isFavorite: false,
  },
  {
    id: 4,
    category: "Dining Tips",
    imageUrl: "https://static.vecteezy.com/system/resources/previews/048/057/833/large_2x/elegant-fine-dining-restaurant-table-setting-with-wine-glasses-white-tablecloth-and-flower-centerpiece-under-soft-ambient-lighting-photo.jpg",
    date: "December 5, 2025",
    author: "Sophia Laurent",
    title: "Elevating Your Dining Experience",
    description:
      "Expert tips on wine pairings, table etiquette, and creating the perfect ambiance for an unforgettable meal.",
    readMoreLink: "/blogs/dining-experience",
    isFavorite: false,
  },
  {
    id: 5,
    category: "Chef's Special",
    imageUrl: "https://www.escoffieronline.com/wp-content/uploads/2014/10/fine-dining-entree-grilled-lamb-50866644.jpg",
    date: "November 28, 2025",
    author: "Marco Bellini",
    title: "Chef’s Signature Creations: Innovation Meets Tradition",
    description:
      "Discover how our head chef blends classic techniques with modern twists to create unforgettable signature dishes.",
    readMoreLink: "/blogs/special-creations",
    isFavorite: false,
  },
  {
    id: 6,
    category: "Chef's Special",
    imageUrl: "https://assets.lightspeedhq.com/img/2019/07/64406e71-francisco-galarza-r9xj7bgt5aw-unsplash-min.jpg",
    date: "December 18, 2025",
    author: "Elena Moreau",
    title: "The Art of Plating: Chef's Special Presentation Secrets",
    description:
      "Go behind the final touch – how our chefs turn every dish into a visual masterpiece before it reaches your table.",
    readMoreLink: "/blogs/plating-secrets",
    isFavorite: false,
  },
  {
    id: 7,
    category: "Desserts",
    imageUrl: "https://www.foodandwine.com/thmb/uo4QMoo0aG49X4wHLxS5tlvn5TM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Lemon-EVOO-Cream-Tart-FT-RECIPE0622-4176f311b5434b9faa605aff373bb61b.jpg",
    date: "December 12, 2025",
    author: "Isabella Conti",
    title: "Irresistible Summer-Inspired Desserts",
    description:
      "Light, fruity, and creamy desserts that bring a taste of summer even in winter – perfect for ending any meal on a sweet note.",
    readMoreLink: "/blogs/summer-desserts",
    isFavorite: false,
  },
  {
    id: 8,
    category: "Desserts",
    imageUrl: "https://www.foodandwine.com/thmb/jTZ8QB-TBCbJuyA1W2ZXJxyR4Kw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/banana-pudding-FT-RECIPE0221-842a0c2384d141a08563c4e9a9dbda85.jpg",
    date: "December 22, 2025",
    author: "Luca Romano",
    title: "Decadent Layered Desserts: From Tiramisu to Trifles",
    description:
      "Explore rich, layered desserts that combine textures and flavors for the ultimate indulgent experience.",
    readMoreLink: "/blogs/layered-desserts",
    isFavorite: false,
  },
  {
    id: 9,
    category: "Breakfast",
    imageUrl: "https://unpeeledjournal.com/wp-content/uploads/2022/01/51802494456_09b5ee18fb_h.jpg",
    date: "December 8, 2025",
    author: "James Carter",
    title: "The Magic of a Perfect Breakfast Spread",
    description:
      "Start your day right with balanced, delicious breakfast ideas featuring avocado toast, fresh fruits, and perfectly cooked eggs.",
    readMoreLink: "/blogs/magic-breakfast",
    isFavorite: false,
  },
  {
    id: 10,
    category: "Breakfast",
    imageUrl: "https://thumbs.dreamstime.com/b/delicious-breakfast-spread-featuring-eggs-avocado-toast-fresh-fruits-coffee-creating-vibrant-healthy-morning-meal-359934765.jpg",
    date: "December 25, 2025",
    author: "Olivia Green",
    title: "Healthy & Hearty Breakfast Ideas for Busy Mornings",
    description:
      "Quick, nutritious breakfast recipes that fuel your day without sacrificing flavor.",
    readMoreLink: "/blogs/healthy-breakfast",
    isFavorite: false,
  },
  {
    id: 11,
    category: "Seasonal",
    imageUrl: "https://shetlandwooladventures.com/wp-content/uploads/2023/09/Autumn-Pumpkin-Soup-Recipe-Shetland-Wool-Adventures-04-1.jpg",
    date: "December 19, 2025",
    author: "Anna Petrova",
    title: "Winter Comfort Dishes: Warm Soups & Stews",
    description:
      "Cozy up with hearty seasonal recipes featuring pumpkin, root vegetables, and rich broths perfect for cold evenings.",
    readMoreLink: "/blogs/winter-comfort",
    isFavorite: false,
  },
  {
    id: 12,
    category: "Seasonal",
    imageUrl: "https://thurmontkountrykitchen.com/wp-content/uploads/2024/10/THurmontKountryKitchBlog.jpg",
    date: "December 28, 2025",
    author: "Diego Ramirez",
    title: "Holiday Seasonal Specials: Festive Flavors",
    description:
      "Celebrate the holidays with warming spices, roasted meats, and comforting classics from our seasonal menu.",
    readMoreLink: "/blogs/holiday-seasonal",
    isFavorite: false,
  },
];

export default blogPosts;
