<template>
    <div id="street">

        <div id="map"></div>

        <v-bottom-nav fixed value="true" class="grey darken-3 white--text bottom-toolbar">
            <v-btn flat class="white--text btn" @click="resetMap()">
                <span>reset</span>
                <v-icon>loop</v-icon>
            </v-btn>
            <v-btn flat class="white--text btn" @click="runSnapper()">
                <span>draw path</span>
                <v-icon>gesture</v-icon>
            </v-btn>
            <v-btn flat class="white--text btn">
                <span>set bounty</span>
                <v-icon>attach_money</v-icon>
            </v-btn>
        </v-bottom-nav>

    </div>
</template>
<script>
    import $ from 'jquery'

    export default {
        name: 'street',
        mounted() {
        },
        data() {
            return {
                query: '',
                querySelector: '',
                homeCoordinates: '',
                poly: {},
                map: {},
                path: {},
                drawnPath: [],
                position: {},
                snapPath: {},
                marker: {},
                markerIcon: {
                    url: 'https://i.imgur.com/wsCTnMr.png',
                    // This marker is 20 pixels wide by 32 pixels high.
                    size: new google.maps.Size(50, 50),
                    // The origin for this image is (0, 0).
                    origin: new google.maps.Point(0, 0),
                    // The anchor for this image is the base of the flagpole at (0, 32).
                    anchor: new google.maps.Point(0, 32)
                },
            }
        },
        computed: {
            activeUser() {
                return this.$store.state.activeUser
            }
        },
        methods: {
            initMap() {
                this.map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 18,
                    center: this.$store.state.homeCoordinates
                });

                this.poly = new google.maps.Polyline({
                    strokeColor: '#1976d2',
                    strokeOpacity: 1.0,
                    strokeWeight: 5
                });
                this.poly.setMap(this.map);

                // Add a listener for the click event
                this.map.addListener('click', this.addLatLng);
            },
            addLatLng(event) {
                // Handles click events on a map, and adds a new point to the Polyline.
                this.path = this.poly.getPath();

                // Because path is an MVCArray, we can simply append a new coordinate
                // and it will automatically appear.
                this.path.push(event.latLng);
                // Add a new marker at the new plotted point on the polyline.
                this.marker = new google.maps.Marker({
                    position: event.latLng,
                    icon: this.markerIcon,
                    title: '#' + this.path.getLength(),
                    map: this.map
                });
            },
            runSnapper() {
                var snapPath = this.snapPath
                var requestString = 'https://roads.googleapis.com/v1/snapToRoads?path='
                for (var i = 0; i < this.path['b'].length; i++) {
                    this.snapPath[i] = {}
                    this.snapPath[i].lat = this.path['b'][i].lat()
                    this.snapPath[i].lng = this.path['b'][i].lng()
                }
                for (var i = 0; i < Object.keys(snapPath).length; i++) {
                    var pipe = ''
                    // for (var j = 0; j < snapPath.length; j++) {
                    if (i < Object.keys(snapPath).length - 1) {
                        pipe = '|'
                    } else {
                        pipe = ''
                    }
                    requestString += snapPath[i].lat + ',' + snapPath[i].lng + pipe
                    // }
                } requestString += '&interpolate=true&key=AIzaSyC2eD55PQOzNL2reXI1I94cMtPPgYY81DA'
                var snappedPointsResponse = {}
                $.get(requestString).then(res => {
                    snappedPointsResponse = res
                    this.snapPath = snappedPointsResponse.snappedPoints
                    this.path = {}
                    for (var i = 0; i < this.snapPath.length; i++) {
                        this.path[i] = {}
                        this.path[i].lat = this.snapPath[i].location.latitude
                        this.path[i].lng = this.snapPath[i].location.longitude
                    }
                    for (var i =0; i < Object.keys(this.path).length; i++) {
                        this.drawnPath.push(this.path[i])
                    }
                    console.log(this.drawnPath)
                    this.drawSnappedPath();
                })
            },
            drawSnappedPath() {
                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 18,
                    center: { lat: 43.585564, lng: -116.317876 },
                    // mapTypeId: 'terrain'
                });

                var drawnPath = this.drawnPath
                var plowRoute = new google.maps.Polyline({
                    path: drawnPath,
                    geodesic: true,
                    strokeColor: '#1976d2',
                    strokeOpacity: 1.0,
                    strokeWeight: 5
                });

                plowRoute.setMap(map);
            },
            resetMap() {
                this.poly = {}
                this.map = {}
                this.path = {}
                this.drawnPath = []
                this.position = {}
                this.snapPath = {}
                this.marker = {}
                this.initMap();
            }
        }
    }

</script>
<style>
    @keyframes zoomIn {
        from {
            opacity: 0;
            transform: scale3d(.3, .3, .3);
        }

        50% {
            opacity: 1;
        }
    }

    html,
    body {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .bottom-toolbar {
        left: 0;
        bottom: 0;
    }

    #map {
        height: 87vh !important;
        position: fixed;
        top: 0;
        width: 100%;
    }

    .zoomIn {
        animation-name: zoomIn;
        animation-duration: 500ms;
    }
</style>