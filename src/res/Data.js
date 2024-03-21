import Images from "../assets/images/images";

const getCategoryItemsData = () => {

  const getFoodItems = () => [
    {
      id: 'Food1',
      price: 100,
      brand: 'monge',
      taste: 'salmon',
      img: Images.mongeKitten(),
      dis: 'blah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blahblah blah blah blah',
    },
    {
      id: 'Food2',
      price: 525,
      brand: 'monge',
      taste: 'salmon',
      img: Images.mongeKitten(),
      dis: 'blah blah blah blahblah blah blah blah',
    },
    {
      id: 'Food3',
      price: 622,
      brand: 'monge',
      taste: 'salmon',
      img: Images.mongeKitten(),
      dis: 'blah blah blah blahblah blah blah blahblah blah blah blah',
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
