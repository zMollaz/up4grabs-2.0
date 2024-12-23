const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const main = async () => {
  console.log("Seeding started!!");

  await prisma.user.createMany({
    data: [
      { name: "Bobby", email: "bobby@gmail.com", password: "password" },
      { name: "Yewande", email: "yewande@gmail.com", password: "password" },
      { name: "Merl", email: "merl@gmail.com", password: "password" },
      { name: "Royal", email: "royal@gmail.com", password: "password" },
      { name: "Capozzi", email: "capozzi@gmail.com", password: "password" },
      { name: "Fanchette", email: "fanchette@gmail.com", password: "password" },
      { name: "Adeline", email: "adeline@gmail.com", password: "password" },
      { name: "Morissa", email: "morissa@gmail.com", password: "password" },
      { name: "Colet", email: "colet@gmail.com", password: "password" },
      { name: "Pierette", email: "pierette@gmail.com", password: "password" },
      { name: "Sanson", email: "sanson@gmail.com", password: "password" },
      { name: "Kelvin", email: "kelvin@gmail.com", password: "password" },
    ],
    skipDuplicates: false,
  });

  await prisma.categories.createMany({
    data: [
      { category: "Furniture" },
      { category: "Toys/Games" },
      { category: "Electronics" },
      { category: "Home Appliances" },
      { category: "Books" },
    ],
    skipDuplicates: true, //
  });

  await prisma.listings.createMany({
    data: [
      {
        user_id: "cl1urrhvl0000sdk1rzfgafx2",
        category_id: 1,
        title: "Eagan Multipanel Mirror",
        description:
          "Iron metal frame with a bronze finish; enhanced with metal rosettes. Mounts vertically or horizontally; mounting hardware is included. Star detailing at each intersection.",
        img_src: "https://i.ibb.co/1QQ8w8K/multipanel-mirror2-0.jpg",
        start_date: "2025-05-10",
        end_date: "2025-06-08",
        postal_code: "L5B",
      },

      {
        user_id: "cl1urrhvl0000sdk1rzfgafx2",
        category_id: 2,
        title: "Zombie Tsunami Game",
        description:
          "Bought this for my kids, but sadly they don’t really play with it anymore. Thought I’d give it away. Details… you’re trapped inside an amusement park with the janitor-turned-zombie, but the only way out is find a key in the dark, spooky shed. But be careful! At any moment you could get zombified! If you do become a zombie, you’ll be on a new team–go after other players until you catch them all!",
        img_src: "https://i.ibb.co/MfHR8C7/zombie.jpg",
        start_date: "2025-04-09",
        end_date: "2025-06-28",
        postal_code: "M2N",
      },

      {
        user_id: "cl1urrhvl0000sdk1rzfgafx2",
        category_id: 3,
        title: "Brother - Printer",
        description:
          "Unopened. Bought for the home office, but ended up never using. Black and white print only. Well reviewed, great little all in one setup. Model: DCP-L254DW",
        img_src: "https://i.ibb.co/QHz2sHf/printer.jpg",
        start_date: "2025-03-09",
        end_date: "2025-06-05",
        postal_code: "L4Z",
      },

      {
        user_id: "cl1urrhvl0000sdk1rzfgafx2",
        category_id: 4,
        title: "Tea Kettle Stainless Steel",
        description:
          "Revere Ware Whistling Tea Kettle Polished Stainless Steel Classic Design Large 2.5 Qt.",
        img_src: "https://i.ibb.co/ZSTm0b0/tea-kettle-vintage.webp",
        start_date: "2025-04-29",
        end_date: "2025-07-01",
        postal_code: "L5B",
      },

      {
        user_id: "cl1urrhvl0000sdk1rzfgafx2",
        category_id: 5,
        title: "Toni Morrison - The Bluest Eye",
        description:
          "A powerful examination of our obsession with beauty and conformity, this first novel asks powerful questions about race, class, and gender with the subtlety and grace that have always characterized her writing.",
        img_src: "https://i.ibb.co/hYWKDyk/Toni-Morrison.jpg",
        start_date: "2025-05-21",
        end_date: "2025-06-03",
        postal_code: "M2N",
      },

      {
        user_id: "cl1urrhvl0000sdk1rzfgafx2",
        category_id: 1,
        title: "Vintage TV Shelf",
        description:
          "Vintage wall unit from 1970 in excellent condition. Two piece wall unit, six shelves, one light up glass cabinet, three drawers, and a liquor cabinet Holds a 32 inch TV.",
        img_src: "https://i.ibb.co/9Nj1nPn/tv-shelf.jpg",
        start_date: "2025-05-02",
        end_date: "2025-07-27",
        postal_code: "M2N",
      },

      {
        user_id: "cl1urrhvl0000sdk1rzfgafx2",
        category_id: 2,
        title: "18ft. Single Water Slide",
        description:
          "Easy set-up 18 water slide for a smoother, longer, faster, wetter ride. Includes One 18 ft. Water Slide and One Surf Rider Inflatable. Slide: 18 ft. / 5.49 m, Rider inflated: 22 in. x 12 in. / 56 cm x 30 cm x 10 cm. Ages 5 to 12.",
        img_src: "https://i.ibb.co/mCCMBj8/water-slide.jpg",
        start_date: "2025-03-05",
        end_date: "2025-06-15",
        postal_code: "L4Z",
      },

      {
        user_id: "cl1urrhvl0000sdk1rzfgafx2",
        category_id: 3,
        title: '26" flatscreen TV',
        description:
          "The TV is 6/10 condition , it has a small spot in the right corner where you can see some colour fade, I don’t have a remote for it, and it no longer connects to Wi-Fi, It’s basically good for a spare room only; the TV is from like 2014 I’m not sure the exact model, it was one of the original Samsung Smart TV’s.",
        img_src: "https://i.ibb.co/44ZNcLv/samgsung-tv.jpg",
        start_date: "2025-05-09",
        end_date: "2025-06-26",
        postal_code: "M2N",
      },

      {
        user_id: "cl1urrhvl0000sdk1rzfgafx2",
        category_id: 4,
        title: "Microwave Oven",
        description:
          "Samsung 28 L Convection Microwave Oven, Fast preheat and 4 cooking stages. Triple Heating System: Trio convection increases efficiency with three distinct heating sources. Power: 1250 watts; Operating voltage: 230 volts.",
        img_src: "https://i.ibb.co/4F4jQ3h/microwave-oven.jpg",
        start_date: "2025-01-31",
        end_date: "2025-05-29",
        postal_code: "M2N",
      },

      {
        user_id: "cl1urrhvl0000sdk1rzfgafx2",
        category_id: 5,
        title: "The Fault in Our Stars",
        description:
          "The Fault in Our Stars book by John Green, Hard Cover, great condition.",
        img_src: "https://i.ibb.co/jzQ32z1/John-Green-Books.jpg",
        start_date: "2025-04-04",
        end_date: "2025-06-16",
        postal_code: "M2N",
      },

      {
        user_id: "cl1urrhvl0001sdk1lqa2bndu",
        category_id: 1,
        title: "Outdoor Dinning Table",
        description:
          "We’re moving and want to give this away. We have a rectangle patio table with glass tabletop and 4 stackable chairs. The dimensions of the table are 45.5 inches in width by 35.5 inches in length by 28 inches in height.",
        img_src: "https://i.ibb.co/DVX6bFR/outdoor-dining-table.jpg",
        start_date: "2025-05-02",
        end_date: "2025-06-04",
        postal_code: "M6K",
      },

      {
        user_id: "cl1urrhvl0001sdk1lqa2bndu",
        category_id: 2,
        title: "R/C Monster Truck",
        description:
          "The Monster Jam MEGA El Toro RC is the ultimate monster for kids aged 4 and up. Requires 2 AAA batteries (not included) for the remote control. Dimensions (Overall): 17.5 Inches (H) x 28.5 Inches (W) x 18.6 Inches (D).",
        img_src: "https://i.ibb.co/h2DMDhr/spin-master.jpg",
        start_date: "2025-03-08",
        end_date: "2025-07-01",
        postal_code: "M6K",
      },

      {
        user_id: "cl1urrhvl0001sdk1lqa2bndu",
        category_id: 3,
        title: "Industrial Flashlight",
        description:
          "Small and compact, this general purpose flashlight is suitable for use in personal applications ranging from reading books and maps, to searching through crawlspaces and storage units. Requires AA batteries.",
        img_src: "https://i.ibb.co/9HjbBpt/flashlight.jpg",
        start_date: "2025-02-01",
        end_date: "2025-07-08",
        postal_code: "M6K",
      },

      {
        user_id: "cl1urrhvl0001sdk1lqa2bndu",
        category_id: 4,
        title: "Metal Toaster",
        description:
          "Dualit's 3 slice Vario toaster can toast up to three slices of bread at a time, with the option to heat only 2 slots if necessary. Materials: Cast aluminium ends, stainless steel body.",
        img_src: "https://i.ibb.co/sqhKnBM/toaster.jpg",
        start_date: "2025-02-02",
        end_date: "2025-08-06",
        postal_code: "M6K",
      },

      {
        user_id: "cl1urrhvl0001sdk1lqa2bndu",
        category_id: 5,
        title: "Daniell Steele Books",
        description:
          "12 Danielle Steel books up for grabs. If you’re not familiar, Steel an American writer, best known for her romance novels. She is the bestselling author alive and the fourth-bestselling fiction author of all time, with over 800 million copies sold.",
        img_src: "https://i.ibb.co/Ttk72DM/Danielle-Steel-Books.jpg",
        start_date: "2025-03-03",
        end_date: "2025-08-29",
        postal_code: "M6K",
      },

      {
        user_id: "cl1urrhvl0001sdk1lqa2bndu",
        category_id: 1,
        title: "Antique Chairs",
        description:
          "6 Antique Victorian Needlepoint Chair. All in tack and no fraying on fabric or chips on wood. Sits fine and lots of life left in it, but slight scuff on the one arm, and seat is a bit sunken as seen in pictures.",
        img_src: "https://i.ibb.co/rw8Lq4R/antique-chairs.jpg",
        start_date: "2025-04-05",
        end_date: "2025-07-02",
        postal_code: "M6K",
      },

      {
        user_id: "cl1urrhvl0001sdk1lqa2bndu",
        category_id: 2,
        title: "Rubber ducks",
        description:
          "5 soft rubber ducks. Easy-to-hold for tiny hands. Multi-purpose play value. Easy to wipe clean. BPA-Free",
        img_src: "https://i.ibb.co/dKbGQXk/rubber-ducks-2-0.jpg",
        start_date: "2025-05-04",
        end_date: "2025-08-30",
        postal_code: "M6K",
      },

      {
        user_id: "cl1urrhvl0001sdk1lqa2bndu",
        category_id: 3,
        title: "Apple Keyboard",
        description:
          "This is a 2015 Apple Magic Keyboard in excellent working condition with one issue: there is a bit of a bend on the right-bottom of the keyboard. Bluetooth-enabled Mac computer with OS X v10.11 or later. iOS devices running iOS 9.1 or later. Height: 0.16–0.43 inch (0.41–1.09 cm) Width: 10.98 inches (27.9 cm).",
        img_src: "https://i.ibb.co/51tntRT/apple-keyboard2.jpg",
        start_date: "2025-03-07",
        end_date: "2025-06-25",
        postal_code: "M6K",
      },

      {
        user_id: "cl1urrhvl0001sdk1lqa2bndu",
        category_id: 4,
        title: "Air Purifier",
        description:
          "Bionaire 99.99% True HEPA Mini Tower Air Purifier with Allergy Plus Filter Operates quietly to help remove up to 99.99% of airborne allergens such as pollen, dust, mold spores, pet dander and smoke to provide relief from irritants in the air. True HEPA filtration captures and traps particles as small as 0.3 microns so you can breathe comfortably.Filters included.",
        img_src: "https://i.ibb.co/s9WMRS9/air-purifier-2.jpg",
        start_date: "2025-01-30",
        end_date: "2025-07-12",
        postal_code: "M6K",
      },

      {
        user_id: "cl1urrhvl0001sdk1lqa2bndu",
        category_id: 5,
        title: "Misc Books",
        description:
          "Books from Kate Hewitt, Jen Sincero, and Delia Owens. Soft Covers, great condition.",
        img_src: "https://i.ibb.co/8PLzjhs/Misc-Books.jpg",
        start_date: "2025-02-10",

        end_date: "2025-06-05",
        postal_code: "M6K",
      },
    ],
    skipDuplicates: true,
  });

  // await prisma.biddings.createMany({
  //   data: [
  //     { user_id: 1, listing_id: 20 },
  //     { user_id: 1, listing_id: 19 },
  //     { user_id: 1, listing_id: 18 },
  //     { user_id: 2, listing_id: 5 },
  //     { user_id: 2, listing_id: 4 },
  //     { user_id: 2, listing_id: 3 },
  //   ],
  //   skipDuplicates: true,
  // });

  console.log("Seeding done!!");
};

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
