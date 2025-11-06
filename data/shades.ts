export interface Shade {
  id: string;
  productName: string;
  shadeName: string;
  color: string; // hex code
  brand: string;
  price: number;
}

export interface ShadeCategory {
  name: 'Foundation' | 'Lipstick' | 'Blush';
  shades: Shade[];
}

export const shadeCollection: ShadeCategory[] = [
  {
    name: 'Foundation',
    shades: [
      // --- Make Over ---
      { id: 'mo-f1', brand: 'Make Over', productName: 'Powerstay Liquid Foundation', shadeName: 'W12 Warm Marble', color: '#F9EFE2', price: 127200 },
      { id: 'mo-f2', brand: 'Make Over', productName: 'Powerstay Liquid Foundation', shadeName: 'W22 Warm Ivory', color: '#F8F0E3', price: 127200 },
      { id: 'mo-f3', brand: 'Make Over', productName: 'Powerstay Liquid Foundation', shadeName: 'N30 Natural Beige', color: '#E0C8B3', price: 127200 },
      { id: 'mo-f4', brand: 'Make Over', productName: 'Powerstay Liquid Foundation', shadeName: 'W33 Honey Beige', color: '#D4AF98', price: 127200 },
      { id: 'mo-f5', brand: 'Make Over', productName: 'Powerstay Liquid Foundation', shadeName: 'W42 Warm Sand', color: '#AD8664', price: 127200 },
      { id: 'mo-f6', brand: 'Make Over', productName: 'Powerstay Liquid Foundation', shadeName: 'W50 Creme Tan', color: '#9D7351', price: 127200 },
      { id: 'mo-f7', brand: 'Make Over', productName: 'Powerstay Liquid Foundation', shadeName: 'C62 Rich Cocoa', color: '#7A5535', price: 127200 },
      { id: 'mo-f8', brand: 'Make Over', productName: 'Powerstay Liquid Foundation', shadeName: 'N70 Coconut', color: '#6A462A', price: 127200 },

      // --- Wardah ---
      { id: 'wd-f1', brand: 'Wardah', productName: 'Colorfit Matte Foundation', shadeName: '11C Pink Fair', color: '#F8E9DD', price: 50375 },
      { id: 'wd-f2', brand: 'Wardah', productName: 'Colorfit Matte Foundation', shadeName: '22N Light Ivory', color: '#F5E1D3', price: 50375 },
      { id: 'wd-f3', brand: 'Wardah', productName: 'Colorfit Matte Foundation', shadeName: '32N Neutral Beige', color: '#C6A588', price: 50375 },
      { id: 'wd-f4', brand: 'Wardah', productName: 'Colorfit Matte Foundation', shadeName: '33W Olive Beige', color: '#D3B49A', price: 50375 },
      { id: 'wd-f5', brand: 'Wardah', productName: 'Colorfit Matte Foundation', shadeName: '43W Golden Sand', color: '#9D7351', price: 50375 },
      { id: 'wd-f6', brand: 'Wardah', productName: 'Colorfit Matte Foundation', shadeName: '52N Almond', color: '#8A6240', price: 50375 },
      { id: 'wd-f7', brand: 'Wardah', productName: 'Colorfit Matte Foundation', shadeName: '63W Caramel', color: '#7E5A3E', price: 50375 },
      { id: 'wd-f8', brand: 'Wardah', productName: 'Colorfit Matte Foundation', shadeName: '70W Rich Cocoa', color: '#5C3A1F', price: 50375 },
      
      // --- Somethinc ---
      { id: 'st-f1', brand: 'Somethinc', productName: 'Copy Paste Cushion', shadeName: 'C01 Perle', color: '#F6E4D1', price: 129000 },
      { id: 'st-f2', brand: 'Somethinc', productName: 'Copy Paste Cushion', shadeName: 'W01 Bijoux', color: '#EED6C4', price: 129000 },
      { id: 'st-f3', brand: 'Somethinc', productName: 'Copy Paste Cushion', shadeName: 'N02 Nina', color: '#D9B89E', price: 129000 },
      { id: 'st-f4', brand: 'Somethinc', productName: 'Copy Paste Cushion', shadeName: 'W03 Goddess', color: '#B99372', price: 129000 },
      { id: 'st-f5', brand: 'Somethinc', productName: 'Copy Paste Cushion', shadeName: 'W04 Coco', color: '#8A6240', price: 129000 },
      { id: 'st-f6', brand: 'Somethinc', productName: 'Copy Paste Cushion', shadeName: 'C05 Alter', color: '#A97C5A', price: 129000 },
      { id: 'st-f7', brand: 'Somethinc', productName: 'Copy Paste Cushion', shadeName: 'W06 Fawn', color: '#805942', price: 129000 },
      { id: 'st-f8', brand: 'Somethinc', productName: 'Copy Paste Cushion', shadeName: 'C06 Penny', color: '#69472F', price: 129000 },
      
      // --- Pixy ---
      { id: 'px-f1', brand: 'Pixy', productName: 'Make It Glow Cushion', shadeName: '101 Light Beige', color: '#F4E3D3', price: 87500 },
      { id: 'px-f2', brand: 'Pixy', productName: 'Make It Glow Cushion', shadeName: '201 Neutral Beige', color: '#E3C6AE', price: 87500 },
      { id: 'px-f3', brand: 'Pixy', productName: 'Make It Glow Cushion', shadeName: '301 Medium Beige', color: '#D1AC8C', price: 87500 },
      { id: 'px-f4', brand: 'Pixy', productName: 'Make It Glow Cushion', shadeName: '401 Sandy Beige', color: '#C09A7B', price: 87500 },

      // --- Glad2Glow ---
      { id: 'g2g-f1', brand: 'Glad2Glow', productName: 'Cover-Up Airy Foundation', shadeName: '01 Light', color: '#F3E5D8', price: 40180 },
      { id: 'g2g-f2', brand: 'Glad2Glow', productName: 'Cover-Up Airy Foundation', shadeName: '02 Medium Light', color: '#E7D0BF', price: 40180 },
      { id: 'g2g-f3', brand: 'Glad2Glow', productName: 'Cover-Up Airy Foundation', shadeName: '03 Natural', color: '#DAB89F', price: 40180 },
      { id: 'g2g-f4', brand: 'Glad2Glow', productName: 'Cover-Up Airy Foundation', shadeName: '04 Tan', color: '#C9A183', price: 40180 },
    ],
  },
  {
    name: 'Lipstick',
    shades: [
       // --- Emina ---
      { id: 'em-l1', brand: 'Emina', productName: 'Creamy Tint', shadeName: '01 Brick Town', color: '#F2C2A8', price: 35200 },
      { id: 'em-l2', brand: 'Emina', productName: 'Creamy Tint', shadeName: '02 Peach Crush', color: '#E58C83', price: 35200 },
      { id: 'em-l3', brand: 'Emina', productName: 'Creamy Tint', shadeName: '03 Sunbeam', color: '#9A5B48', price: 35200 },
      { id: 'em-l4', brand: 'Emina', productName: 'Creamy Tint', shadeName: '04 Wild Rose', color: '#B56D5B', price: 35200 },
      { id: 'em-l5', brand: 'Emina', productName: 'Creamy Tint', shadeName: '05 Cherry Soda', color: '#8D3F5C', price: 35200 },
      { id: 'em-l6', brand: 'Emina', productName: 'Creamy Tint', shadeName: '06 Pumpkin Spice', color: '#D07A51', price: 35200 },
      { id: 'em-l7', brand: 'Emina', productName: 'Creamy Tint', shadeName: '07 Choco Puff', color: '#9F5E4F', price: 35200 },

      // --- Luxcrime ---
      { id: 'lc-l1', brand: 'Luxcrime', productName: 'Ultra Lip Velvet', shadeName: 'Glasstonberry', color: '#D9A7A7', price: 81750 },
      { id: 'lc-l2', brand: 'Luxcrime', productName: 'Ultra Lip Velvet', shadeName: 'Jeruk', color: '#C04C49', price: 81750 },
      { id: 'lc-l3', brand: 'Luxcrime', productName: 'Ultra Lip Velvet', shadeName: 'Sangria', color: '#6E3A51', price: 81750 },
      { id: 'lc-l4', brand: 'Luxcrime', productName: 'Ultra Lip Velvet', shadeName: 'Choco Fudge', color: '#7B4D3F', price: 81750 },
      { id: 'lc-l5', brand: 'Luxcrime', productName: 'Ultra Lip Velvet', shadeName: 'Espresso', color: '#612F30', price: 81750 },
      { id: 'lc-l6', brand: 'Luxcrime', productName: 'Ultra Lip Velvet', shadeName: 'Peach Mojito', color: '#E39A86', price: 81750 },
      { id: 'lc-l7', brand: 'Luxcrime', productName: 'Ultra Lip Velvet', shadeName: 'Sunset Kiss', color: '#CF7B6A', price: 81750 },

      // --- Wardah ---
      { id: 'wd-l1', brand: 'Wardah', productName: 'Matte Lip Cream', shadeName: '01 Red Dicted', color: '#97242A', price: 46500 },
      { id: 'wd-l2', brand: 'Wardah', productName: 'Matte Lip Cream', shadeName: '03 See You Latte', color: '#B57F75', price: 46500 },
      { id: 'wd-l3', brand: 'Wardah', productName: 'Matte Lip Cream', shadeName: '09 Mauve On', color: '#C98EA2', price: 46500 },
      { id: 'wd-l4', brand: 'Wardah', productName: 'Matte Lip Cream', shadeName: '11 Oh So Nude', color: '#D6A89A', price: 46500 },
      { id: 'wd-l5', brand: 'Wardah', productName: 'Matte Lip Cream', shadeName: '13 Fruit Punch', color: '#A0343D', price: 46500 },
      { id: 'wd-l6', brand: 'Wardah', productName: 'Matte Lip Cream', shadeName: '15 Pinky Plumise', color: '#B9576E', price: 46500 },
      { id: 'wd-l7', brand: 'Wardah', productName: 'Matte Lip Cream', shadeName: '18 Speakeasy', color: '#8A4F53', price: 46500 },

      // --- Make Over ---
      { id: 'mo-l1', brand: 'Make Over', productName: 'Intense Matte Lip Cream', shadeName: '001 Lavish', color: '#E1B3A3', price: 84000 },
      { id: 'mo-l2', brand: 'Make Over', productName: 'Intense Matte Lip Cream', shadeName: '003 Secret', color: '#D38A7E', price: 84000 },
      { id: 'mo-l3', brand: 'Make Over', productName: 'Intense Matte Lip Cream', shadeName: '005 Impulse', color: '#C65F5B', price: 84000 },
      { id: 'mo-l4', brand: 'Make Over', productName: 'Intense Matte Lip Cream', shadeName: '009 Posh', color: '#A95864', price: 84000 },
      { id: 'mo-l5', brand: 'Make Over', productName: 'Intense Matte Lip Cream', shadeName: '011 Pompous', color: '#9A4A48', price: 84000 },
      { id: 'mo-l6', brand: 'Make Over', productName: 'Intense Matte Lip Cream', shadeName: '017 Savvy', color: '#914947', price: 84000 },
      { id: 'mo-l7', brand: 'Make Over', productName: 'Intense Matte Lip Cream', shadeName: '020 Style', color: '#793B3C', price: 84000 },
    ],
  },
  {
    name: 'Blush',
    shades: [
      // --- Emina ---
      { id: 'em-b1', brand: 'Emina', productName: 'Cheeklit Cream Blush', shadeName: 'Pink', color: '#FADADD', price: 29465 },
      { id: 'em-b2', brand: 'Emina', productName: 'Cheeklit Cream Blush', shadeName: 'Peach', color: '#EAA9A9', price: 29465 },
      { id: 'em-b3', brand: 'Emina', productName: 'Cheeklit Cream Blush', shadeName: 'Nudie Brown', color: '#D29C83', price: 29465 },
      { id: 'em-b4', brand: 'Emina', productName: 'Cheeklit Cream Blush', shadeName: 'Violet', color: '#C08E97', price: 29465 },
      { id: 'em-b5', brand: 'Emina', productName: 'Cheeklit Cream Blush', shadeName: 'Cherry Blossom', color: '#F3B8C1', price: 29465 },
      
      // --- Wardah ---
      { id: 'wd-b1', brand: 'Wardah', productName: 'Colorfit Cream Blush', shadeName: '01 Sand Coral', color: '#F6B9C1', price: 36400 },
      { id: 'wd-b2', brand: 'Wardah', productName: 'Colorfit Cream Blush', shadeName: '02 Merry Mauve', color: '#D78B95', price: 36400 },
      { id: 'wd-b3', brand: 'Wardah', productName: 'Colorfit Cream Blush', shadeName: '03 Summer Peach', color: '#F49887', price: 36400 },
      { id: 'wd-b4', brand: 'Wardah', productName: 'Colorfit Cream Blush', shadeName: '04 Groovy Pink', color: '#E598B1', price: 36400 },

      // --- Somethinc ---
      { id: 'st-b1', brand: 'Somethinc', productName: 'Tamago Airy Blush', shadeName: 'Baby Love', color: '#F8C3AF', price: 62100 },
      { id: 'st-b2', brand: 'Somethinc', productName: 'Tamago Airy Blush', shadeName: 'Honey-moon', color: '#E66B6B', price: 62100 },
      { id: 'st-b3', brand: 'Somethinc', productName: 'Tamago Airy Blush', shadeName: 'Lovefool', color: '#A97080', price: 62100 },
      { id: 'st-b4', brand: 'Somethinc', productName: 'Tamago Airy Blush', shadeName: 'Molly', color: '#9E5E66', price: 62100 },
      { id: 'st-b5', brand: 'Somethinc', productName: 'Tamago Airy Blush', shadeName: 'Maiden', color: '#EBA497', price: 62100 },
      { id: 'st-b6', brand: 'Somethinc', productName: 'Tamago Airy Blush', shadeName: 'Dolce', color: '#D78570', price: 62100 },

      // --- Make Over ---
      { id: 'mo-b1', brand: 'Make Over', productName: 'Hydrastay Liquid Tint Blush', shadeName: 'SOLAR', color: '#E4A08A', price: 95200 },
      { id: 'mo-b2', brand: 'Make Over', productName: 'Hydrastay Liquid Tint Blush', shadeName: 'IDLE', color: '#D08579', price: 95200 },
      { id: 'mo-b3', brand: 'Make Over', productName: 'Hydrastay Liquid Tint Blush', shadeName: 'FLARE', color: '#B96B5E', price: 95200 },
      { id: 'mo-b4', brand: 'Make Over', productName: 'Hydrastay Liquid Tint Blush', shadeName: 'GLEE', color: '#E6A5B5', price: 95200 },

      // --- Pixy ---
      { id: 'px-b1', brand: 'Pixy', productName: 'Twin Blush', shadeName: '01 Pop Terracotta', color: '#F2A088', price: 35000 },
      { id: 'px-b2', brand: 'Pixy', productName: 'Twin Blush', shadeName: '02 Active Pink', color: '#F7B7C6', price: 35000 },
      { id: 'px-b3', brand: 'Pixy', productName: 'Twin Blush', shadeName: '03 Pretty Plum', color: '#E094A3', price: 35000 },
      { id: 'px-b4', brand: 'Pixy', productName: 'Twin Blush', shadeName: '04 Neon Orange', color: '#FF9E7F', price: 35000 },
    ],
  },
];