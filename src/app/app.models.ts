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
   _id: string;
   name: string;
   images: Array<any>
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
              shared: boolean;
              ac: boolean;
              guests: number;
              rooms: number;
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

export class Productv {
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
