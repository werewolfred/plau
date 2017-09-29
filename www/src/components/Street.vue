<template>
    <div>

        <div id="map"></div>



    </div>
</template>
<script>
    export default {
        name: 'street',
        mounted() {
            this.initMap();
        },
        data() {
            return {
                query: '',
                querySelector: '',
                poly: {},
                map: {},
                path: {},
                position: {},
                marker: {},
                markerIcon: {
                    url: 'https://i.imgur.com/wsCTnMr.png',
                    // This marker is 20 pixels wide by 32 pixels high.
                    size: new google.maps.Size(50, 50),
                    // The origin for this image is (0, 0).
                    origin: new google.maps.Point(0, 0),
                    // The anchor for this image is the base of the flagpole at (0, 32).
                    anchor: new google.maps.Point(0, 32)
                }
            }
        },
        computed: {
            results() {
                return Object.freeze(this.$store.state.userSearchResults)
                console.log(Object.Freeze(this.$store.state.userSearchResults))
            },
            activeUser() {
                return this.$store.state.activeUser
            }
        },
        methods: {
            initMap() {
                this.map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 18,
                    center: { lat: 43.585564, lng: -116.317876 }
                });

                this.poly = new google.maps.Polyline({
                    strokeColor: 'green',
                    strokeOpacity: 1.0,
                    strokeWeight: 3
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
            }


        },

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

    #map {
        height: 100vh !important;
    }

    .zoomIn {
        animation-name: zoomIn;
        animation-duration: 500ms;
    }
</style>