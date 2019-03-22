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

  static readonly CATEGORIES = ['Hotel', 'Banquet','Sports', 'Conference', 'Meeting','Wedding'];
  static readonly CITIES = ['Pune', 'Vadodara', 'Mumbai', 'Delhi'];
  static readonly CATEROR = ['Yes', 'No'];
  static readonly WIFI = ['Yes', 'No'];
  static readonly AC = ['Yes', 'No'];
  static readonly RESTAURANT = ['Yes', 'No'];
  static readonly PARKING = ['Yes', 'No'];
  static readonly ADVANCE_PAYMENT = ['Yes', 'No'];
  static readonly FIREWORKS = ['Yes', 'No'];
  static readonly MUSIC = ['Yes', 'No'];
  static readonly THEATER = ['Yes', 'No'];
  static readonly SAUNA_SPA = ['Yes', 'No'];
  static readonly PRINT_SCAN = ['Yes', 'No'];
  static readonly PARTY_ROOM = ['Yes', 'No'];
  static readonly STAGE = ['Yes', 'No'];
  static readonly BAR = ['Yes', 'No'];
  static readonly LODGING = ['Yes', 'No'];
  static readonly BADMINTON = ['Yes', 'No'];
  static readonly BASKETBALL = ['Yes', 'No'];
  static readonly CRICKET = ['Yes', 'No'];
  static readonly FOOTBALL = ['Yes', 'No'];
  static readonly FUTSAL = ['Yes', 'No'];
  static readonly HOCKEY = ['Yes', 'No'];
  static readonly NETBALL = ['Yes', 'No'];
  static readonly SQUASH = ['Yes', 'No'];
  static readonly TABLETENNIS = ['Yes', 'No'];
  static readonly TENNIS = ['Yes', 'No'];
  static readonly VOLLEYBALL = ['Yes', 'No'];
  static readonly SWIMMING = ['Yes', 'No'];
  static readonly GYM = ['Yes', 'No'];

   _id: string;
   name: string;
   images: Array<any>
              tags: Array<any>;
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
              caterer: String;
              dailyRate: number;
              shared: boolean;
              wifi: string;
              ac: string;              
              guests: number;
              rooms: number;
              usp1: string;
              usp2: string;
              usp3: string;
              parking: string;
              restaurant: string;
              advance_payment: string;
              fireworks: string;
              music: string;
              theater: string;
              print_scan: string;
              open_space: number;
              sauna_spa: string;
              party_room: string;
              stage: string;
              bar: string;
              lodging: string;
              createdAt: string;
              seating: number;
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
              badminton: string;
              basketball: string;
              cricket: string;
              football: string;
              futsal: string;
              hockey: string;
              netball: string;
              squash: string;
              table_tennis: string;
              tennis: string;
              volley_ball: string;
              swimming: string;
              gym: string;

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
  image1: String;
  image2: String;
  image3: String;
  image4: String;
  image5: String;
  image6: String;
  price: Number;
  category: String;
  features: Array<any>;

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
