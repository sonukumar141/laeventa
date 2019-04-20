import { Time } from "@angular/common";

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
  static readonly CITIES = ['Pune'];
  static readonly REGION = ['Aundh',
  'Balewadi',
  'Baner',
  'Baner-Sus',
  'Bavdhan',
  'Bhusari Colony',
  'Chakan',
  'Chinchwad',
  'Clover Park',
  'Dange Chowk',
  'Dhanori',
  'Dhayari',
  'Eon Free Zone',
  'Erandwane',
  'Hadapsar',
  'Handewadi',
  'Hinjewadi',
  'Hinjewadi Phase 2',
  'Kalyani Nagar',
  'Karve Nagar',
  'Kaspate Vasti',
  'Keshav Nagar',
  'Kharadi',
  'Kondhwa',
  'Koregaon Park',
  'Koregaon Park Annexe',
  'Kothrud',
  'Lohegaon',
  'Magarpatta',
  'Manjri',
  'Manjri BK',
  'Mhada Colony',
  'Model Colony',
  'Mohamadwadi',
  'More Localities',
  'Moshi',
  'Narhe',
  'New Sanghvi',
  'NIBM',
  'Pashan',
  'Pashan-Sus Road',
  'Phursungi',
  'Pimple Gurav',
  'Pimple Nilakh',
  'Pimple Saudagar',
  'Pisoli',
  'Punawale',
  'Rahatani',
  'Ravet',
  'Sakore Nagar',
  'Sasane Nagar',
  'Shankar Kalat Nagar',
  'Shastri Nagar',
  'Sinhgad Road',
  'Sus',
  'Tathawade',
  'Thergaon',
  'Tingre Nagar',
  'Tulaja Bhawani Nagar',
  'Undri',
  'Viman Nagar',
  'Vishrantwadi',
  'Wadgaon Sheri',
  'Wagholi',
  'Wakad',
  'Wanowrie',
  'Wanwadi',
  'Warje',
  'Yewalewadi'];
  static readonly FACILITIES = ['Cricket ', ' Football ', ' Badminton ', ' Basketball ', ' Cycling ', ' Hockey ',
                                ' Golf ', ' Chess ', ' Table tennis ', ' Volleyball ', ' Snooker/Pool ', ' Skating ',
                                ' Horse riding ', ' Swimming ', ' Archery ', ' Go karting ', ' Laser tag ',
                                ' Lawn tennis ', ' PC gaming ', ' Squash ', ' Shooting ', ' Bowling ', ' Boating ',
                                ' Paintball ', ' Sky diving ', ' Rock climbing ', ' Scuba diving ', ' Foosball ',
                                ' Karate ', ' Kick boxing ', ' Boxing ', ' Judo ', ' Pilates ', ' Spinning ',
                                ' Taekwondo ', ' Weightlifting ', ' Wrestling '];
  static readonly LODGING_POLICIES = ['Available', 'Not Available'];
  static readonly FOOD_POLICIES = ['Outside food allowed', 'Outside food not allowed'];
  static readonly ALCOHOL_POLICIES = ['Alcohol allowed', 'Alcohol Not Allowed'];
  static readonly DECOR_POLICIES = ['Decoration provided', 'Decoration not provided'];
  static readonly PARKING_POLICIES = ['Vallet parking available', 'Parking Available', 'Parking not available'];
  static readonly EQUIPMENT_POLICIES = ['Sports equipment available', 'Sports equipment not available'];
  static readonly CANTEEN_POLICIES = ['Canteen available', 'Canteen not available'];
  static readonly WASHROOM_POLICIES = ['Washroom available', 'Washroom not available'];
  static readonly SCOREBOARD_POLICIES = ['Scoreboard available', 'Scoreboard not available'];
  static readonly POWER_POLICIES = ['Power backup available', 'Power backup not available'];
  static readonly COMMENTATOR_POLICIES = ['Commentator available', 'Commentator not available'];

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
              
              lodging_policy: string;
              lodging_room_average_price: number;
              food_policy: string;
              alcohol_policy: string;
              decor_policy: string;
              payment_policy_percentage: number;
              cancellation_policy_percentage: number; 

              parking_policy: string;
              parking_space_cars: number;
              parking_space_bikes: number;

              equipments_available_policy: string;
              canteen_available_policy: string;
              washroom_available_policy: string; 
              scoreboard_available_policy: string;
              power_backup_available_policy: string;

              venueareas: VenueArea[];

}

export class Userh {
    static readonly CATEGORIES = ['Venue', 'Sports'];
    category: String;
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
