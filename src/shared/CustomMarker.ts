import { } from '@types/googlemaps';
import { PersonModel } from './shared';

export class CustomMarker extends google.maps.OverlayView {
    private latlng;
    private args;
    private div = null;
    private isRendered: boolean = false;
    private personModel: PersonModel;

    constructor(map, args, personModel:PersonModel) {
        super();
        this.latlng = { lat: Number(personModel.MapPoint.lat), lng: Number(personModel.MapPoint.lng) };
        this.args = args;
        this.personModel=personModel;
        this.setMap(map);
    }
    public onAdd() {
        var self = this;

        var div = this.div;

        if (!div && !this.isRendered) {
            div = this.div = document.createElement('div');
            div.className = 'activePerson';
            
            let personImage = document.createElement('img');
            personImage.className = 'personImage';
            personImage.src="https://graph.facebook.com/" + this.personModel.FbId + "/picture?type=large";

            let personIcon = document.createElement('div');
            personIcon.className = 'personIcon';
            personIcon.innerText=this.personModel.Status;
            
            div.appendChild(personImage);
            div.appendChild(personIcon);


            if (typeof (this.args.marker_id) !== 'undefined') {
                div.dataset.marker_id = this.args.marker_id;
            }

            google.maps.event.addDomListener(div, "click", function (event) {
                google.maps.event.trigger(self, "click");
            });

            let panes = this.getPanes();
            panes.overlayImage.appendChild(div);

            let point = this.getProjection().fromLatLngToDivPixel(this.latlng);

            if (point) {
                div.style.left = point.x + 'px';
                div.style.top = point.y + 'px';
            }
            this.isRendered = true;
        }
    }

    public draw() {
        if (this.div) {
          let position = new google.maps.LatLng(this.latlng.lat, this.latlng.lng);
          let pos = this.getProjection().fromLatLngToDivPixel(position);
          this.div.style.left = pos.x + 'px';
          this.div.style.top = pos.y + 'px';
        }
      };

    public remove() {
        if (this.div) {
            this.div.parentNode.removeChild(this.div);
            this.div = null;
        }
    };

    public getPosition() {
        return this.latlng;
    };

}