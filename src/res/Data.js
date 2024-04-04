import Images from "../assets/images/images";

const getCategoryItemsData = () => {

  const getDogFoodItems = () => [

    {
      id: 'DogFood1',
      price: 100,
      brand: 'ffff',
      taste: 'i weee',
      img: Images.mongeKitten(),
      dis: 'Dog food fr fr fr',
    },
    {
      id: 'DogFood2',
      price: 68,
      brand: 'wwwww',
      taste: 'meow',
      img: Images.mongeKitten(),
      dis: 'Dog food fr fr fr',
    },
    {
      id: 'DogFood3',
      price: 545,
      brand: 'monsssge',
      taste: 'yeaaa',
      img: Images.mongeKitten(),
      dis: 'Dog food fr fr fr',
    },


  ]
  const getDogMeatItems = () => [
    {
      id: 'DogMeat1',
      price: 767,
      brand: 'monge',
      taste: 'i dont know',
      img: Images.mongeKitten(),
      dis: 'Dog food fr fr fr',
    },



  ]
  const getDogLeashItems = () => [
    {
      id: 'DogLeash1',
      price: 65,
      brand: 'monge',
      taste: 'i dont know',
      img: Images.mongeKitten(),
      dis: 'Dog food fr fr fr',
    },



  ]
  const getDogClothesItems = () => [
    {
      id: 'DogClothes1',
      price: 37,
      brand: 'monge',
      taste: 'i dont know',
      img: Images.mongeKitten(),
      dis: 'Dog food fr fr fr',
    },



  ]
  const getDogSpraysItems = () => [
    {
      id: 'DogSprays1',
      price: 46,
      brand: 'yea',
      taste: 'i dont know',
      img: Images.mongeKitten(),
      dis: 'Dog food fr fr fr',
    },



  ]
  const getFoodItems = () => [
    {
      id: 'Food1',
      price: 100,
      brand: 'drools',
      taste: 'Chicken',
      img: Images.droolsChicken(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food2',
      price: 100,
      brand: 'drools',
      taste: 'Oceanfish',
      img: Images.droolsKittenOceanfish(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food3',
      price: 100,
      brand: 'drools',
      taste: 'TunaSalmon',
      img: Images.droolsTunaSalmon(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food4',
      price: 100,
      brand: 'Friskies',
      taste: 'Chicken&Salmon&Gravy',
      img: Images.FriskiesChickenSalmonGravy(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food5',
      price: 100,
      brand: 'Friskies',
      taste: 'SeaFood',
      img: Images.FriskiesSeaFood(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food6',
      price: 100,
      brand: 'Friskies',
      taste: 'beef&carrots&greenBeans',
      img: Images.FriskiesTenderCrunchyCombo(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food7',
      price: 100,
      brand: 'josera',
      taste: 'josera',
      img: Images.joseraKitten(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food8',
      price: 100,
      brand: 'josi',
      taste: 'beef',
      img: Images.JosicatBeef(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food9',
      price: 100,
      brand: 'josi',
      taste: 'chicken',
      img: Images.josiChicken(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food10',
      price: 100,
      brand: 'mera',
      taste: 'chicken',
      img: Images.meraChicken(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food11',
      price: 100,
      brand: 'mera',
      taste: 'chicken',
      img: Images.meraSensetiveAdultChicken(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food12',
      price: 100,
      brand: 'monge',
      taste: 'beef',
      img: Images.mongeBeef(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food13',
      price: 100,
      brand: 'monge',
      taste: 'chicken',
      img: Images.mongeChicken(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food14',
      price: 100,
      brand: 'monge',
      taste: 'salmon',
      img: Images.mongeKitten(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food15',
      price: 100,
      brand: 'monge',
      taste: 'chicken',
      img: Images.mongeKittenChicken(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food16',
      price: 100,
      brand: 'monge',
      taste: 'chicken',
      img: Images.mongeSterilisedChicken(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food17',
      price: 100,
      brand: 'ND',
      taste: 'Herring&Irange',
      img: Images.NDAdultCatFoodHerringAndIrange(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food18',
      price: 100,
      brand: 'pets Choice',
      taste: 'Salmon',
      img: Images.petsChoiceSalmon(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food19',
      price: 100,
      brand: 'premio',
      taste: 'chicken',
      img: Images.premioChicken(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food20',
      price: 100,
      brand: 'Reflex',
      taste: 'Chicken&Rice',
      img: Images.ReflexAdultCatFoodChickenRice(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food21',
      price: 100,
      brand: 'Reflex',
      taste: 'Salmon&Rice',
      img: Images.ReflexAdultCatFoodSalmonRice(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food22',
      price: 100,
      brand: 'Reflex',
      taste: 'gourmet',
      img: Images.reflexAdultGourmet(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food23',
      price: 100,
      brand: 'Reflex',
      taste: 'Salmon',
      img: Images.reflexAdultSterilised(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food24',
      price: 100,
      brand: 'Reflex',
      taste: 'Lamb&Rice',
      img: Images.reflexLambRice(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food25',
      price: 100,
      brand: 'Reflex',
      taste: 'Lamb&Rice',
      img: Images.reflexMotherBabyLambRice(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food26',
      price: 100,
      brand: 'royalCanin',
      taste: 'special',
      img: Images.royalcaninBritishShorthair(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food27',
      price: 100,
      brand: 'royalCanin',
      taste: 'specail',
      img: Images.royalcaninKitten(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food28',
      price: 100,
      brand: 'royalCanin',
      taste: 'special',
      img: Images.royalcaninPersian(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food29',
      price: 100,
      brand: 'whiskas',
      taste: 'Chicken',
      img: Images.WhiskasChicken(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food30',
      price: 100,
      brand: 'laCat',
      taste: 'Chicken',
      img: Images.laCatKittenChiken(),
      dis: 'doorlsChicken',
    },
    {
      id: 'Food31',
      price: 100,
      brand: 'premio',
      taste: 'Salmon&Rice',
      img: Images.premioSalmonRice(),
      dis: 'doorlsChicken',
    },


  ];
  const getLeashItems = () => [
    {
      id: 'leash1',
      price: 200,
      brand: 'royal canin',
      taste: 'salmon',
      img: Images.mongeKitten(),
      dis: 'Leash Item 1 Description',
    },

  ];
  const getClothesItems = () => [
    {
      id: 'clothes1',
      price: 150,
      brand: 'bonjor',
      taste: 'chicken',
      img: Images.mongeKitten(),
      dis: 'Clothes Item 1 Description',
    },
    {
      id: 'clothes2',
      price: 80,
      brand: 'a shirt',
      taste: 'chicken',
      img: Images.mongeKitten(),
      dis: 'Clothes Item 1 Description',
    },

  ];
  const getSprayItems = () => [
    {
      id: 'sprays1',
      price: 160,
      brand: 'bonjor',
      taste: 'chicken',
      img: Images.mongeKitten(),
      dis: 'sprays Item 1 Description',
    },
    {
      id: 'sprays2',
      price: 180,
      brand: 'bonjor',
      taste: 'chicken',
      img: Images.mongeKitten(),
      dis: 'sprays Item 1 Description',
    },
    {
      id: 'sprays3',
      price: 170,
      brand: 'bonjor',
      taste: 'chicken',
      img: Images.mongeKitten(),
      dis: 'sprays Item 1 Description',
    },



  ];
  const getMeatItems = () => [
    {
      id: 'meat2',
      price: 180,
      brand: 'Premio',
      taste: 'Beef',
      img: Images.premioDeliCatBeef(),
      dis: 'meaty',

    },
    {
      id: 'meat3',
      price: 180,
      brand: 'Premio',
      taste: 'Beef&Liver',
      img: Images.premioDeliCatBeefLiver(),
      dis: 'meaty',

    },
    {
      id: 'meat4',
      price: 180,
      brand: 'Premio',
      taste: 'chicken',
      img: Images.premioDeliCatChicken(),
      dis: 'meaty',

    },
    {
      id: 'meat5',
      price: 180,
      brand: 'Premio',
      taste: 'chicken&Carrots&Milk',
      img: Images.premioDeliCatChickenCarrotsMilk(),
      dis: 'meaty',


    },
    {
      id: 'meat6',
      price: 180,
      brand: 'bonjor',
      taste: 'chicken&Duck&Vegetables',
      img: Images.premioDeliCatChickenDuckVegetables(),
      dis: 'meaty',


    },
    {
      id: 'meat7',
      price: 180,
      brand: 'Premio',
      taste: 'chicken&Herbs',
      img: Images.premioDeliCatChickenHerbs(),
      dis: 'meaty',


    },
    {
      id: 'meat8',
      price: 180,
      brand: 'Premio',
      taste: 'chickenLiver',
      img: Images.premioDeliCatChickenLiver(),
      dis: 'meaty',


    },
    {
      id: 'meat9',
      price: 180,
      brand: 'Premio',
      taste: 'Lamb',
      img: Images.premioDeliCatLamb(),
      dis: 'meaty',


    },
    {
      id: 'meat10',
      price: 180,
      brand: 'Premio',
      taste: 'SalmonTrout',
      img: Images.premioDeliCatSalmonTrout(),
      dis: 'meaty',


    },
    {
      id: 'meat11',
      price: 180,
      brand: 'Premio',
      taste: 'Trout',
      img: Images.premioDeliCatTrout(),
      dis: 'meaty',


    },
    {
      id: 'meat12',
      price: 180,
      brand: 'Premio',
      taste: 'Whitefish&Caroots',
      img: Images.premioDeliCatWhitefishCarrots(),
      dis: 'meaty',


    },
    {
      id: 'meat13',
      price: 180,
      brand: 'Premio',
      taste: 'Salmon',
      img: Images.premioDelicCatSalmon(),
      dis: 'meaty',


    },
  ]
  const getCategoryItems = (category) => {
    switch (category) {
      case 'Food':
        return getFoodItems();
      case 'Leash':
        return getLeashItems();
      case 'Clothes':
        return getClothesItems();
      case 'Sprays':
        return getSprayItems();
      case 'Meat':
        return getMeatItems();
      case 'dogFood':
        return getDogFoodItems();
      case 'dogMeat':
        return getDogMeatItems();
      case 'dogLeash':
        return getDogLeashItems();
      case 'dogClothes':
        return getDogClothesItems();
      case 'dogSprays':
        return getDogSpraysItems();
      default:
        return [];
    }
  };

  return { getCategoryItems };
};

export default getCategoryItemsData;
