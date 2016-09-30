window.onload = function () {
  var raycaster = new THREE.Raycaster(); // create once
  var mouse = new THREE.Vector2(); // create once

  var page = new Vue({

    el: '#page',

    //van der waals radii are in pm
    //masses are in u
    //boiling points are in C
    //electronAffinity is kJ/mol
    data: {
      atoms: [
        {
          "atomicMass": "1.00794",
          "atomicNumber": 1,
          "boilingPoint": "-252.9",
          "electronAffinity": 73,
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
          "electronAffinity": 60,
          "modelColor": 0xabaae4,
          "name": "Lithium",
          "radius": 220,
          "symbol": "Li"
        },
        {
          "atomicNumber": 4,
          "atomicMass": "9.012182",
          "boilingPoint": "5378",
          "electronAffinity": -231,
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
      renderData: function(event) {
        mouse.x = event.pageX;
        mouse.y = - event.pageY;
        console.log(mouse);
        raycaster.setFromCamera( mouse, this.camera );

        // calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObjects( this.shownAtoms );
        console.log(this.shownAtoms);
        console.log(intersects);

        for ( var i = 0; i < intersects.length; i++ ) {
          intersects[ i ].object.material.color.set( 0xff0000 );
          console.log(intersects[0].object.userData.name);
        }

        this.renderer.render( this.scene, this.camera );

      },
      renderScene: function() {
        requestAnimationFrame( this.renderScene );

        var atomCount = this.shownAtoms.length;
        var i = 0;
        for (i = 0; i < atomCount; i++) {
          //TODO: get them moving in a way that makes sense
          // will ionic bond occur? http://chem.libretexts.org/Core/Organic_Chemistry/Fundamentals/Ionic_and_Covalent_Bonds
          // otherwise, similar electron affinity will form covalent
//          this.shownAtoms[i].rotation.x += 0.1;
  //        this.shownAtoms[i].rotation.y += 0.1;
//          this.shownAtoms[i].position.set( this.shownAtoms[i].position.x+0.001, this.shownAtoms[i].position.y+0.001, this.shownAtoms[i].position.z+0.001 );
        }
        this.renderer.render( this.scene, this.camera );
        this.renderer.domElement.addEventListener('mousedown', this.renderData, false);
      },
      setScene: function() {
        this.windowHeight = window.innerHeight;
        this.windowWidth = window.innerWidth;

        var scene = new THREE.Scene();
        // (field of view, aspect ratio (element width/element height, near
        // clipping plane (objects closer than don't show), far clipping plane),)
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth*0.7 / window.innerHeight, 0.1, 1000 );

        var renderer = new THREE.WebGLRenderer();
        //true adds pixels???
        renderer.setSize( this.windowWidth*0.7, this.windowHeight, true );
        var container = document.getElementById('page');
        container.appendChild( renderer.domElement );

        var pointLight = new THREE.PointLight(0xFFFFFF);
        pointLight.position.x = 1;
        pointLight.position.y = 5;
        pointLight.position.z = 300;

        // add to the scene
        scene.add(pointLight);
        scene.add( new THREE.AxisHelper( 1000 ) );
        camera.position.x = 0;
        camera.position.z = 200;
        camera.position.y = 100;
        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.renderScene();
      },
      loadRandom: function (number) {
        var i = 0;
        for (i = 0; i < number; i++) {
          var newAtom = this.atoms[Math.floor(Math.random()*this.atoms.length)];
          var radius = newAtom.radius/50;
          var geometry = new THREE.SphereGeometry( radius, 16, 16 );
          var material = new THREE.MeshLambertMaterial( { color: newAtom.modelColor } );
          var atom = new THREE.Mesh( geometry, material );
          //TODO: set positions randomly around screen
          var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
          atom.position.set( plusOrMinus*Math.floor(Math.random()*20), plusOrMinus*Math.floor(Math.random()*20), plusOrMinus*Math.floor(Math.random()*20) );
          atom.userData = newAtom;
          this.scene.add( atom );
          this.shownAtoms.push(atom);
        }
      }
    }
  });
}
