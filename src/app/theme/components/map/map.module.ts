import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
    declarations:[
        MapComponent
    ],
    exports: [
        MapComponent
    ],
    imports: [
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDKhMuYssF4ls3F2idN1-NhKOf9Ov0pPl4'
          })
    ],
    providers: [

    ]
})
export class MapModule {}