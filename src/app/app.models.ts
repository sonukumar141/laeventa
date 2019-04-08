export class Category {
  constructor(public id: number, 
              public name:string, 
              public hasSubCategory: boolean,
              public parentId: number){ }
}

export class Product {
  constructor(public _id: string,
              public name: string,
              public images: Array<any>,
              public oldPrice: number,
              public newPrice: number,
              public city: string,
              public street: string,
              public category: string,
              public phone: number,
              public email: string,
              public completeAddress: string,
              public landmark: string,
              public timings: string,
              public veg_package: number,
              public non_veg_package: number,
              public dailyRate: number,
              public shared: boolean,
              public ac: boolean,
              public guests: number,
              public rooms: number,
              public createdAt: string,
              public discount: number,
              public ratingsCount: number,
              public ratingsValue: number,
              public description: string,
              public availibilityCount: number,
              public cartCount: number,
              public color: Array<string>,
              public size: Array<string>,
              public weight: number,
              public categoryId: number){ }
}

export class Producth {

  static readonly CATEGORIES = ['Sports', 'Wedding', 'Conference','Meeting', 'Concert', 'Party'];
  static readonly CITIES = ['Pune', 'Vadodara', 'Mumbai', 'Delhi'];
  static readonly REGION = ['Ravet', 'Hinjewadi'];
  static readonly FACILITIES = ['Cricket ', ' Football ', ' Badminton ', ' Basketball ', ' Cycling ', ' Hockey ',
                                ' Golf ', ' Chess ', ' Table tennis ', ' Volleyball ', ' Snooker/Pool ', ' Skating ',
                                ' Horse riding ', ' Swimming ', ' Archery ', ' Go karting ', ' Laser tag ',
                                ' Lawn tennis ', ' PC gaming ', ' Squash ', ' Shooting ', ' Bowling ', ' Boating ',
                                ' Paintball ', ' Sky diving ', ' Rock climbing ', ' Scuba diving ', ' Foosball ',
                                ' Karate ', ' Kick boxing ', ' Boxing ', ' Judo ', ' Pilates ', ' Spinning ',
                                ' Taekwondo ', ' Weightlifting ', ' Wrestling '];

   _id: string;
   name: string;
   images: Array<any>;
              tags: Array<any>;
              image1: string;
              image2: string;
              image3: string;
              image4: string;
              image5: string;
              plot_flat: string;
              city: string;
              region: string;
              category: string;
              phone: number;
              email: string;
              pincode: string;
              landmark: string;
              open_timing: string;
              close_timing: string;
              min_rate: number;
              max_rate: number;
              usp1: string;
              usp2: string;
              usp3: string;
              usp4: string;
              usp5: string;
              facilities: string;
              summary: string;

              venueareas: VenueArea[];

}

export class Userh {
    static readonly CATEGORIES = ['Hotel', 'Venue'];
    category: String;
    businessName: String;
    username; String;
    email: String;
    mobile: Number;
    password: String;

}

export class VenueArea {
  static readonly CATEGORIES = ['Football', 'Basketball','Conference Room', 'Party Hall', 'Meeting Room'];
  _id: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  image6: string;
  price: number;
  category: string;
  features: Array<any>;
  producth: Producth;

}

export class Productv {
  static readonly CATEGORIES = ['Phographers', 'Flower Vendor', 'Mehndi', 'Band/Baaza'];
  static readonly CITIES = ['Pune', 'Vadodara', 'Mumbai', 'Delhi'];
              _id: string;
              name: string;
              images: Array<any>;
              image_small: string;
              image_medium: string;
              image_big: string;
              image_extra: string;
              oldPrice: number;
              newPrice: number;
              city: string;
              street: string;
              category: string;
              phone: number;
              email: string;
              completeAddress: string;
              landmark: string;
              timings: string;
              veg_package: number;
              non_veg_package: number;
              dailyRate: number;
              createdAt: string;
              discount: number;
              ratingsCount: number;
              ratingsValue: number;
              description: string;
              availibilityCount: number;
              cartCount: number;
              color: Array<string>;
              size: Array<string>;
              weight: number;
              categoryId: number;
}

export class Userv {
  static readonly CATEGORIES = ['Product', 'Service'];
  category: String;
  businessName: String;
  businessType: String;
  username; String;
  email: String;
  mobile: Number;
  password: String;

}

export class User {
  username; String;
  email: String;
  mobile: Number;
  password: String;
  resetPasswordToken: String;

}
