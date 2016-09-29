window.onload = function () {
  var page = new Vue({

    el: '#page',

    //van der waals radii are in pm
    //masses are in u
    //boiling points are in C
    data: {
      atoms: [
        {
          "atomicMass": "1.00794",
          "atomicNumber": 1,
          "boilingPoint": "-252.9",
          "electronConfiguration": "1s1",
          "name": "Hydrogen",
          "modelColor": 0xeef4f4,
          "radius": 120,
          "symbol": "H"
        },
        {
          "atomicMass": "4.002602",
          "atomicNumber": 2,
          "name": "Helium",
          "modelColor": 0xb6cece,
          "radius": 140,
          "symbol": "He"
        },
        {
          "atomicNumber": 3,
          "atomicMass": "6.941",
          "boilingPoint": "2447",
          "modelColor": 0xabaae4,
          "name": "Lithium",
          "radius": 220,
          "symbol": "Li"
        },
        {
          "atomicNumber": 4,
          "atomicMass": "9.012182",
          "boilingPoint": "5378",
          "modelColor": 0x2b7456,
          "name": "Beryllium",
          "radius": 190,
          "symbol": "Be"
        },
        {
          "atomicNumber": 5,
          "atomicMass": "10.811",
          "boilingPoint": "7101",
          "modelColor": 0xf7d8ad,
          "name": "Boron",
          "radius": 180,
          "symbol": "B"
        },
        {
          "atomicNumber": 6,
          "atomicMass": "12.0107",
          "boilingPoint": "4827",
          "name": "Carbon",
          "modelColor": 0x171717,
          "radius": 170,
          "symbol": "C",
          "yearDiscovered": -3750
        },
        {
          "atomicMass": "14.0067",
          "atomicNumber": 7,
          "boilingPoint": "-320.4",
          "name": "Nitrogen",
          "modelColor": 0x0761a0,
          "radius": 155,
          "symbol": "N"
        },
        {
          "atomicNumber": 8,
          "name": "Oxygen",
          "modelColor": 0xd10307,
          "radius": 155,
          "symbol": "O"
        },
        {
          "atomicMass": "30.973762",
          "atomicNumber": 15,
          "boilingPoint": "280.5",
          "name": "Phosphorus",
          "modelColor": 0xdf5027,
          "radius": 195,
          "symbol": "P"
        },
        {
          "atomicMass": "32.065",
          "atomicNumber": 16,
          "name": "Sulfur",
          "modelColor": 0xe8e14a,
          "radius": 180,
          "symbol": "S"
        },
        {
          "atomicMass": "35.453",
          "atomicNumber": 17,
          "boilingPoint": "-34.04",
          "modelColor": 0x4ed223,
          "name": "Chlorine",
          "radius": 175,
          "symbol": "Cl"
        },
        {
          "atomicMass": "18.998403",
          "atomicNumber": 9,
          "modelColor": 0x4ed223,
          "name": "Fluorine",
          "radius": 175,
          "symbol": "F"
        }



      ],
      shownAtoms: []
    },

    created: function () {
      this.setScene();
      this.loadRandom(5);
    },

    watch: {
  // /    currentBranch: 'fetchData'
    },

    filters: {
      truncate: function (v) {
        var newline = v.indexOf('\n')
        return newline > 0 ? v.slice(0, newline) : v
      },
      formatDate: function (v) {
        return v.replace(/T|Z/g, ' ')
      }
    },

    methods: {
      renderScene: function() {
        requestAnimationFrame( this.renderScene );
        //TODO: get them moving!

        var atomCount = this.shownAtoms.length;
        var i = 0;
        for (i = 0; i<atomCount; i++) {
//          this.shownAtoms[i].rotation.x += 0.1;
  //        this.shownAtoms[i].rotation.y += 0.1;
          this.shownAtoms[i].position.set( this.shownAtoms[i].position.x+0.001, this.shownAtoms[i].position.y+0.001, this.shownAtoms[i].position.z+0.001 );
        }
        this.renderer.render( this.scene, this.camera );

        var self = this;
        this.renderer.domElement.addEventListener('mousedown', function(event) {
          alert("click!");
          var vector = new THREE.Vector3(
            self.renderer.devicePixelRatio * (event.pageX - this.offsetLeft) / this.width * 2 - 1,
            -self.renderer.devicePixelRatio * (event.pageY - this.offsetTop) / this.height * 2 + 1,
            0
          );

//      			projector.unprojectVector(vector, camera);

          var raycaster = new THREE.Raycaster(
              self.camera.position,
              vector.sub(self.camera.position).normalize()
          );

          var intersects = raycaster.intersectObjects(self.shownAtoms);
          if (intersects.length) {
              console.log(intersects[0]);
          }
        }, false);

      },
      setScene: function() {
        var scene = new THREE.Scene();
  			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  			var renderer = new THREE.WebGLRenderer();
  			renderer.setSize( window.innerWidth, window.innerHeight );
  			document.body.appendChild( renderer.domElement );

  			var pointLight =
  			  new THREE.PointLight(0xFFFFFF);

  			// set its position
  			pointLight.position.x = 1;
  			pointLight.position.y = 5;
  			pointLight.position.z = 10;

  			// add to the scene
  			scene.add(pointLight);

  			camera.position.z = 5;

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.renderScene();
      },
      loadRandom: function (number) {
        var i = 0;
        for (i = 0; i < number; i++) {
          //TODO: getting data from same place it ends up. not good.
          var newAtom = this.atoms[Math.floor(Math.random()*this.atoms.length)];
          //TODO: different sizes
          var radius = newAtom.radius/1000;
          console.log(radius);
    			var geometry = new THREE.SphereGeometry( radius, 16, 16 );
          //TODO: get randomized color
    			var material = new THREE.MeshLambertMaterial( { color: newAtom.modelColor } );
    			var atom = new THREE.Mesh( geometry, material );
          //TODO: set positions randomly around screen
          atom.position.set( Math.floor(Math.random()*i*0.5), Math.floor(Math.random()*i*0.5), Math.floor(Math.random()*i*0.5) );
    			this.scene.add( atom );
          this.shownAtoms.push(atom);
        }
      }
    }
  });
}
