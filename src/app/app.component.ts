import { AfterViewInit, Component } from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import Map from 'ol/Map';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  mapId = 'oitm_map';
  map: Map;

  ngAfterViewInit(): void {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new TileWMS({
            url: 'http://localhost:8080/geoserver/gwc/service/wms',
            params: {
              LAYERS: ['oitm:20200822_LEVEL2_SEN2B_BOA_rgb'],
              FORMAT: 'image/jpeg',
              SRS: 'EPSG:900913',
            },
          }),
        }),
        new TileLayer({
          source: new TileWMS({
            url: 'http://localhost:8080/geoserver/wms',
            params: {
              LAYERS: ['oitm:waterway'],
              FORMAT: 'image/png8',
            },
          }),
        }),
      ],
      target: this.mapId,
      view: new View({
        center: [2289368.4, 6022083.7],
        zoom: 14,
      }),
    });
  }

  zoomIn(): void {
    this.map
      .getView()
      .animate({ zoom: this.map.getView().getZoom() + 1, duration: 200 });
  }

  zoomOut(): void {
    this.map
      .getView()
      .animate({ zoom: this.map.getView().getZoom() - 1, duration: 200 });
  }
}
