import Images from "../assets/images/images";
import strings from "./strings";
//  category: [
//     'catFood',
//     'catMeat',
//     'catAccessories',
//     'catClothes',
//     'catSprays',
//     'catLitter',
//     'dogFood',
//     'dogMeat',
//     'dogAccessories',
//     'dogClothes',
//     'dogSprays',
//     'catTreats',
//   ]
const getCategoryItemsData =
  [
    {
      id: 'catTreats',
      price: 15,
      brand: 'premio',
      taste: 'Anti hairball',
      img: Images.premioTreatAntiHairBall(),
      dis: 'anti hair treats helpes the cat with harballs',
      category: [
        'catTreats',
        'firstRow',
      ]
    },
    {
      id: 'catTreats3',
      price: 15,
      brand: 'premio',
      taste: 'denta Chews',
      img: Images.premioTreatPillows(),
      dis: '',
      category: [
        'catTreats',
        'firstRow',
      ]
    },
    {
      id: 'catTreats4',
      price: 15,
      brand: 'premio',
      taste: 'catnip',
      img: Images.premioTreatCatnip(),
      dis: '',
      category: [
        'catTreats',
        'firstRow',
      ]
    },

    {
      id: 'catTreats5',
      price: 40,
      brand: '',
      taste: 'catBiscuts',
      img: Images.catBiscuts(),
      dis: '',
      category: [
        'catTreats',
        'firstRow',
      ]
    },
    {
      id: 'catTreats2',
      price: 15,
      brand: 'premio',
      taste: 'Anti hairball',
      img: Images.premioTreatKitten(),
      dis: 'anti hair treats helpes the cat with harballs',
      category: [
        'catTreats',
        'secondRow',
      ]
    },
    {
      id: 'toilet',
      price: 200,
      brand: 'monge',
      taste: 'rrrrrrrrrr',
      img: Images.mongeKitten(),
      dis: 'bathroom?',

      category: [
        'catToilet',
        'firstRow',
      ]

    },

    {
      id: 'DogFood1',
      price: 100,
      brand: 'monge',
      taste: 'i weee',
      img: Images.mongeKitten(),
      dis: 'Dog food fr fr fr',
      category: [
        'dogFood',
      ]
    },
    {
      id: 'DogFood2',
      price: 68,
      brand: 'wwwww',
      taste: 'meow',
      img: Images.mongeKitten(),
      dis: 'Dog food fr fr fr',
      category: [
        'dogFood',
      ]
    },
    {
      id: 'DogFood3',
      price: 545,
      brand: 'monsssge',
      taste: 'yeaaa',
      img: Images.mongeKitten(),
      dis: 'Dog food fr fr fr',
      category: [
        'dogFood',
      ]
    },
    {
      id: 'DogMeat1',
      price: 767,
      brand: 'monge',
      taste: 'i dont know',
      img: Images.mongeKitten(),
      dis: 'Dog food fr fr fr',
      category: [
        'dogMeat',
      ]
    },
    {
      id: 'dogAccessories1',
      price: 65,
      brand: 'monge',
      taste: 'i dont know',
      img: Images.mongeKitten(),
      dis: 'Dog food fr fr fr',
      category: [
        'dogAccessories',
      ]
    },




    {
      id: 'DogClothes1',
      price: 37,
      brand: 'monge',
      taste: 'i dont know',
      img: Images.mongeKitten(),
      dis: 'Dog food fr fr fr',
      category: [
        'dogClothes',
      ]
    },
    {
      id: 'DogSprays1',
      price: 46,
      brand: 'yea',
      taste: 'i dont know',
      img: Images.mongeKitten(),
      dis: 'Dog food fr fr fr',
      category: [
        'dogSprays',
      ]
    },



    {
      id: 'Fooder2s3',
      price: 100,
      brand: 'cango',
      taste: 'Beef',
      img: Images.cangoAdultLambRice(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'thirdRow',
      ]
    },
    {
      id: 'Fooder2',
      price: 100,
      brand: 'bado',
      taste: 'Chicken',
      img: Images.badoAdultChicken(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'thirdRow',
      ]
    },
    {
      id: 'Fooder23',
      price: 100,
      brand: 'bado',
      taste: 'Beef',
      img: Images.badoAdultBeef(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'thirdRow',
      ]
    },
    {
      id: 'Food1',
      price: 100,
      brand: 'drools',
      taste: 'Chicken',
      img: Images.droolsChicken(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'eigthRow',
      ]
    },
    {
      id: 'Food3',
      price: 100,
      brand: 'drools',
      taste: 'TunaSalmon',
      img: Images.droolsTunaSalmon(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'eigthRow',
      ]
    },
    {
      id: 'Food345s',
      price: 100,
      brand: 'drools',
      taste: 'OceanFish',
      img: Images.droolsCompleteOceanFish(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'eigthRow',
      ]
    },

    {
      id: 'Food2',
      price: 100,
      brand: 'drools',
      taste: 'Oceanfish',
      img: Images.droolsKittenOceanfish(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'secondRow',
      ]
    },
    {
      id: 'Foods78',
      price: 100,
      brand: 'Friskies',
      taste: 'SeaFood',
      img: Images.friskiesSeaFoodTunaSalmonWhitefishCrabShrimp(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'firstRow'
      ]
    },
    {
      id: 'Food587',
      price: 100,
      brand: 'Friskies',
      taste: 'Chicken&Salmon&Gravy',
      img: Images.FriskiesChickenSalmonGravy(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'firstRow'
      ]
    },

    {
      id: 'Food6',
      price: 100,
      brand: 'Friskies',
      taste: 'Chicken&beef&carrots&greenBeans',
      img: Images.FriskiesTenderCrunchyCombo(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'firstRow'
      ]
    },
    {
      id: 'Food100',
      price: 100,
      brand: 'Friskies',
      taste: 'beef&carrots&greenBeans',
      img: Images.FriskiesSurfinTurfin(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'firstRow'
      ]
    },
    {
      id: 'Food5',
      price: 100,
      brand: 'Friskies',
      taste: 'SeaFood',
      img: Images.FriskiesSeaFood(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'firstRow'
      ]
    },
    {
      id: 'Food566',
      price: 100,
      brand: 'Friskies',
      taste: 'hicken&Salmon&Gravy',
      img: Images.friskiesGravySwirlersChickenSalmonGravy16Pounds(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'firstRow'
      ]
    },

    {
      id: 'Food4',
      price: 100,
      brand: 'Friskies',
      taste: 'Chicken&Beef&Carrots&GreenBeans',
      img: Images.FriskiesTenderCrunchy16Pounds(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'firstRow'
      ]
    },
    {
      id: 'Food7',
      price: 100,
      brand: 'josera',
      taste: 'josera',
      img: Images.joseraKitten(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'secondRow'
      ]
    },
    {
      id: 'Food8',
      price: 100,
      brand: 'josi',
      taste: 'beef',
      img: Images.JosicatBeef(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'thirdRow'
      ]
    },
    {
      id: 'Food9',
      price: 100,
      brand: 'josi',
      taste: 'chicken',
      img: Images.josiChicken(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'thirdRow'
      ]
    },
    {
      id: 'Food10',
      price: 100,
      brand: 'mera',
      taste: 'chicken',
      img: Images.meraChicken(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'thirdRow',
      ]
    },
    {
      id: 'Food11',
      price: 100,
      brand: 'mera',
      taste: 'chicken',
      img: Images.meraSensetiveAdultChicken(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'thirdRow',
      ]
    },
    {
      id: 'Food12',
      price: 100,
      brand: 'monge',
      taste: 'beef',
      img: Images.mongeBeef(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'fourthRow',
      ]
    },
    {
      id: 'Food13',
      price: 100,
      brand: 'monge',
      taste: 'chicken',
      img: Images.mongeChicken(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'fourthRow',
      ]
    },
    {
      id: 'Food14',
      price: 100,
      brand: 'monge',
      taste: 'salmon',
      img: Images.mongeKitten(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'fourthRow',
      ]
    },
    {
      id: 'Food15',
      price: 100,
      brand: 'monge',
      taste: 'chicken',
      img: Images.mongeKittenChicken(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'secondRow',
      ]
    },
    {
      id: 'Food33',
      price: 100,
      brand: 'monge',
      taste: 'Trout',
      img: Images.mongeKittenTrout(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'secondRow',
      ]
    },
    {
      id: 'Food34',
      price: 100,
      brand: 'monge',
      taste: 'Codfish',
      img: Images.mongeSterillisedCodfish(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'fourthRow',
      ]
    },
    {
      id: 'Food16',
      price: 100,
      brand: 'monge',
      taste: 'chicken',
      img: Images.mongeSterilisedChicken(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'fourthRow',
      ]
    },
    {
      id: 'Food20',
      price: 100,
      brand: 'monge',
      taste: 'chicken',
      img: Images.moongeSterilisedTrout(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'fourthRow',
      ]
    },
    {
      id: 'Food1w7',
      price: 100,
      brand: 'ND',
      taste: 'Herring&Irange',
      img: Images.NDAdultCatFoodHerringAndIrange(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'thirdRow',
      ]
    },
    {
      id: 'Food17df',
      price: 100,
      brand: 'ND',
      taste: 'Cod&Shrimp&Pumkin&Melon',
      img: Images.NDCodShrimpPumkinCantaloupeMelon(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'thirdRow',
      ]
    },
    {
      id: 'Food18',
      price: 100,
      brand: 'pets Choice',
      taste: 'Salmon',
      img: Images.petsChoiceSalmon(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'ninthRow',
      ]
    },
    {
      id: 'Food18t',
      price: 100,
      brand: 'pets Choice',
      taste: 'Chicken&Rice',
      img: Images.petsChoiceAdultChickenRice(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'ninthRow',
      ]
    },
    {
      id: 'Food18r',
      price: 100,
      brand: 'pets Choice',
      taste: 'Lamb&Rice',
      img: Images.petsChoiceAdultLambRice(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'ninthRow',
      ]
    },
    {
      id: 'Food18e',
      price: 100,
      brand: 'pets Choice',
      taste: 'Chicken&Rice',
      img: Images.petsChoiceKittenFoodChickenRice(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'secondRow',
      ]
    },

    {
      id: 'Food20',
      price: 100,
      brand: 'Reflex',
      taste: 'Chicken&Rice',
      img: Images.ReflexAdultCatFoodChickenRice(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'sixthRow',
      ]
    },
    {
      id: 'Food21',
      price: 100,
      brand: 'Reflex',
      taste: 'Salmon&Rice',
      img: Images.ReflexAdultCatFoodSalmonRice(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'sixthRow',
      ]
    },
    {
      id: 'Food22',
      price: 100,
      brand: 'Reflex',
      taste: 'gourmet',
      img: Images.reflexAdultGourmet(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'sixthRow',
      ]
    },
    {
      id: 'Food23',
      price: 100,
      brand: 'Reflex',
      taste: 'Salmon',
      img: Images.reflexAdultSterilised(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'sixthRow',
      ]
    },
    {
      id: 'Food24',
      price: 100,
      brand: 'Reflex',
      taste: 'Lamb&Rice',
      img: Images.reflexLambRice(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'sixthRow',
      ]
    },
    {
      id: 'Food25',
      price: 100,
      brand: 'Reflex',
      taste: 'Lamb&Rice',
      img: Images.reflexMotherBabyLambRice(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'sixthRow',
      ]
    },
    {
      id: 'Food36',
      price: 100,
      brand: 'Reflex',
      taste: 'chicken&Rice',
      img: Images.reflexAdultChickenRice(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'sixthRow',
      ]
    },
    {
      id: 'Food37',
      price: 100,
      brand: 'Reflex',
      taste: 'chicken',
      img: Images.reflexKittenChicken(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'secondRow',
      ]
    },
    {
      id: 'Food38',
      price: 100,
      brand: 'Reflex',
      taste: 'Chicken',
      img: Images.reflexSterilisedChicken(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'sixthRow',
      ]
    },
    {
      id: 'Food39',
      price: 100,
      brand: 'Reflex',
      taste: 'Choosy',
      img: Images.reflexChoosy(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'sixthRow',
      ]
    },
    {
      id: 'Food40',
      price: 100,
      brand: 'Reflex',
      taste: 'Salmon',
      img: Images.reflexHairBallSalmon(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'sixthRow',
      ]
    },
    {
      id: 'Food26',
      price: 100,
      brand: 'royalCanin',
      taste: 'special',
      img: Images.royalcaninBritishShorthair(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'fifthRow',
      ]
    },
    {
      id: 'Food27',
      price: 100,
      brand: 'royalCanin',
      taste: 'specail',
      img: Images.royalcaninKitten(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'secondRow',
      ]
    },
    {
      id: 'Food28',
      price: 100,
      brand: 'royalCanin',
      taste: 'special',
      img: Images.royalcaninPersian(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'fifthRow',
      ]
    },
    {
      id: 'Food29',
      price: 100,
      brand: 'whiskas',
      taste: 'Chicken',
      img: Images.WhiskasChicken(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'thirdRow',
      ]
    },
    {
      id: 'Food30',
      price: 100,
      brand: 'laCat',
      taste: 'Chicken',
      img: Images.laCatKittenChiken(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'secondRow',
      ]
    },
    {
      id: 'Food3d034',
      price: 100,
      brand: 'laCat',
      taste: 'Chicken',
      img: Images.lacatChickenAdult(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'thirdRow',
      ]
    },
    {
      id: 'Food3d0234',
      price: 100,
      brand: 'laCat',
      taste: 'Chicken',
      img: Images.lacatKittensChicken(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'thirdRow',
      ]
    },
    {
      id: 'Food31',
      price: 100,
      brand: 'premio',
      taste: 'Salmon&Rice',
      img: Images.premioSalmonRice(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'seventhRow',
      ]
    },
    {
      id: 'Food193e',
      price: 100,
      brand: 'premio',
      taste: 'chicken',
      img: Images.premioChicken(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'seventhRow',
      ]
    },
    {
      id: 'Food129',
      price: 100,
      brand: 'premio',
      taste: 'chicken',
      img: Images.premioChickenFood(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'seventhRow',
      ]
    },
    {
      id: 'Food2419',
      price: 100,
      brand: 'premio',
      taste: 'chicken',
      img: Images.kittenChickenPremio(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'secondRow',
      ]
    },
    {
      id: 'Food41',
      price: 100,
      brand: 'royalcanin',
      taste: 'chicken',
      img: Images.royalcaninSterilisedFood(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'fifthRow',
      ]
    },
    {
      id: 'Food413ds',
      price: 100,
      brand: 'royalcanin',
      taste: 'special',
      img: Images.royalCaninMotherBabycat(),
      dis: 'doorlsChicken',
      category: [
        'catFood',
        'fifthRow',
      ]
    },
    {
      id: 'Food42',
      price: 100,
      brand: 'royalcanin',
      taste: 'special',
      img: Images.royalcaninKittenDryFood(),
      dis: '1.2kg',
      category: [
        'catFood',
        'secondRow',
      ]
    },




    {
      id: 'leash1',
      price: 200,
      brand: 'leash',
      taste: '10m',
      img: Images.mongeKitten(),
      dis: 'Leash Item 1 Description',
      category: [
        'catAccessories',
        'firstRow'
      ]
    },



    {
      id: 'clothes1',
      price: 150,
      brand: 'Kitten',
      taste: 'kitten',
      img: Images.mongeKitten(),
      dis: 'Clothes Item 1 Description',
      category: [
        'catClothes',
        'firstRow'
      ]
    },
    {
      id: 'clothes2',
      price: 80,
      brand: 'Adult',
      taste: 'adult',
      img: Images.mongeKitten(),
      dis: 'Clothes Item 1 Description',
      category: [
        'catClothes',
        'firstRow'
      ]
    },



    {
      id: 'sprays1',
      price: 10,
      brand: 'bonjor',
      taste: 'chicken',
      img: Images.mongeKitten(),
      dis: 'sprays Item 1 Description',
      category: [
        'catSprays',
        'firstRow',
      ]
    },
    {
      id: 'sprays2',
      price: 10,
      brand: 'bonjor',
      taste: 'chicken',
      img: Images.mongeKitten(),
      dis: 'sprays Item 1 Description',
      category: [
        'catSprays',
        'firstRow',
      ]
    },
    {
      id: 'sprays3',
      price: 5,
      brand: 'bonjor',
      taste: 'chicken',
      img: Images.mongeKitten(),
      dis: 'sprays Item 1 Description',
      category: [
        'catSprays',
        'firstRow',
      ]
    },

    {
      id: 'meat14',
      price: 5,
      brand: 'solo',
      taste: 'liver',
      img: Images.catSoloLiver(),
      dis: 'meaty',
      category: [
        'catMeat',
        'firstRow'
      ]

    },
    {
      id: 'meat4w',
      price: 5,
      brand: 'premio',
      taste: 'Tuna&Papaya&Gravy',
      img: Images.premioTunaPapayaGravy(),
      dis: '',
      category: [
        'catMeat',
        'fifthRow',
      ]
    },
    {
      id: 'meat4ws',
      price: 5,
      brand: 'premio',
      taste: 'Tuna&Aloevera&Gravy',
      img: Images.PremioTunaAloeveraGravy(),
      dis: '',
      category: [
        'catMeat',
        'fifthRow',
      ]
    },

    {
      id: 'meat15',
      price: 5,
      brand: 'solo',
      taste: 'rabbit',
      img: Images.catSoloRabbit(),
      dis: 'meaty',
      category: [
        'catMeat',
        'firstRow'
      ]

    },
    {
      id: 'meat16',
      price: 5,
      brand: 'solo',
      taste: 'fish',
      img: Images.catSoloFish(),
      dis: 'meaty',
      category: [
        'catMeat',
        'firstRow'
      ]

    },
    {
      id: 'meat17',
      price: 5,
      brand: 'bado',
      taste: 'Chicken',
      img: Images.badoKittenChicken(),
      dis: 'meaty',
      category: [
        'catMeat',

      ]
    },
    {
      id: 'meat18',
      price: 5,
      brand: 'bado',
      taste: 'Lamb',
      img: Images.badoLamb(),
      dis: 'meaty',
      category: [
        'catMeat',

      ]
    },
    {
      id: 'meat19',
      price: 5,
      brand: 'bado',
      taste: 'Salmon',
      img: Images.badoSalmon(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat20',
      price: 5,
      brand: 'simba',
      taste: 'Selvaggina',
      img: Images.catSimbaSelvaggina(),
      dis: 'meaty',
      category: [
        'catMeat',
        'firstRow',
      ]
    },
    {
      id: 'meat4wsw',
      price: 5,
      brand: 'simba',
      taste: 'Duck',
      img: Images.simbaDuck(),
      dis: '',
      category: [
        'catMeat',
        'firstRow',
      ]
    },
    {
      id: 'meat4wssdw',
      price: 5,
      brand: 'simba',
      taste: 'Lamb',
      img: Images.simbaLamb(),
      dis: '',
      category: [
        'catMeat',
        'firstRow',
      ]
    },
    {
      id: 'meat4wssd23w',
      price: 5,
      brand: 'simba',
      taste: 'Beef',
      img: Images.simbaBeef(),
      dis: '',
      category: [
        'catMeat',
        'firstRow',
      ]
    },
    {
      id: 'meat21',
      price: 5,
      brand: 'simba',
      taste: 'Turkey & Kidney',
      img: Images.catSimbaTurkeyKidney(),
      dis: 'meaty',
      category: [
        'catMeat',
        'firstRow',
      ]
    },
    {
      id: 'meat57',
      price: 5,
      brand: 'simba',
      taste: 'Turkey & Kidney',
      img: Images.catSimbaRabbit(),
      dis: 'meaty',
      category: [
        'catMeat',
        'firstRow',
      ]
    },
    {
      id: 'meat22wd',
      price: 8,
      brand: 'premio',
      taste: 'Tuna',
      img: Images.premioCanTuna(),
      dis: 'meaty',
      category: [
        'catMeat',
        'secondRow',
      ]
    },
    {
      id: 'meat22w23d',
      price: 8,
      brand: 'premio',
      taste: 'Chicken&Duck',
      img: Images.premioCanChickenDuck(),
      dis: 'meaty',
      category: [
        'catMeat',
        'secondRow',
      ]
    },
    {
      id: 'meat22w23dd',
      price: 8,
      brand: 'premio',
      taste: 'Salmon',
      img: Images.premioKittenCanSalmon(),
      dis: 'meaty',
      category: [
        'catMeat',
        'fourthRow',
      ]
    },
    {
      id: 'meat22w2323dd',
      price: 8,
      brand: 'premio',
      taste: 'Chicken',
      img: Images.premioKittenCanChicken(),
      dis: 'meaty',
      category: [
        'catMeat',
        'fourthRow',
      ]
    },
    {
      id: 'meat295',
      price: 5,
      brand: 'wanpy',
      taste: 'Chicken',
      img: Images.wanpyTunaChickenCarrot(),
      dis: 'meaty',
      category: [
        'catMeat',
        'sixthRow',
      ]
    },
    {
      id: 'meat29w5',
      price: 5,
      brand: 'wanpy',
      taste: 'Duck&Pumkin',
      img: Images.wanpyDuckPumkin(),
      dis: 'meaty',
      category: [
        'catMeat',
        'sixthRow',
      ]
    },
    {
      id: 'meat22',
      price: 8,
      brand: 'elizacat',
      taste: 'Beef',
      img: Images.elizacatSalmon(),
      dis: 'meaty',
      category: [
        'catMeat',
        'secondRow',
      ]
    },

    {
      id: '59',
      price: 8,
      brand: 'elizacat',
      taste: 'Beef',
      img: Images.elizacatTurkey(),
      dis: 'meaty',
      category: [
        'catMeat',
        'secondRow',
      ]
    },
    {
      id: '58',
      price: 8,
      brand: 'elizacat',
      taste: 'Beef',
      img: Images.elizacatBeef(),
      dis: 'meaty',
      category: [
        'catMeat',
        'secondRow',
      ]
    },
    {
      id: 'meat23',
      price: 8,
      brand: 'elizacat',
      taste: 'FishVegetable',
      img: Images.elizacatFishVegetable(),
      dis: 'meaty',
      category: [
        'catMeat',
        'secondRow',
      ]
    },
    {
      id: 'meat24',
      price: 5,
      brand: 'kitcat',
      taste: 'Chicken&Lamb',
      img: Images.kitcatChickenLamb(),
      dis: 'meaty',
      category: [
        'catMeat',
        'seventhRow',
      ]
    },
    {
      id: 'meat25',
      price: 5,
      brand: 'kitcat',
      taste: 'Tuna&Anchovy',
      img: Images.kitcatTunaAnchovy(),
      dis: 'meaty',
      category: [
        'catMeat',
        'seventhRow',
      ]
    },
    {
      id: 'meat26',
      price: 8,
      brand: 'lacat',
      taste: 'Chicken',
      img: Images.lacatChicken(),
      dis: 'meaty',
      category: [
        'catMeat',
        'secondRow',
      ]
    },
    {
      id: 'meat27',
      price: 8,
      brand: 'lacat',
      taste: 'Duck&Turkey',
      img: Images.lacatDuckTurkey(),
      dis: 'meaty',
      category: [
        'catMeat',
        'secondRow',
      ]
    },
    {
      id: 'meat28',
      price: 8,
      brand: 'lacat',
      taste: 'Salmon',
      img: Images.lacatSalmon(),
      dis: 'meaty',
      category: [
        'catMeat',
        'secondRow',
      ]
    },
    {
      id: 'meat29',
      price: 8,
      brand: 'lacat',
      taste: 'Salmon&Cod',
      img: Images.lacatSalmonCod(),
      dis: 'meaty',
      category: [
        'secondRow',
        'catMeat',
      ]
    },
    {
      id: 'meat1',
      price: 5,
      brand: 'premio',
      taste: 'Beef',
      img: Images.premioDeliCatBeef(),
      dis: 'meaty',
      category: [
        'catMeat',
        'thirdRow',
      ]

    },
    {
      id: 'meat2',
      price: 5,
      brand: 'premio',
      taste: 'Beef&Liver',
      img: Images.premioDeliCatBeefLiver(),
      dis: 'meaty',
      category: [
        'catMeat', 'fourthRow',
      ]

    },
    {
      id: 'meat4',
      price: 5,
      brand: 'premio',
      taste: 'chicken',
      img: Images.premioDeliCatChicken(),
      dis: 'meaty',
      category: [
        'catMeat', 'thirdRow',
      ]

    },
    {
      id: 'meat5',
      price: 5,
      brand: 'premio',
      taste: 'chicken&Carrots&Milk',
      img: Images.premioDeliCatChickenCarrotsMilk(),
      dis: 'meaty',
      category: [
        'catMeat', 'fourthRow',
      ]

    },
    {
      id: 'meat6',
      price: 5,
      brand: 'premio',
      taste: 'chicken&Duck&Vegetables',
      img: Images.premioDeliCatChickenDuckVegetables(),
      dis: 'meaty',
      category: [
        'catMeat', 'thirdRow',
      ]

    },
    {
      id: 'meat7',
      price: 5,
      brand: 'premio',
      taste: 'chicken&Herbs',
      img: Images.premioDeliCatChickenHerbs(),
      dis: 'meaty',
      category: [
        'catMeat', 'thirdRow',
      ]

    },
    {
      id: 'meat8',
      price: 5,
      brand: 'premio',
      taste: 'chickenLiver',
      img: Images.premioDeliCatChickenLiver(),
      dis: 'meaty',
      category: [
        'catMeat', 'fourthRow',
      ]

    },
    {
      id: 'meat9',
      price: 5,
      brand: 'premio',
      taste: 'Lamb',
      img: Images.premioDeliCatLamb(),
      dis: 'meaty',
      category: [
        'catMeat',
        'thirdRow',
      ]

    },
    {
      id: 'meat10',
      price: 5,
      brand: 'premio',
      taste: 'SalmonTrout',
      img: Images.premioDeliCatSalmonTrout(),
      dis: 'meaty',
      category: [
        'catMeat',
        'thirdRow',
      ]

    },
    {
      id: 'meat11',
      price: 5,
      brand: 'premio',
      taste: 'Trout',
      img: Images.premioDeliCatTrout(),
      dis: 'meaty',
      category: [
        'catMeat',
        'thirdRow',
      ]

    },
    {
      id: 'meat12',
      price: 5,
      brand: 'premio',
      taste: 'Whitefish&Caroots',
      img: Images.premioDeliCatWhitefishCarrots(),
      dis: 'meaty',
      category: [
        'catMeat',
        'fourthRow',
      ]

    },
    {
      id: 'meat13',
      price: 5,
      brand: 'premio',
      taste: 'Salmon',
      img: Images.premioDelicCatSalmon(),
      dis: 'meaty',
      category: [
        'catMeat',
        'thirdRow',
      ]

    },
    {
      id: 'meat30',
      price: 5,
      brand: 'monge',
      taste: 'Anchovies',
      img: Images.mongeAnchovies(),
      dis: 'meaty',
      category: [
        'catMeat',

      ]
    },
    {
      id: 'meat31',
      price: 5,
      brand: 'monge',
      taste: 'Boar',
      img: Images.mongeBoar(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat32',
      price: 5,
      brand: 'nuevo',
      taste: 'Beef',
      img: Images.nuevocanBeef(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat33',
      price: 5,
      brand: 'nuevo',
      taste: 'Chicken&Beef',
      img: Images.nuevoChickenBeef(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat34',
      price: 5,
      brand: 'nuevo',
      taste: 'Salmon&Carrots',
      img: Images.nuevoSalmonCarrots(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat35',
      price: 5,
      brand: 'nuevo',
      taste: 'Turkey & Tuna & Catnip',
      img: Images.nuevoTurkeyTunaCatnip(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat36',
      price: 5,
      brand: 'premio',
      taste: 'Beef',
      img: Images.premiobagDelicatBeef(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat38',
      price: 5,
      brand: 'premio',
      taste: 'Chicken',
      img: Images.premiobagDelicatChicken(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat39',
      price: 5,
      brand: 'premio',
      taste: 'Salmon',
      img: Images.premiobagDelicatSalmon(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat40',
      price: 5,
      brand: 'premio',
      taste: 'Chicken',
      img: Images.premioCanChiken(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat41',
      price: 5,
      brand: 'premio',
      taste: 'Salmon',
      img: Images.premioCanSalmon(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat42',
      price: 5,
      brand: 'premio',
      taste: 'Chicken&Mutton',
      img: Images.premioChickenMutton(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat43',
      price: 5,
      brand: 'premio',
      taste: 'Chicken',
      img: Images.premioDelicatKittenChicken(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat44',
      price: 5,
      brand: 'premio',
      taste: 'Liver',
      img: Images.premioDelicatLiver(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat45',
      price: 5,
      brand: 'premio',
      taste: 'Salmon',
      img: Images.PremioDelicatSalmon(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat46',
      price: 5,
      brand: 'premio',
      taste: 'Chicken',
      img: Images.premiobagDelicatChicken(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat47',
      price: 5,
      brand: 'premio',
      taste: 'Tuna&Aloevera',
      img: Images.premioTunaAloevera(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat48',
      price: 5,
      brand: 'premio',
      taste: 'Tuna&Papaya',
      img: Images.premioTunaPapaya(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat49',
      price: 7,
      brand: 'schesir',
      taste: 'Chicken',
      img: Images.schesirChicken(),
      dis: 'meaty',
      category: [
        'catMeat',
        'fifthRow',
      ]
    },
    {
      id: 'meat57',
      price: 7,
      brand: 'schesir',
      taste: 'Chicken',
      img: Images.schesirChickenPineapple(),
      dis: 'meaty',
      category: [
        'catMeat',
        'fifthRow',
      ]
    },
    {
      id: 'meat58',
      price: 7,
      brand: 'schesir',
      taste: 'Chicken',
      img: Images.schesirTuna(),
      dis: 'meaty',
      category: [
        'catMeat',
        'fifthRow',
      ]
    },

    {
      id: 'meat52',
      price: 7,
      brand: 'schesir',
      taste: 'Tuna&Mahi',
      img: Images.schesirTunaMahi(),
      dis: 'meaty',
      category: [
        'catMeat',
        'fifthRow',
      ]
    },

    {
      id: 'meat53',
      price: 5,
      brand: 'simba',
      taste: 'Meat',
      img: Images.simbaMeat(),
      dis: 'meaty',
      category: [
        'catMeat',

      ]
    },
    {
      id: 'meat54',
      price: 5,
      brand: 'simba',
      taste: 'Rabiit',
      img: Images.simbaRabbit(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat55',
      price: 5,
      brand: 'simba',
      taste: 'Turkey',
      img: Images.simbaTurkey(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },
    {
      id: 'meat56',
      price: 5,
      brand: 'whiskas',
      taste: 'Salmon',
      img: Images.whiskasSalmon(),
      dis: 'meaty',
      category: [
        'catMeat',
      ]
    },

  ]

export const rowTitlesByCategory = {
  catFood: [
    "Friskies",
    'Kittens',
    '',
    'monge',
    'royal canin',
    'reflex',
    'premio',
    'drools',
    'petsChoice',

  ],
  catMeat: [
    `3 = 10${strings.priceTag}`,
    `3 = 20 ${strings.priceTag}`,
    `3 = 10 ${strings.priceTag}`,
    ` Kitten 3 = 10 ${strings.priceTag}`,
  ],
  catTreats: [
    '',
    'Kittens',
  ]
}


export default getCategoryItemsData;
