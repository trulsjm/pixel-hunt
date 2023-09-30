
class Node {
  constructor(_type, _passable, _crds, _talkable, _spawn) {
    this.type = _type;
    this.passable = _passable;
    this.coordinates = _crds;  // coords for images on tilemap.png
    this.talkable = _talkable;
    this.spawn = _spawn; // starting coords of maps spawning: [mapx, mapy, currentTile]
  }
}
class imageNode {
  constructor(_type, _passable, _talkable, _source, _crds, _frontImg, _additional, _spawn) {
    this.type = _type;
    this.passable = _passable;
    this.talkable = _talkable;
    this.source = _source;
    this.coordinates = _crds;
    this.frontImg = _frontImg;
    this.add = _additional;
    this.spawn = _spawn;
  }
}

const tileSize = canvas.height/11;

// Loads images first for effective image loading, prevents blinking
const tileMapImg = new Image();
tileMapImg.src = 'BenderWaffles/tileset.png';
const tileSet2Img = new Image();
tileSet2Img.src = 'bilder/tileset2.png';
const interiorImg = new Image();
interiorImg.src = 'bilder/interior.png';
const outranceImg = new Image();
outranceImg.src = 'bilder/outrance.png';
const martImg = new Image();
martImg.src = 'bilder/mart2.png';
const charactersImg = new Image();
charactersImg.src = 'bilder/characters.png';
const employeeImg = new Image();
employeeImg.src = 'bilder/employee.png';
const invertedCornerImg = new Image();
invertedCornerImg.src = 'bilder/inverted-corner.png';

  ////   TILE-IMAGES  /////

const bla = new Node('normal', false, [0,0,0,0], [false]);         // black
const g = new Node('normal', true, [33,0,30,30], [false]);         // grass
const gb = new Node('normal', false, [33,0,30,30], [false]);       // grass background behind images
const fs = new Node('normal', true, [192,5136,30,30], [false]);         // floor stone
const f = new Node('normal', true, [97,225,61,62], [false]);       // floor
const fb = new Node('normal', false, [97,225,61,62], [false]);     // floor background behind images
const fp = new Node('normal', true, [160,1191,17,12], [false]);       //  plank floor
const fpb = new Node('normal', false, [160,1191,17,12], [false]);       //  plank floor
const p = new Node('normal', true, [96,32,64,64], [false]);        // path
const wl = new Node('normal', false, [162,1045,45,44], [false]);  // water left
const wtl = new Node('normal', false, [162,1029,44,44], [false]);  // water top left corner
const wt = new Node('normal', false, [179,1028,45,44], [false]);  // water top
const wtr = new Node('normal', false, [209,1028,45,45], [false]);  // water top right corner
const wr = new Node('normal', false, [209,1045,45,44], [false]);  // water right
const wbl = new Node('normal', false, [162,1053,45,45], [false]);  // water bottom left corner
const wb = new Node('normal', false, [179,1053,45,45], [false]);  // water bottom
const wbr = new Node('normal', false, [209,1053,45,45], [false]);  // water bottom right corner
const wm = new Node('normal', false, [179,1045,45,44], [false]);  // water middle

const ibr = new imageNode('image', false, [false], invertedCornerImg, [0,0,0,0],[220,200,266,258,tileSize,tileSize, 0, 0]); // inverted bottom right corner
const itl = new imageNode('image', false, [false], invertedCornerImg, [97,225,61,62],[3,0,266,258,tileSize,tileSize, 0, 0]); // inverted top left
const itr = new imageNode('image', false, [false], invertedCornerImg, [97,225,61,62],[208,0,278,258,tileSize,tileSize, 0, 0]); // inverted top right
const ibl = new imageNode('image', false, [false], invertedCornerImg, [97,225,61,62],[0,200,266,258,tileSize,tileSize, 0, 0]); // inverted bottom left
  // Buildings
const h = new imageNode('image', true, [false], tileMapImg, [33,0,30,30], [127,2948,130,159,4*tileSize,5*tileSize, 0, 0]);  // house
const h2 = new imageNode('image', true, [false], tileSet2Img, [33,0,30,30], [1152,1230,70,135,3.8*tileSize,7*tileSize, 12, -tileSize-10]);  // house2
const h3 = new imageNode('image', false, [false], tileSet2Img, [33,0,30,30], [1232,1241,73,112,4*tileSize,7*tileSize, 14, -tileSize-28]);  // house3
const h4 = new imageNode('image', false, [false], tileSet2Img, [33,0,30,30], [1392,1245,70,105,70*4,105*4, 8, -tileSize]);  // house4
const s = new imageNode('image', true, [false], tileMapImg, [33,0,30,30], [127,1506,130,159,4*tileSize,5*tileSize, 0, 0]);  //shop
const s2 = new imageNode('image', false, [false], tileSet2Img, [33,0,30,30], [1024,1113,73,90, 73*4.4, 90*4.4, -2, -50]);  //shop
const hut = new imageNode('image', false, [false], tileSet2Img, [33,0,30,30], [1340,1561,72,86,72*3,86*3, 20, -tileSize]);  // hut

const hg = new imageNode('highGrass', true, [false], tileMapImg, [33,0,30,30], [128,513,32,30,tileSize+5,tileSize+5, -5, 0]);    // high grass
const t = new imageNode('image', false, [false], tileMapImg, [33,0,30,30], [0,321,32,65,tileSize,2*tileSize, 0, -tileSize]);  // tree
const t2 = new imageNode('image', false, [false], tileSet2Img, [33,0,30,30], [1312,0,47,56,47*3.8,56*3.8, -24, -tileSize-50]);  // tree 2
const t3 = new imageNode('image', false, [false], tileSet2Img, [33,0,30,30], [264,197,32,30,32*2.9,30*2.9, -10, -20]);  // tree 3 trunk
const bt = new imageNode('image', true, [false], tileMapImg, [33,0,30,30], [0,385,63.75,94,2*tileSize,3*tileSize, 0, 0]);  // big tree
const fl1 = new imageNode('flatImage', true, [false], tileSet2Img, [33,0,30,30], [176,336,16,16,tileSize,tileSize, 0, 0]);  // flowers 1
const fl2= new imageNode('image', false, [false], tileSet2Img, [33,0,30,30], [1312,712,16,24,14*4.5,24*4.5, 4, -50]);  // flowers 2 bush thing
const fl3= new imageNode('flatImage', true, [false], tileSet2Img, [33,0,30,30], [97,353,15,15,tileSize,tileSize, 0, 0]);  // flowers 3 grass thing
const fl4= new imageNode('flatImage', true, [false], tileSet2Img, [33,0,30,30], [192,336,16,16,tileSize,tileSize, 0, 0]);  // flowers 4
const fl5= new imageNode('flatImage', true, [false], tileSet2Img, [33,0,30,30], [192,352,16,16,tileSize,tileSize, 0, 0]);  // flowers 5
const fl6= new imageNode('image', true, [false], tileSet2Img, [33,0,30,30], [1458,778,14,31,14*4,31*4, 0, -tileSize-20]);  // flowers 6
const mu= new imageNode('flatImage', true, [false], tileSet2Img, [33,0,30,30], [417,321,15,15,0.8*tileSize,0.8*tileSize, 5, 5]);  // mushrooms
const bri = new imageNode('image', true, [false], tileSet2Img, [179,1045,45,44], [568,896,32,48,tileSize,tileSize, 0, 0]);  // bridge
const brr = new imageNode('image', true, [false], tileSet2Img, [209,1045,45,44], [568,896,32,48,tileSize,tileSize, 0, 0]);  // bridge
const brl = new imageNode('image', true, [false], tileSet2Img, [162,1045,45,44], [568,896,32,48,tileSize,tileSize, 0, 0]);  // bridge

// chearacters outdoors
const old = new imageNode('image', false, [true, 'Old man:<br><br> The selection of this store is terrible!'], charactersImg, [33,0,30,30], [173,305,16,20,.9*tileSize,1.2*tileSize, 3, -35]);    // old man
const kid = new imageNode('image', false, [true, 'Little girl:<br><br> Beware the tall grass! mysterious creatures are hiding there!'], charactersImg, [33,0,30,30], [176,541,16,20,.8*tileSize,tileSize, 6, -20]);    //

// interior
  // home
const wa = new imageNode('image', false, [false], interiorImg, [0,0,0,0], [323,46,16,11,tileSize,tileSize, 0, 0]);    // wall
const ta = new imageNode('image', false, [false], interiorImg, [160,1191,17,12], [560,16,32,33,2*tileSize,2*tileSize, 0, -14]);    // table
const ch = new imageNode('image', false, [false], interiorImg, [160,1191,17,12], [703,80,16,34,0.75*tileSize,1.5*tileSize, 8, -tileSize+18]);    // chair
const chl = new imageNode('image', false, [false], interiorImg, [160,1191,17,12], [720,80,16,34,0.75*tileSize,1.5*tileSize, 8, -tileSize+18]);    // chair facing left
const b = new imageNode('image', false, [false], interiorImg, [160,1191,17,12], [704,200,32,56,1.7*tileSize,2.8*tileSize, 8, -40]);    // bed
const ga = new imageNode('image', false, [true, 'This bitch empty...'], interiorImg, [160,1191,17,12], [865,333,14,18,0.7*tileSize,0.8*tileSize, 8, -6]);    // barbage bin
const co = new imageNode('image', false, [true, 'This is no time for gaming!'], interiorImg, [160,1191,17,12], [752,289,34,31,2*tileSize,1.5*tileSize, 0, -40]);    // computer desk
const kcs = new imageNode('image', false, [false], interiorImg, [160,1191,17,12], [690,158,42,30,2*tileSize,1.5*tileSize, 0, -40]);    // kitchen counter with sink
const fri = new imageNode('image', false, [true, 'This is no time to eat!'], interiorImg, [160,1191,17,12], [832,47,16,32,tileSize,1.7*tileSize, 0, -53]);    // fridge
const bs = new imageNode('image', false, [true, 'Knawlege'], interiorImg, [160,1191,17,12], [592,167,32,35,1.8*tileSize,2*tileSize, -tileSize+5, -tileSize]);    // book shelf
const sof = new imageNode('image', false, [false], interiorImg, [160,1191,17,12], [747,192,19,50,tileSize,2.5*tileSize, 0, -30]);    // sofa
const mom = new imageNode('image', false, [true, 'Mom:<br><br> Oh hi, how u doin', "Mom:<br><br> Shouldn't you be out hunting?"], charactersImg, [160,1191,17,12], [173,123,16,20,.9*tileSize,1.2*tileSize, 3, -35]);    // mother

  // house 2
  const nei = new imageNode('image', false, [true, 'George:<br><br> Hello, my name is George!','George: <br><br>I have just moved in and i am trying to furnish the place', 'George: <br><br>now get out of my house!'], charactersImg, [160,1191,17,12], [2,325,16,20,.9*tileSize,1.2*tileSize, 3, -35]);    // neighbour

  // shop
const swa = new imageNode('image', false, [false], interiorImg, [0,0,0,0], [323,124,16,13,tileSize,tileSize, 0, 0]);    // shop wall
const ss = new imageNode('image', false, [false], interiorImg, [97,225,61,62], [705,336,32,35,2*tileSize,2.1*tileSize, 0, -tileSize]);    // shop shelf
const ss2 = new imageNode('image', false, [false], interiorImg, [97,225,61,62], [688,350,17,50,tileSize,2.5*tileSize, 0, -35]);    // short shop shelf
const flp = new imageNode('image', false, [false], interiorImg, [97,225,61,62], [833,241,14,30,0.7*tileSize,1.5*tileSize, 10, -45]);    // pot plant
const c = new Node('normal', false, [97,225,61,62], [true, 'shop']);       // counter
const ci = new imageNode('image', true, [false], martImg, [97,225,61,62],[0,0,136,272,2*tileSize,4.2*tileSize, 0, -25]); // Pokemart counter
const e = new imageNode('image', true, [false], employeeImg, [97,225,61,62],[0,0,46,70,tileSize,1.7*tileSize, 0, 0]); // Pokemart employee
 // hut
const sto = new imageNode('image', false, [false], tileSet2Img, [192,5136,30,30], [353,593,15,15,tileSize,tileSize, 0, -10]);  // stone
const hwa = new imageNode('image', false, [false], tileSet2Img, [179,1045,45,44], [42,882,14,14,tileSize,tileSize, 0, 0]);    // hut wall
const hma = new imageNode('image', false, [true, "Hut man:<br><br> Didn't catch any fish today..."], charactersImg, [192,5136,30,30], [504,324,16,21,.9*tileSize,1.2*tileSize, 3, -37]);    // hut man


const sd = new Node('entrance', true, [33,0,30,30], [false], [[-4,1],[-4,2], 1]); // shop door
const hd = new Node('entrance', true, [33,0,30,30], [false], [[-4,0],[-4,1], 2]); // home door
const rd = new imageNode('door', true, [false], interiorImg, [323,46,16,11,tileSize,tileSize], [tileMapImg,[160,3070,32,30], [5,0,tileSize-10,tileSize+6]], null,[[-4,-2],[-4,-1], 3]); // room door
const hud = new Node('entrance', true, [33,0,30,30], [false], [[-4,-1],[-4,0], 4]); // hut door
const h2d = new Node('entrance', true, [33,0,30,30], [false], [[-4,1],[-4,2], 5]); // home door


// Outrances
const os = new imageNode('outrance', true, [false], null, [97,225,61,62],[0,0,78,33,tileSize,tileSize/2, 0, 0], outranceImg, [[11,9],[11,9], 0]); // outrance shop
const oh = new imageNode('outrance', true, [false], null, [160,1191,17,12],[0,0,78,33,tileSize,tileSize/2, 0, 0], outranceImg, [[18,2],[18,2], 0]); // outrance house
const or = new imageNode('outrance', true, [false], null, [160,1191,17,12],[0,0,78,33,tileSize,tileSize/2, 0, 0], outranceImg, [[-4,-4],[-4,-4], 2]); // outrance room
const ohu = new imageNode('outrance', true, [false], null, [192,5136,30,30],[0,0,78,33,tileSize,tileSize/2, 0, 0], outranceImg, [[1,15],[1,15], 0]); // outrance hut
const oh2 = new imageNode('outrance', true, [false], null, [160,1191,17,12],[0,0,78,33,tileSize,tileSize/2, 0, 0], outranceImg, [[20,10],[20,10], 0]); // outrance house

const mapArray = [
  [ // first outside map
    [t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,h2 ,gb ,gb ,gb ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,gb ,gb ,gb ,gb ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,gb ,gb ,gb ,gb ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,hg ,hg ,hg ,hg ,hg ,hg ,t  ,fl3,g  ,g  ,g  ,g  ,g  ,g  ,g  ,t  ,t  ,gb ,hd ,gb ,gb ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,hg ,hg ,hg ,hg ,hg ,t  ,t  ,fl1,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,p  ,p  ,p  ,p  ,p  ,fl2,g  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,hg ,hg ,hg ,hg ,hg ,t  ,fl3,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,p  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,hg ,hg ,hg ,hg ,t  ,fl3,fl4,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,p  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,hg ,hg ,t  ,t  ,fl3,g  ,g  ,g  ,g  ,g  ,s2 ,gb ,gb ,gb ,g  ,g  ,p  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,g  ,t  ,fl1,kid,g  ,g  ,g  ,g  ,g  ,g  ,gb ,gb ,gb ,gb ,g  ,g  ,p  ,g  ,g  ,h3 ,gb ,gb ,gb ,g  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,gb ,gb ,g  ,gb ,g  ,g  ,p  ,g  ,g  ,gb ,gb ,gb ,gb ,g  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,gb ,sd ,gb ,gb ,old,g  ,p  ,g  ,g  ,gb ,gb ,gb ,gb ,g  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,p  ,p  ,p  ,p  ,p  ,p  ,p  ,g  ,fl2,gb ,h2d,gb ,gb ,g  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [wt ,wt ,wt ,wt ,wt ,wt ,wt ,wt ,wt ,wt ,wtr,fl1,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,p  ,p  ,p  ,p  ,p  ,p  ,g  ,g  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [wm ,wm ,wm ,wm ,wm ,wm ,wm ,wm ,wm ,wm ,itr,wt ,wtr,fl1,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [wb ,wb ,wb ,wb ,wb ,wb ,wb ,wb ,wb ,wb ,ibl,wm ,itr,wtr,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,hut,gb ,gb ,fl1,wbl,ibl,wm ,wr ,g  ,g  ,g  ,g  ,g  ,g  ,fl6,g  ,g  ,g  ,fl4,gb ,gb ,g  ,fl3,g  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,gb ,hud,gb ,g  ,g  ,brl,bri,brr,g  ,g  ,g  ,fl6,g  ,g  ,g  ,g  ,fl6,g  ,fl3,t2 ,gb ,fl1,g  ,g  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,mu ,g  ,g  ,g  ,g  ,wl ,wm ,itr,wt ,wtr,g  ,g  ,g  ,fl6,g  ,g  ,g  ,g  ,g  ,fl3,fl3,g  ,g  ,g  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,g  ,g  ,g  ,g  ,g  ,wl ,wm ,wm ,wm ,wr ,g  ,fl6,g  ,g  ,g  ,fl6,g  ,g  ,fl6,fl1,g  ,g  ,g  ,g  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,mu ,t3 ,g  ,g  ,g  ,wbl,wb ,ibl,wm ,wr ,fl1,g  ,g  ,g  ,fl6,g  ,g  ,fl6,fl3,g  ,g  ,fl5,g  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,wl ,wm ,itr,wtr,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,g  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,wl ,wm ,wm ,wr ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,wbl,wb ,ibl,itr,wtr,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,wl ,wm ,wr ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,wl ,wm ,wr ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,wl ,wm ,wr ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ],
    [t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,wl ,wm ,wr ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ,t  ],
  ],

  [ // shop map
    [swa,swa,swa,swa,swa,swa,swa],
    [ci ,fb,flp,f ,f ,f ,f ],
    [e  ,fb,f  ,f ,f ,f ,f ],
    [fb ,c ,f  ,ss,fb,ss,fb],
    [fb ,fb,f  ,f ,f ,f ,f ],
    [ss2,f ,f  ,ss,fb,ss,fb],
    [f  ,f ,os ,f ,f ,f ,f ],
  ],

  [  // home map
    [wa ,wa ,rd ,wa ,wa ,wa ,wa ],
    [fpb,bs ,fp ,fp ,fri,kcs,fpb],
    [sof,fp ,fp ,fp ,fp ,fp ,fp ],
    [fpb,mom,fp ,ch ,ta ,fpb,chl],
    [fp ,fp ,fp ,ch ,fpb,fpb,chl],
    [fp ,fp ,oh ,fp ,fp ,fp ,fp ],
  ],

  [  // room map
    [wa ,wa ,wa ,wa ,wa ,wa],
    [ga ,co ,fpb,fp ,b  ,fpb],
    [fp ,fp ,fp ,fp ,fpb,fpb ],
    [fp ,fp ,or ,fp ,fp ,fp ],
  ],

  [  // hut map
    [hwa,hwa,hwa,hwa,hwa],
    [sto,fs ,fs ,fs ,sto],
    [fs ,fs ,hma,fs ,fs ],
    [fs ,fs ,fs ,fs ,fs ],
    [fs ,fs ,ohu,fs ,fs ],
  ],
  [  // house 2 map
    [wa ,wa ,wa ,wa ,wa ,wa ,wa ],
    [kcs,fpb,fri,fp ,fp ,fp ,fp ],
    [fp ,fp ,fp ,nei,fp ,fp ,fp ],
    [fp ,fp ,fp ,fp ,fp ,fp ,fp ],
    [fp ,fp ,fp ,fp ,fp ,fp ,fp ],
    [fp ,fp ,fp ,fp ,fp ,fp ,fp ],
    [fp ,fp ,oh2,fp ,fp ,fp ,fp ],
  ],
]
