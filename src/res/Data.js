import Images from "../assets/images/images";

const getCategoryItemsData = () => {

  const getFoodItems = () => [
    {
      id: 'Food1',
      price: 100,
      brand: 'monge',
      taste: 'salmon',
      img: Images.mongeKitten(),
      dis: 'Food Item 1 Description',
    },
    {
      id: 'Food2',
      price: 525,
      brand: 'monge',
      taste: 'salmon',
      img: Images.mongeKitten(),
      dis: 'Food Item 1 Description',
    },
    {
      id: 'Food3',
      price: 622,
      brand: 'monge',
      taste: 'salmon',
      img: Images.mongeKitten(),
      dis: 'Food Item 1 Description',
    },
    {
      id: 'Food4',
      price: 10120,
      brand: 'monge',
      taste: 'salmon',
      img: Images.mongeKitten(),
      dis: 'Food Item 1 Description',
    },
    {
      id: 'Food5',
      price: 142400,
      brand: 'monge',
      taste: 'salmon',
      img: Images.mongeKitten(),
      dis: 'Food Item 1 Description',
    },
    {
      id: 'Food6',
      price: 1040,
      brand: 'monge',
      taste: 'salmon',
      img: Images.mongeKitten(),
      dis: 'Food Item 1 Description',
    },
    {
      id: 'Food7',
      price: 100542,
      brand: 'monge',
      taste: 'salmon',
      img: Images.mongeKitten(),
      dis: 'Food Item 1 Description',
    },
    {
      id: 'Food8',
      price: 45,
      brand: 'monge',
      taste: 'salmon',
      img: Images.mongeKitten(),
      dis: 'Food Item 1 Description',
    },
    {
      id: 'Food9',
      price: 54,
      brand: 'monge',
      taste: 'salmon',
      img: Images.mongeKitten(),
      dis: 'Food Item 1 Description',
    },
    {
      id: 'Food10',
      price: 78,
      brand: 'monge',
      taste: 'salmon',
      img: Images.mongeKitten(),
      dis: 'Food Item 1 Description',
    },
    {
      id: 'Food11',
      price: 54,
      brand: 'monge',
      taste: 'salmon',
      img: Images.mongeKitten(),
      dis: 'Food Item 1 Description',
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

  ];


  const getSprayItems = () => [
    {
      id: 'sprays1',
      price: 150,
      brand: 'bonjor',
      taste: 'chicken',
      img: Images.mongeKitten(),
      dis: 'sprays Item 1 Description',
    },
    {
      id: 'sprays2',
      price: 150,
      brand: 'bonjor',
      taste: 'chicken',
      img: Images.mongeKitten(),
      dis: 'sprays Item 1 Description',
    },

  ];


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
      default:
        return [];
    }
  };

  return { getCategoryItems };
};

export default getCategoryItemsData;
